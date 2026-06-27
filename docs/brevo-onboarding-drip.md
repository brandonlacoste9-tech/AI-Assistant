# JustBookMe — 7-Email Trial Onboarding Drip Sequence
**Product:** JustBookMe (justbookme.ca) — Bilingual AI Receptionist for Quebec Service Businesses  
**Trial length:** 14 days, no credit card required  
**From name:** JustBookMe  
**Reply-to:** hello@justbookme.ca  
**Total emails:** 14 (FR + EN for each of 7 emails)

---

### Email 1 — Day 0 — Welcome + Next Step
**Trigger:** Immediately upon signup confirmation  
**Subject (FR):** Ton IA répond déjà au téléphone — voici comment l'activer (10 min)  
**Subject (EN):** Your AI receptionist is ready — get it live in 10 minutes

---

**Body (FR):**

Salut !

Bienvenue chez JustBookMe! Merci d'avoir rejoint l'essai — t'as pris la bonne décision.

Ton IA est prête, mais elle attend un détail de ta part avant de répondre à tes appels manqués.

Ça prend 10 minutes max :

1. Connecte ton numéro de téléphone
2. Indique tes heures d'ouverture
3. L'IA commence à répondre dès ce soir

C'est vraiment tout. Pas besoin de carte de crédit, pas de technicien, pas de configuration compliquée.

Clique sur le bouton ci-dessous pour démarrer maintenant.

JustBookMe · justbookme.ca

---

**Body (EN):**

Hey!

Welcome to JustBookMe! Thanks for signing up — you made a great call.

Your AI receptionist is ready, but it needs one thing from you before it can start answering missed calls.

It takes 10 minutes:

1. Connect your phone number
2. Set your availability hours
3. Your AI goes live tonight

That's genuinely it. No credit card, no tech person, no complicated setup.

Click below to get started right now.

JustBookMe · justbookme.ca

---

**CTA (FR):** Connecter mon numéro → https://app.justbookme.ca/setup/phone  
**CTA (EN):** Connect my number → https://app.justbookme.ca/setup/phone  
**Brevo automation notes:** Send immediately on contact creation. Tag: `onboarding_email_1_sent`. If contact already has `phone_connected = true` (pre-verified signup flow), swap CTA to "Set my availability" → https://app.justbookme.ca/setup/availability.

---

### Email 2 — Day 1 — First Value Hit
**Trigger:** 24 hours after signup  
**Subject (FR):** Est-ce que ton téléphone a sonné dans le vide hier soir ?  
**Subject (EN):** Did any calls go unanswered last night?

---

**Body (FR):**

Si t'as pas encore connecté ton numéro, pas de panique — mais pense à ceci :

5 appels manqués par semaine à 80 $ chacun, c'est 1 600 $ par mois qui part à la concurrence. Chaque mois.

JustBookMe récupère ces appels-là, 24h/24, en français et en anglais.

Veux-tu entendre à quoi ça ressemble vraiment ? Appelle notre ligne démo maintenant et écoute l'IA en action — c'est ton IA, avec le ton de ta business.

Une fois que t'as entendu ça, tu vas comprendre pourquoi nos clients ne reviennent pas en arrière.

JustBookMe · justbookme.ca

---

**Body (EN):**

If you haven't connected your number yet, no stress — but think about this:

5 missed calls per week at $80 each is $1,600 a month walking out the door. Every month.

JustBookMe catches those calls, 24/7, in both French and English.

Want to hear what it actually sounds like? Call our demo line right now and listen to the AI in action — this is what your clients will hear.

Once you hear it, you'll understand why our users never go back.

JustBookMe · justbookme.ca

---

**CTA (FR):** Écouter la démo → https://justbookme.ca/demo-line  
**CTA (EN):** Hear the demo → https://justbookme.ca/demo-line  
**Brevo automation notes:** If `phone_connected = true`, replace opening paragraph with: "Ton IA est en ligne — bravo. / Your AI is live — nice work." and lead directly into the ROI stat as validation of what they've already set up. Skip if contact has `demo_called = true`.

---

### Email 3 — Day 3 — Social Proof
**Trigger:** 72 hours after signup  
**Subject (FR):** Comment Marie a rempli son agenda en une semaine  
**Subject (EN):** How Marie filled her calendar in one week

---

**Body (FR):**

Marie gère le Salon Freyja dans le Plateau. Avant JustBookMe, elle perdait des clients chaque soir après 17h — personne pour répondre, personne pour booker.

La première semaine avec l'IA, elle a récupéré 11 rendez-vous qu'elle aurait normalement perdus. C'est plus de 800 $ de revenus qu'elle n'attendait pas.

Elle m'a dit : "Je pensais que ça allait être compliqué. J'étais en ligne en 15 minutes."

Si tu veux le même résultat, je t'offre 15 minutes avec moi pour configurer ton compte ensemble. Gratuit, sans pression.

JustBookMe · justbookme.ca

---

**Body (EN):**

Marie runs Salon Freyja in the Plateau. Before JustBookMe, she was losing clients every evening after 5 PM — no one to answer, no one to book.

In her first week with the AI, she recovered 11 appointments she would have missed. That's over $800 in revenue she wasn't expecting.

She told me: "I thought it would be complicated. I was online in 15 minutes."

If you want the same result, I'm offering a free 15-minute call to set up your account together. No pressure, no pitch.

JustBookMe · justbookme.ca

---

**CTA (FR):** Réserver 15 min avec notre équipe → [Team demo link placeholder]  
**CTA (EN):** Book 15 min with our team → [Team demo link placeholder]  
**Brevo automation notes:** Send to all active trial contacts regardless of setup status. This email is pure social proof — no conditional skip logic needed. Tag: `onboarding_email_3_sent`.

---

### Email 4 — Day 5 — Feature Spotlight: SMS Reminders
**Trigger:** 5 days after signup  
**Subject (FR):** 1 client sur 5 ne se présente pas — voici comment arrêter ça  
**Subject (EN):** 1 in 5 clients don't show up — here's how to stop that

---

**Body (FR):**

Le taux moyen de no-show dans les salons et cliniques, c'est 20 %. Ça veut dire qu'une plage sur cinq dans ton agenda part à la poubelle.

JustBookMe envoie automatiquement un rappel SMS à chaque client avant son rendez-vous. Ils confirment, annulent ou replanifient — toi, tu n'as rien à faire.

Nos clients rapportent une réduction des no-shows de plus de 70 % après le premier mois.

Active les rappels SMS maintenant dans ton tableau de bord — ça prend 2 minutes.

JustBookMe · justbookme.ca

---

**Body (EN):**

The average no-show rate for salons and clinics is 20%. That means one out of every five slots in your calendar is just gone.

JustBookMe automatically sends an SMS reminder to every client before their appointment. They confirm, cancel, or reschedule — you do nothing.

Our clients report over 70% fewer no-shows after the first month.

Turn on SMS reminders right now in your dashboard — it takes 2 minutes.

JustBookMe · justbookme.ca

---

**CTA (FR):** Activer les rappels SMS → https://app.justbookme.ca/settings/reminders  
**CTA (EN):** Turn on SMS reminders → https://app.justbookme.ca/settings/reminders  
**Brevo automation notes:** Skip if `sms_reminders_enabled = true`. If skipped, replace with a short "You've already got SMS reminders on — here's what to check next" variant pointing to the calendar sync settings page.

---

### Email 5 — Day 7 — Halfway Check-in
**Trigger:** 7 days after signup  
**Subject (FR):** Comment ça se passe jusqu'ici ?  
**Subject (EN):** How's it going so far?

---

**Body (FR):**

Hey,

T'es rendu à mi-chemin de ton essai. Je voulais juste prendre des nouvelles pour vrai.

Est-ce que l'IA répond à tes appels ? Est-ce que le calendrier se remplit ? Si t'as des questions ou si quelque chose bloque, réponds directement à cet email — c'est moi qui lis.

Si t'as pas encore eu le temps de configurer, pas de problème. Je peux te rejoindre 15 minutes cette semaine et on règle ça ensemble.

Dis-moi comment tu vas.

JustBookMe · justbookme.ca

---

**Body (EN):**

Hey,

You're halfway through your trial. I just wanted to check in for real.

Is the AI answering your calls? Is the calendar filling up? If you have questions or something's not working, reply directly to this email — I'm the one reading it.

If you haven't had a chance to set things up yet, no worries. I can jump on a 15-minute call with you this week and we'll sort it out together.

Just let me know how you're doing.

JustBookMe · justbookme.ca

---

**CTA (FR):** Réserver un appel de configuration → [Team demo link placeholder]  
**CTA (EN):** Book a setup call → [Team demo link placeholder]  
**Brevo automation notes:** This email should use plain-text template in Brevo (no header image, no footer logo) to maximize the handwritten feel. Primary CTA is reply; the booking link is secondary. Send to all trial contacts. Tag contacts who click as `requested_setup_call`.

---

### Email 6 — Day 10 — Urgency: 4 Days Left
**Trigger:** 10 days after signup  
**Subject (FR):** Il te reste 4 jours — voici ce que tu perdrais  
**Subject (EN):** 4 days left — here's what you'd be giving up

---

**Body (FR):**

Ton essai se termine dans 4 jours.

Depuis que t'as commencé, ton IA a répondu à {{ calls_answered }} appels et bookingé {{ bookings_made }} rendez-vous. C'est de l'argent qui serait passé à ta concurrence.

JustBookMe Pro coûte 149 $/mois. Un seul nouveau client récupéré vaut entre 80 $ et 150 $. Le calcul est simple.

Si tu veux juste les bases, le plan Starter est à 49 $/mois.

Upgrade maintenant et tout ce que t'as configuré reste en place.

JustBookMe · justbookme.ca

---

**Body (EN):**

Your trial ends in 4 days.

Since you started, your AI has answered {{ calls_answered }} calls and booked {{ bookings_made }} appointments. That's revenue that would have gone to your competition.

JustBookMe Pro is $149/month. A single recovered client is worth $80 to $150. The math is easy.

If you just want the essentials, the Starter plan is $49/month.

Upgrade now and everything you've set up stays exactly as is.

JustBookMe · justbookme.ca

---

**CTA (FR):** Passer à un plan payant → https://justbookme.ca/pricing  
**CTA (EN):** Upgrade now — keep everything → https://justbookme.ca/pricing  
**Brevo automation notes:** Use Brevo dynamic content blocks for `{{ calls_answered }}` and `{{ bookings_made }}` pulled from contact attributes synced from the app. If attributes are null/zero (user never activated), replace that paragraph with: "Même si t'as pas encore activé ton IA, il est encore temps. / Even if you haven't activated your AI yet, there's still time." and swap CTA to the setup page. Tag clickers as `upgrade_intent`.

---

### Email 7 — Day 13 — Last Chance
**Trigger:** 13 days after signup (trial ends tomorrow)  
**Subject (FR):** Ton essai se termine demain  
**Subject (EN):** Your trial ends tomorrow

---

**Body (FR):**

C'est le dernier jour de ton essai gratuit.

T'as deux options :

1. Upgrader maintenant et continuer sans interruption (à partir de 49 $/mois)
2. Répondre à cet email et me demander 7 jours de plus — je dis oui sans hésiter

Si t'as des questions avant de décider, réponds ici.

JustBookMe · justbookme.ca

---

**Body (EN):**

Today is the last day of your free trial.

You've got two options:

1. Upgrade now and keep everything running without interruption (from $49/month)
2. Reply to this email and ask me for 7 more days — I'll say yes without hesitation

If you have any questions before deciding, just reply here.

JustBookMe · justbookme.ca

---

**CTA (FR):** Choisir mon plan → https://justbookme.ca/pricing  
**CTA (EN):** Choose my plan → https://justbookme.ca/pricing  
**Brevo automation notes:** Primary CTA links to /pricing. Add a plain-text secondary line below the button: "Ou réponds à cet email pour 7 jours de plus. / Or reply to this email for 7 more days." Contacts who reply should be tagged `extension_requested` and routed to the support inbox via a Brevo conversation or webhook. Skip this email if `subscription_active = true`. This email should also use the plain-text template for authenticity.

---

## Brevo Automation Setup Summary

| Email | Trigger | Key Condition |
|---|---|---|
| 1 | Signup (Day 0) | Always send |
| 2 | Day 1 | Swap body if `phone_connected = true` |
| 3 | Day 3 | Always send |
| 4 | Day 5 | Skip if `sms_reminders_enabled = true` |
| 5 | Day 7 | Always send — use plain-text template |
| 6 | Day 10 | Use dynamic stats; fallback if null |
| 7 | Day 13 | Skip if `subscription_active = true` — use plain-text template |

**Exit condition for all emails:** Set `subscription_active = true` on upgrade and remove contact from the onboarding automation immediately.

**Contact attributes to sync from app.justbookme.ca:**
- `phone_connected` (boolean)
- `sms_reminders_enabled` (boolean)
- `calls_answered` (integer)
- `bookings_made` (integer)
- `subscription_active` (boolean)

**Recommended Brevo workflow:** Use a single automation with date-based wait steps off the `signup_date` attribute. All conditional logic above is handled via Brevo's "If/Else" path blocks within each step.
