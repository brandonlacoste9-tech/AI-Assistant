import { getVapiPrivateKey } from "@/lib/vapi/config";

const VAPI_BASE = "https://api.vapi.ai";

export async function vapiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null; status: number }> {
  const key = getVapiPrivateKey();
  if (!key) return { data: null, error: "Vapi not configured", status: 503 };

  try {
    const res = await fetch(`${VAPI_BASE}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const text = await res.text();
    let data: T | null = null;
    if (text) {
      try {
        data = JSON.parse(text) as T;
      } catch {
        return { data: null, error: text, status: res.status };
      }
    }

    if (!res.ok) {
      const err =
        typeof data === "object" && data && "message" in data
          ? String((data as { message: string }).message)
          : text || res.statusText;
      return { data: null, error: err, status: res.status };
    }

    return { data, error: null, status: res.status };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : "Vapi request failed", status: 500 };
  }
}

export type VapiAssistant = { id: string; name?: string };

export async function listAssistants() {
  return vapiFetch<VapiAssistant[]>("/assistant", { method: "GET" });
}