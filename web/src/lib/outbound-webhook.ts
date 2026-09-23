/** Fail closed. An empty secret never authorizes, including the old hardcoded default. */
export function outboundWebhookAuthorized(
  header: string | null,
  secret: string | null | undefined
): boolean {
  const expected = secret?.trim() || "";
  if (!expected) return false;
  return header === `Bearer ${expected}`;
}
