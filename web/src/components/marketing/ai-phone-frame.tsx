"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AiPhoneFrameProps {
  children: ReactNode;
  avatarSrc?: string;
  name?: string;
  title?: string;
}

export function AiPhoneFrame({ 
  children,
  avatarSrc = "/ai-avatar.png",
  name = "Sarah",
  title = "Salon AI Receptionist"
}: AiPhoneFrameProps) {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      {/* Animated glowing orb behind the phone */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-8 z-0 rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--teal)] blur-3xl"
      />

      {/* The actual phone glass container */}
      <div className="relative z-10 overflow-hidden rounded-[40px] border border-white/30 bg-white/5 p-6 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        {/* Subtle inner shadow for the glass edge */}
        <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none" />

        {/* Phone Speaker Notch */}
        <div className="absolute left-1/2 top-3 h-1.5 w-20 -translate-x-1/2 rounded-full bg-black/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
        
        <div className="mt-8 flex flex-col items-center justify-center">
          <div className="mb-6 h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-[0_0_40px_rgba(var(--accent-rgb),0.4)]">
            <img 
              src={avatarSrc} 
              alt="AI Receptionist"
              className="h-full w-full object-cover"
            />
          </div>
          
          <h3 className="mb-1 font-display text-lg font-semibold text-white">{name}</h3>
          <p className="mb-8 text-sm text-white/70">{title}</p>
          
          {children}
          
          <p className="mt-6 text-center text-xs font-medium text-white/60">
            Microphone required to speak
          </p>
        </div>
        
        {/* Phone Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
