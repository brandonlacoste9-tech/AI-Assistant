/**
 * Welcome email template — sent immediately after signup.
 * Bilingual: renders based on locale.
 */

export function welcomeEmail({
  businessName,
  locale,
  loginUrl,
}: {
  businessName: string;
  locale: "fr" | "en";
  loginUrl: string;
}): { subject: string; html: string; text: string } {
  const fr = locale === "fr";

  const subject = fr
    ? `Bienvenue sur JustBookMe, ${businessName}!`
    : `Welcome to JustBookMe, ${businessName}!`;

  const html = `
<!DOCTYPE html>
<html lang="${fr ? "fr" : "en"}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8f9fa;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:#ffffff;border-radius:12px;padding:40px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
      <!-- Logo -->
      <div style="text-align:center;margin-bottom:32px;">
        <h1 style="font-size:24px;color:#1e3a5f;margin:0;">JustBookMe</h1>
      </div>

      <!-- Greeting -->
      <h2 style="font-size:20px;color:#1e3a5f;margin:0 0 16px;">
        ${fr ? `Bienvenue, ${businessName}!` : `Welcome, ${businessName}!`}
      </h2>

      <p style="font-size:15px;line-height:1.6;color:#374151;margin:0 0 16px;">
        ${
          fr
            ? "Votre réceptionniste IA est presque prête. Voici les prochaines étapes pour commencer à récupérer vos appels manqués :"
            : "Your AI receptionist is almost ready. Here's what to do next to start recovering missed calls:"
        }
      </p>

      <!-- Steps -->
      <ol style="font-size:15px;line-height:1.8;color:#374151;padding-left:20px;margin:0 0 24px;">
        <li>${fr ? "Ajoutez vos services et heures d'ouverture" : "Add your services and working hours"}</li>
        <li>${fr ? "Personnalisez le message d'accueil de votre IA" : "Customize your AI greeting"}</li>
        <li>${fr ? "Transférez vos appels manqués vers votre numéro IA" : "Forward missed calls to your AI number"}</li>
      </ol>

      <p style="font-size:15px;line-height:1.6;color:#374151;margin:0 0 24px;">
        ${
          fr
            ? "Tout cela prend moins de 5 minutes dans votre tableau de bord."
            : "All of this takes less than 5 minutes in your dashboard."
        }
      </p>

      <!-- CTA Button -->
      <div style="text-align:center;margin:32px 0;">
        <a href="${loginUrl}" style="display:inline-block;background:#1e3a5f;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;">
          ${fr ? "Accéder à mon tableau de bord" : "Go to my Dashboard"}
        </a>
      </div>

      <!-- Trial info -->
      <p style="font-size:13px;color:#6b7280;text-align:center;margin:0 0 16px;">
        ${
          fr
            ? "Vous avez 7 jours d'essai gratuit — aucune carte de crédit requise."
            : "You have a 7-day free trial — no credit card required."
        }
      </p>

      <!-- Help -->
      <div style="border-top:1px solid #e5e7eb;padding-top:24px;margin-top:24px;">
        <p style="font-size:13px;color:#6b7280;margin:0;">
          ${
            fr
              ? "Des questions? Répondez simplement à ce courriel ou écrivez-nous à info@justbookme.ca."
              : "Questions? Just reply to this email or reach us at info@justbookme.ca."
          }
        </p>
      </div>
    </div>

    <!-- Footer -->
    <p style="font-size:12px;color:#9ca3af;text-align:center;margin-top:24px;">
      © ${new Date().getFullYear()} JustBookMe · Montréal, QC, Canada
    </p>
  </div>
</body>
</html>`.trim();

  const text = fr
    ? `Bienvenue sur JustBookMe, ${businessName}!\n\nVotre réceptionniste IA est presque prête.\n\nProchaines étapes:\n1. Ajoutez vos services et heures d'ouverture\n2. Personnalisez le message d'accueil\n3. Transférez vos appels manqués\n\nAccédez à votre tableau de bord: ${loginUrl}\n\nVous avez 7 jours d'essai gratuit.\n\nQuestions? info@justbookme.ca`
    : `Welcome to JustBookMe, ${businessName}!\n\nYour AI receptionist is almost ready.\n\nNext steps:\n1. Add your services and working hours\n2. Customize your AI greeting\n3. Forward missed calls to your AI number\n\nGo to your dashboard: ${loginUrl}\n\nYou have a 7-day free trial — no credit card required.\n\nQuestions? info@justbookme.ca`;

  return { subject, html, text };
}
