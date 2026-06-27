"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { PhoneCall, PhoneOff, Loader2, Mic } from "lucide-react";

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "dummy_key";

export function VapiWebCallButton({
  assistantOverrides,
  className,
}: {
  assistantOverrides?: Record<string, unknown>;
  className?: string;
}) {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [callStatus, setCallStatus] = useState<"idle" | "loading" | "active">("idle");
  const [volume, setVolume] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);

    vapiInstance.on("call-start", () => setCallStatus("active"));
    vapiInstance.on("call-end", () => {
      setCallStatus("idle");
      setVolume(0);
    });
    vapiInstance.on("volume-level", (v: number) => setVolume(v));
    vapiInstance.on("error", (e: unknown) => {
      console.error(e);
      setCallStatus("idle");
      setVolume(0);
    });

    setVapi(vapiInstance);

    return () => {
      vapiInstance.removeAllListeners();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const toggleCall = async () => {
    if (callStatus === "active") {
      vapi?.stop();
    } else {
      setCallStatus("loading");

      const {
        voiceGreeting,
        voiceInstructions,
        services,
        systemPrompt: customSystemPrompt,
        name,
        ...restOverrides
      } = assistantOverrides || {};

      const finalSystemPrompt =
        customSystemPrompt ||
        `
${voiceInstructions || "You are a helpful assistant."}

${services ? `Services available:\n${JSON.stringify(services, null, 2)}` : ""}
      `.trim();

      const assistant = {
        name: (name as string) || "Demo Assistant",
        firstMessage: voiceGreeting as string | undefined,
        firstMessageMode: "assistant-speaks-first",
        model: {
          provider: "openai",
          model: "gpt-4o",
          messages: [{ role: "system", content: finalSystemPrompt }],
        },
        voice: {
          provider: "openai",
          voiceId: "nova",
        },
        ...restOverrides,
      };

      try {
        // @ts-expect-error - Vapi SDK types conflict with loosely typed overrides
        await vapi?.start(assistant);
      } catch (err) {
        console.error("Failed to start call:", err);
        setCallStatus("idle");
      }
    }
  };

  /* Animated sound bars based on live volume */
  const bars = [0.4, 0.7, 1.0, 0.8, 0.5, 0.9, 0.6, 1.0, 0.7, 0.4];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Sound bars visualizer */}
      {callStatus === "active" && (
        <div className="flex items-end justify-center gap-0.5 h-8">
          {bars.map((b, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-[var(--accent)] to-[var(--teal)] transition-all duration-75"
              style={{
                height: `${Math.max(4, volume * b * 100)}%`,
                animationDelay: `${i * 60}ms`,
              }}
            />
          ))}
        </div>
      )}

      <button
        id="vapi-demo-call-button"
        onClick={toggleCall}
        disabled={!vapi || callStatus === "loading"}
        className={`group relative flex items-center justify-center gap-3 overflow-hidden rounded-full font-semibold transition-all duration-300 disabled:cursor-wait disabled:opacity-70 ${
          callStatus === "active"
            ? "bg-red-500 px-8 py-4 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:bg-red-600"
            : "btn-primary px-8 py-4 text-base shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)] hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(212,175,55,0.7)]"
        } ${className || ""}`}
      >
        {/* Shimmer effect on idle */}
        {callStatus === "idle" && (
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
        )}

        {callStatus === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
        {callStatus === "idle" && <PhoneCall className="h-5 w-5" />}
        {callStatus === "active" && <PhoneOff className="h-5 w-5" />}

        <span>
          {callStatus === "loading"
            ? "Connecting…"
            : callStatus === "active"
            ? "End Demo Call"
            : "🎙️ Try it Live — Talk to the AI"}
        </span>
      </button>

      {callStatus === "idle" && (
        <p className="flex items-center gap-1.5 text-xs text-[var(--muted-fg)]">
          <Mic className="h-3 w-3" />
          Microphone required · No account needed
        </p>
      )}
      {callStatus === "active" && (
        <p className="text-xs font-medium text-green-500 animate-pulse">
          ● Live — Your AI receptionist is listening
        </p>
      )}
    </div>
  );
}
