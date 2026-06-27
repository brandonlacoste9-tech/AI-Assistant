/**
 * Lightweight email sender using a simple SMTP-free approach.
 * Uses Supabase Edge Functions or a simple fetch to a transactional email provider.
 *
 * For MVP: We'll use Supabase's built-in email (via auth hooks) or a simple
 * Resend/Postmark integration. This module provides the abstraction layer.
 */

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

/**
 * Send a transactional email.
 * Supports: Resend (RESEND_API_KEY) or falls back to console logging in dev.
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress =
    process.env.EMAIL_FROM?.trim() || "JustBookMe <noreply@justbookme.ca>";

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
        }),
      });

      if (!res.ok) {
        console.error("[email] Resend error:", res.status, await res.text());
        return false;
      }
      return true;
    } catch (err) {
      console.error("[email] Resend exception:", err);
      return false;
    }
  }

  // Fallback: log to console in development
  console.log("[email] No provider configured. Would send:", {
    to: payload.to,
    subject: payload.subject,
  });
  return true;
}
