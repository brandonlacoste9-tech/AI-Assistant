export function getVapiPrivateKey(): string | null {
  return process.env.VAPI_PRIVATE_KEY?.trim() || null;
}

export function getVapiPublicKey(): string | null {
  return process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY?.trim() || null;
}

export function isVapiConfigured(): boolean {
  return Boolean(getVapiPrivateKey());
}