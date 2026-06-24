import type { Locale } from "./types";

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { pricing: string; demo: string; trial: string; login: string };
  hero: {
    headline: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
  };
  howItWorks: { title: string; steps: string[] };
  builtForQuebec: { title: string; items: string[] };
  features: { title: string; items: { title: string; desc: string }[] };
  roi: { title: string; rows: { label: string; value: string }[]; punchline: string };
  waitlist: {
    title: string;
    subtitle: string;
    fields: {
      businessName: string;
      contactName: string;
      email: string;
      phone: string;
      city: string;
      staffCount: string;
      pain: string;
    };
    pains: { value: string; label: string }[];
    submit: string;
    success: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: { cta: string; rights: string; privacy: string; terms: string };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    annual: string;
    save: string;
    billedYearly: string;
    perMonth: string;
    popular: string;
    trialNote: string;
    cta: string;
    contact: string;
    faqTitle: string;
    taxNote: string;
    plans: {
      starter: { name: string; features: string[] };
      pro: { name: string; features: string[] };
      premium: { name: string; features: string[] };
    };
    billingFaq: { q: string; a: string }[];
  };
  signup: {
    title: string;
    subtitle: string;
    step1: string;
    fields: {
      email: string;
      password: string;
      businessName: string;
      city: string;
      phone: string;
      language: string;
    };
    langOptions: { fr: string; en: string };
    submit: string;
    success: string;
    hasAccount: string;
  };
  login: {
    title: string;
    subtitle: string;
    fields: { email: string; password: string };
    submit: string;
    registered: string;
    noAccount: string;
    configError: string;
  };
  legal: {
    back: string;
    updated: string;
    contact: string;
    privacy: { title: string; sections: { heading: string; paragraphs: string[] }[] };
    terms: { title: string; sections: { heading: string; paragraphs: string[] }[] };
  };
  dashboard: {
    title: string;
    subtitle: string;
    nav: {
      today: string;
      bookings: string;
      leads: string;
      settings: string;
      logout: string;
    };
    stats: { bookingsToday: string; activeLeads: string; recoveredCalls: string };
    trial: { title: string; plan: string; ends: string };
    settings: {
      subtitle: string;
      business: string;
      email: string;
      plan: string;
      language: string;
      billingNote: string;
    };
    bookings: {
      add: string;
      customerName: string;
      phone: string;
      serviceOptional: string;
      notes: string;
      save: string;
      cancel: string;
      empty: string;
      error: string;
    };
    leads: {
      add: string;
      name: string;
      phone: string;
      notes: string;
      save: string;
      empty: string;
      error: string;
      sources: { manual: string; missedCall: string; webForm: string };
      stages: { new: string; contacted: string; booked: string; lost: string };
    };
  };
  onboarding: {
    title: string;
    subtitle: string;
    step: string;
    next: string;
    error: string;
    days: Record<string, string>;
    hours: { title: string; subtitle: string };
    services: {
      title: string;
      subtitle: string;
      name: string;
      duration: string;
      price: string;
      add: string;
    };
    done: { title: string; subtitle: string; cta: string };
  };
};

const fr: Dictionary = {
  meta: {
    title: "RendezVous AI — Ne manquez plus un rendez-vous",
    description:
      "Réceptionniste IA bilingue pour salons, barbershops et entreprises de services au Québec. Appels manqués, réservations et rappels SMS automatiques.",
  },
  nav: {
    pricing: "Tarification",
    demo: "Réserver une démo",
    trial: "Liste d'attente",
    login: "Connexion",
  },
  hero: {
    headline: "Arrêtez de perdre des rendez-vous à cause des appels manqués.",
    subhead:
      "RendezVous AI répond au téléphone 24 h/24, prend les rendez-vous et envoie les rappels par SMS — en français ou en anglais. Conçu pour les salons, barbershops et entreprises de services au Québec.",
    ctaPrimary: "Réserver ma place fondateur",
    ctaSecondary: "Réserver une démo de 15 minutes",
    trust: "Conçu au Québec · Bilingue · Essai 14 jours sans carte",
  },
  howItWorks: {
    title: "Comment ça fonctionne",
    steps: [
      "On connecte votre numéro existant ou on vous en attribue un nouveau.",
      "Votre réceptionniste IA répond, réserve et confirme — bilingue.",
      "Vous consultez chaque matin votre tableau de bord des revenus récupérés.",
    ],
  },
  builtForQuebec: {
    title: "Conçu pour le Québec",
    items: [
      "Bilingue FR/EN avec une voix naturelle",
      "Prix en CAD, facturation TPS/TVQ",
      "Conforme à la Loi 25",
      "Soutien local, heures d'affaires EST/EDT",
    ],
  },
  features: {
    title: "Votre réceptionniste IA, 24/7",
    items: [
      {
        title: "Répond aux appels manqués",
        desc: "L'IA décroche, qualifie le client et propose des créneaux disponibles.",
      },
      {
        title: "Prend les rendez-vous",
        desc: "Réservation, report ou annulation — synchronisé avec votre calendrier.",
      },
      {
        title: "Rappels SMS automatiques",
        desc: "Confirmation, rappel 24h et 2h — en français ou en anglais.",
      },
      {
        title: "Pipeline de leads",
        desc: "Chaque appel et formulaire web dans une timeline claire.",
      },
      {
        title: "Tableau de bord quotidien",
        desc: "Rendez-vous, no-shows et appels récupérés en un coup d'œil.",
      },
    ],
  },
  roi: {
    title: "Combien vous coûte un appel manqué?",
    rows: [
      { label: "5 appels manqués / semaine × 80 $", value: "1 600 $/mois" },
      { label: "4 no-shows / semaine × 100 $", value: "1 600 $/mois" },
      { label: "RendezVous AI Pro", value: "149 $/mois" },
    ],
    punchline: "Un seul rendez-vous récupéré par semaine paie l'abonnement.",
  },
  waitlist: {
    title: "Rejoignez la liste d'attente",
    subtitle:
      "Soyez parmi les 10 premiers salons et barbershops au Québec à tester RendezVous AI. Tarif fondateur garanti à vie.",
    fields: {
      businessName: "Nom du salon",
      contactName: "Votre nom",
      email: "Courriel",
      phone: "Téléphone",
      city: "Ville",
      staffCount: "Nombre d'employés",
      pain: "Principal défi",
    },
    pains: [
      { value: "missed_calls", label: "Appels manqués" },
      { value: "no_shows", label: "No-shows" },
      { value: "scheduling", label: "Planification" },
      { value: "web_leads", label: "Leads web" },
    ],
    submit: "Réserver ma place",
    success: "Merci! On vous contacte dans 48h pour une démo personnalisée.",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Est-ce que ça ressemble à un robot?",
        a: "Non — voix naturelle entraînée sur des conversations réelles. Appelez notre ligne démo pour juger.",
      },
      {
        q: "Et si l'appelant veut parler à un humain?",
        a: "Transfert immédiat ou message pris — sans friction.",
      },
      {
        q: "Compatible avec mon agenda?",
        a: "Oui — Google Calendar et iCal dès le jour 1.",
      },
      {
        q: "Mes données sont-elles sécurisées?",
        a: "Hébergées au Canada, conformes à la Loi 25.",
      },
      {
        q: "Puis-je personnaliser les scripts?",
        a: "Oui — chaque prompt et modèle SMS est modifiable.",
      },
    ],
  },
  footer: {
    cta: "Prêt à ne plus perdre de clients?",
    rights: "RendezVous AI · Montréal, QC",
    privacy: "Confidentialité",
    terms: "Conditions",
  },
  pricing: {
    title: "Tarification simple",
    subtitle:
      "Pour les entreprises de services au Québec. Essai gratuit de 14 jours. Annulation en tout temps.",
    monthly: "Mensuel",
    annual: "Annuel",
    save: "Économisez 17 %",
    billedYearly: "facturé",
    perMonth: "/mois",
    popular: "Le plus populaire",
    trialNote:
      "Aucune carte de crédit requise pour commencer. Ajoutez un paiement en tout temps pendant l'essai.",
    cta: "Commencer l'essai gratuit",
    contact: "Nous contacter",
    faqTitle: "Facturation",
    taxNote:
      "Les prix affichés n'incluent pas les taxes applicables. TPS/TVQ calculées à la caisse.",
    plans: {
      starter: {
        name: "Starter",
        features: [
          "1 employé",
          "100 réservations/mois",
          "200 SMS",
          "100 min voix",
          "Widget web + calendrier",
        ],
      },
      pro: {
        name: "Pro",
        features: [
          "Jusqu'à 5 employés",
          "Réservations illimitées",
          "1 000 SMS",
          "500 min voix",
          "Automatisation SMS + pipeline",
        ],
      },
      premium: {
        name: "Premium",
        features: [
          "Multi-succursales (5)",
          "Employés illimités",
          "5 000 SMS",
          "2 500 min voix",
          "Voix avancée + marque blanche",
        ],
      },
    },
    billingFaq: [
      {
        q: "Faut-il une carte pour l'essai?",
        a: "Non. Inscrivez-vous par courriel, utilisez le forfait Pro pendant 14 jours.",
      },
      {
        q: "Puis-je changer de forfait?",
        a: "Oui — mise à niveau ou rétrogradation en tout temps, au prorata.",
      },
      {
        q: "Les taxes sont-elles incluses?",
        a: "Non — TPS/TVQ calculées à la caisse via Stripe.",
      },
    ],
  },
  signup: {
    title: "Commencez votre essai gratuit",
    subtitle: "14 jours du forfait Pro. Aucune carte requise.",
    step1: "Créez votre compte",
    fields: {
      email: "Courriel",
      password: "Mot de passe",
      businessName: "Nom de l'entreprise",
      city: "Ville",
      phone: "Téléphone",
      language: "Langue par défaut",
    },
    langOptions: { fr: "Français", en: "English" },
    submit: "Créer mon compte",
    success: "Compte créé! Connectez-vous pour configurer votre salon.",
    hasAccount: "Déjà un compte?",
  },
  login: {
    title: "Connexion",
    subtitle: "Accédez à votre tableau de bord RendezVous AI.",
    fields: { email: "Courriel", password: "Mot de passe" },
    submit: "Se connecter",
    registered: "Compte créé! Connectez-vous pour continuer.",
    noAccount: "Pas encore de compte?",
    configError: "Connexion indisponible — configuration serveur manquante.",
  },
  legal: {
    back: "Retour à l'accueil",
    updated: "Dernière mise à jour",
    contact: "Questions",
    privacy: {
      title: "Politique de confidentialité",
      sections: [
        {
          heading: "Responsable",
          paragraphs: [
            "RendezVous AI (« nous ») exploite rendezvousai.ca et les services associés pour les salons et entreprises de services au Québec.",
          ],
        },
        {
          heading: "Données collectées",
          paragraphs: [
            "Nous collectons les renseignements que vous fournissez (nom, courriel, téléphone, nom d'entreprise) via la liste d'attente, l'inscription et le tableau de bord.",
            "Les données d'utilisation (rendez-vous, leads, journaux d'appels) sont stockées pour fournir le service.",
          ],
        },
        {
          heading: "Hébergement et sécurité",
          paragraphs: [
            "Les données sont hébergées sur Supabase (infrastructure cloud). Nous appliquons le contrôle d'accès par entreprise (RLS) et le chiffrement en transit.",
          ],
        },
        {
          heading: "Vos droits (Loi 25)",
          paragraphs: [
            "Vous pouvez demander l'accès, la rectification ou la suppression de vos renseignements personnels en écrivant à contact@rendezvousai.ca.",
          ],
        },
      ],
    },
    terms: {
      title: "Conditions d'utilisation",
      sections: [
        {
          heading: "Service",
          paragraphs: [
            "RendezVous AI fournit une réceptionniste IA et des outils de réservation pour les entreprises de services. Les fonctionnalités peuvent évoluer pendant la phase pilote.",
          ],
        },
        {
          heading: "Essai gratuit",
          paragraphs: [
            "L'essai de 14 jours est offert sans carte de crédit. À la fin de l'essai, l'accès peut être suspendu sans paiement.",
          ],
        },
        {
          heading: "Utilisation acceptable",
          paragraphs: [
            "Vous êtes responsable du contenu des messages envoyés à vos clients et du respect des lois applicables (TPS/TVQ, Loi 25, CASL pour les SMS).",
          ],
        },
        {
          heading: "Annulation",
          paragraphs: [
            "Vous pouvez annuler en tout temps. Les données peuvent être exportées sur demande avant la fermeture du compte.",
          ],
        },
      ],
    },
  },
  dashboard: {
    title: "Aujourd'hui",
    subtitle: "Vue d'ensemble de votre activité.",
    nav: {
      today: "Aujourd'hui",
      bookings: "Rendez-vous",
      leads: "Leads",
      settings: "Paramètres",
      logout: "Déconnexion",
    },
    stats: {
      bookingsToday: "Rendez-vous aujourd'hui",
      activeLeads: "Leads actifs",
      recoveredCalls: "Appels récupérés",
    },
    trial: { title: "Votre essai", plan: "Forfait", ends: "Se termine le" },
    settings: {
      subtitle: "Informations de votre compte.",
      business: "Entreprise",
      email: "Courriel",
      plan: "Forfait",
      language: "Langue",
      billingNote: "La facturation Stripe sera disponible lors de l'activation complète du forfait.",
    },
    bookings: {
      add: "Nouveau rendez-vous",
      customerName: "Nom du client",
      phone: "Téléphone",
      serviceOptional: "Service (optionnel)",
      notes: "Notes",
      save: "Enregistrer",
      cancel: "Annuler",
      empty: "Aucun rendez-vous pour le moment.",
      error: "Erreur — réessayez.",
    },
    leads: {
      add: "Nouveau lead",
      name: "Nom",
      phone: "Téléphone",
      notes: "Notes",
      save: "Enregistrer",
      empty: "Aucun lead pour le moment.",
      error: "Erreur — réessayez.",
      sources: { manual: "Manuel", missedCall: "Appel manqué", webForm: "Formulaire web" },
      stages: { new: "Nouveau", contacted: "Contacté", booked: "Réservé", lost: "Perdu" },
    },
  },
  onboarding: {
    title: "Configurez votre salon",
    subtitle: "Quelques étapes pour activer votre tableau de bord.",
    step: "Étape",
    next: "Continuer",
    error: "Erreur — réessayez.",
    days: {
      mon: "Lun",
      tue: "Mar",
      wed: "Mer",
      thu: "Jeu",
      fri: "Ven",
      sat: "Sam",
      sun: "Dim",
    },
    hours: {
      title: "Heures d'ouverture",
      subtitle: "Utilisées pour proposer des créneaux aux clients.",
    },
    services: {
      title: "Vos services",
      subtitle: "Ajoutez au moins un service proposé à vos clients.",
      name: "Nom",
      duration: "Durée (min)",
      price: "Prix ($)",
      add: "Ajouter un service",
    },
    done: {
      title: "C'est prêt!",
      subtitle: "Votre tableau de bord est activé. Vous pouvez ajouter des rendez-vous et des leads.",
      cta: "Ouvrir le tableau de bord",
    },
  },
};

const en: Dictionary = {
  meta: {
    title: "RendezVous AI — Never miss a booking again",
    description:
      "Bilingual AI receptionist for Quebec salons, barbershops & service businesses. Missed calls, bookings, and SMS reminders.",
  },
  nav: {
    pricing: "Pricing",
    demo: "Book a demo",
    trial: "Join waitlist",
    login: "Log in",
  },
  hero: {
    headline: "Stop losing bookings to missed calls.",
    subhead:
      "RendezVous AI answers your phone 24/7, books appointments, and follows up by SMS — in French or English. Built for Quebec service businesses.",
    ctaPrimary: "Claim founder spot",
    ctaSecondary: "Book a 15-minute demo",
    trust: "Built in Quebec · Bilingual · 14-day trial, no card",
  },
  howItWorks: {
    title: "How it works",
    steps: [
      "We connect to your existing phone number or give you a new one.",
      "Your AI receptionist answers, books, and confirms — bilingually.",
      "You check your recovered-revenue dashboard every morning.",
    ],
  },
  builtForQuebec: {
    title: "Built for Quebec",
    items: [
      "Bilingual FR/EN with native-quality voice",
      "CAD pricing, PST/QST invoicing",
      "Compliant with Quebec privacy law (Law 25)",
      "Local support, business hours in EST/EDT",
    ],
  },
  features: {
    title: "Your AI receptionist, 24/7",
    items: [
      {
        title: "Answers missed calls",
        desc: "AI picks up, qualifies the client, and offers open slots.",
      },
      {
        title: "Books appointments",
        desc: "Book, reschedule, or cancel — synced to your calendar.",
      },
      {
        title: "Automatic SMS reminders",
        desc: "Confirmation, 24h and 2h reminders — French or English.",
      },
      {
        title: "Lead pipeline",
        desc: "Every call and web form in one clear timeline.",
      },
      {
        title: "Daily dashboard",
        desc: "Bookings, no-shows, and recovered calls at a glance.",
      },
    ],
  },
  roi: {
    title: "What does a missed call cost you?",
    rows: [
      { label: "5 missed calls/week × $80", value: "$1,600/month" },
      { label: "4 no-shows/week × $100", value: "$1,600/month" },
      { label: "RendezVous AI Pro", value: "$149/month" },
    ],
    punchline: "Recover one appointment per week and the subscription pays for itself.",
  },
  waitlist: {
    title: "Join the waitlist",
    subtitle:
      "Be among the first 10 Quebec salons & barbershops to try RendezVous AI. Founder pricing locked for life.",
    fields: {
      businessName: "Business name",
      contactName: "Your name",
      email: "Email",
      phone: "Phone",
      city: "City",
      staffCount: "Staff count",
      pain: "Biggest challenge",
    },
    pains: [
      { value: "missed_calls", label: "Missed calls" },
      { value: "no_shows", label: "No-shows" },
      { value: "scheduling", label: "Scheduling" },
      { value: "web_leads", label: "Web leads" },
    ],
    submit: "Save my spot",
    success: "Thanks! We'll reach out within 48 hours for a personalized demo.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Does it sound like a robot?",
        a: "No — natural voice trained on real conversations. Call our demo line to hear it.",
      },
      {
        q: "What if the caller wants a human?",
        a: "Instant transfer or message taken — no friction.",
      },
      {
        q: "Will it integrate with my calendar?",
        a: "Yes — Google Calendar and iCal on day one.",
      },
      {
        q: "Is my data safe?",
        a: "Hosted in Canada, compliant with Law 25.",
      },
      {
        q: "Can I customize the scripts?",
        a: "Yes — every prompt and SMS template is editable.",
      },
    ],
  },
  footer: {
    cta: "Ready to stop losing clients?",
    rights: "RendezVous AI · Montreal, QC",
    privacy: "Privacy",
    terms: "Terms",
  },
  pricing: {
    title: "Simple pricing",
    subtitle:
      "For Quebec service businesses. 14-day free trial. Cancel anytime.",
    monthly: "Monthly",
    annual: "Annual",
    save: "Save 17%",
    billedYearly: "billed",
    perMonth: "/mo",
    popular: "Most popular",
    trialNote:
      "No credit card required to start. Add payment anytime during your trial.",
    cta: "Start free trial",
    contact: "Contact us",
    faqTitle: "Billing",
    taxNote:
      "Prices shown exclude applicable taxes. PST/QST calculated at checkout.",
    plans: {
      starter: {
        name: "Starter",
        features: [
          "1 staff member",
          "100 bookings/month",
          "200 SMS",
          "100 voice min",
          "Web widget + calendar",
        ],
      },
      pro: {
        name: "Pro",
        features: [
          "Up to 5 staff",
          "Unlimited bookings",
          "1,000 SMS",
          "500 voice min",
          "SMS automation + pipeline",
        ],
      },
      premium: {
        name: "Premium",
        features: [
          "Multi-location (5)",
          "Unlimited staff",
          "5,000 SMS",
          "2,500 voice min",
          "Advanced voice + white-label",
        ],
      },
    },
    billingFaq: [
      {
        q: "Do I need a card for the trial?",
        a: "No. Sign up with email, use Pro features for 14 days.",
      },
      {
        q: "Can I switch plans?",
        a: "Yes — upgrade or downgrade anytime, prorated automatically.",
      },
      {
        q: "Are taxes included?",
        a: "No — PST/QST calculated at checkout via Stripe.",
      },
    ],
  },
  signup: {
    title: "Start your free trial",
    subtitle: "14 days of Pro. No card required.",
    step1: "Create your account",
    fields: {
      email: "Email",
      password: "Password",
      businessName: "Business name",
      city: "City",
      phone: "Phone",
      language: "Default language",
    },
    langOptions: { fr: "Français", en: "English" },
    submit: "Create account",
    success: "Account created! Sign in to set up your business.",
    hasAccount: "Already have an account?",
  },
  login: {
    title: "Log in",
    subtitle: "Access your RendezVous AI dashboard.",
    fields: { email: "Email", password: "Password" },
    submit: "Log in",
    registered: "Account created! Sign in to continue.",
    noAccount: "Don't have an account?",
    configError: "Login unavailable — server not configured.",
  },
  legal: {
    back: "Back to home",
    updated: "Last updated",
    contact: "Questions",
    privacy: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "Data controller",
          paragraphs: [
            "RendezVous AI (« we ») operates rendezvousai.ca and related services for Quebec service businesses.",
          ],
        },
        {
          heading: "Data we collect",
          paragraphs: [
            "We collect information you provide (name, email, phone, business name) via waitlist, signup, and the dashboard.",
            "Usage data (bookings, leads, call logs) is stored to deliver the service.",
          ],
        },
        {
          heading: "Hosting and security",
          paragraphs: [
            "Data is hosted on Supabase (cloud infrastructure). We use per-business access control (RLS) and encryption in transit.",
          ],
        },
        {
          heading: "Your rights (Law 25)",
          paragraphs: [
            "You may request access, correction, or deletion of your personal information by emailing contact@rendezvousai.ca.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      sections: [
        {
          heading: "Service",
          paragraphs: [
            "RendezVous AI provides an AI receptionist and booking tools for service businesses. Features may evolve during the pilot phase.",
          ],
        },
        {
          heading: "Free trial",
          paragraphs: [
            "A 14-day trial is offered without a credit card. After the trial, access may be suspended without payment.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You are responsible for message content sent to your customers and compliance with applicable laws (PST/QST, Law 25, CASL for SMS).",
          ],
        },
        {
          heading: "Cancellation",
          paragraphs: [
            "You may cancel anytime. Data may be exported on request before account closure.",
          ],
        },
      ],
    },
  },
  dashboard: {
    title: "Today",
    subtitle: "Overview of your business activity.",
    nav: {
      today: "Today",
      bookings: "Bookings",
      leads: "Leads",
      settings: "Settings",
      logout: "Log out",
    },
    stats: {
      bookingsToday: "Bookings today",
      activeLeads: "Active leads",
      recoveredCalls: "Recovered calls",
    },
    trial: { title: "Your trial", plan: "Plan", ends: "Ends on" },
    settings: {
      subtitle: "Your account information.",
      business: "Business",
      email: "Email",
      plan: "Plan",
      language: "Language",
      billingNote: "Stripe billing will be available when full plan activation ships.",
    },
    bookings: {
      add: "New booking",
      customerName: "Customer name",
      phone: "Phone",
      serviceOptional: "Service (optional)",
      notes: "Notes",
      save: "Save",
      cancel: "Cancel",
      empty: "No bookings yet.",
      error: "Error — please try again.",
    },
    leads: {
      add: "New lead",
      name: "Name",
      phone: "Phone",
      notes: "Notes",
      save: "Save",
      empty: "No leads yet.",
      error: "Error — please try again.",
      sources: { manual: "Manual", missedCall: "Missed call", webForm: "Web form" },
      stages: { new: "New", contacted: "Contacted", booked: "Booked", lost: "Lost" },
    },
  },
  onboarding: {
    title: "Set up your business",
    subtitle: "A few steps to activate your dashboard.",
    step: "Step",
    next: "Continue",
    error: "Error — please try again.",
    days: {
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun",
    },
    hours: {
      title: "Business hours",
      subtitle: "Used to offer available time slots to customers.",
    },
    services: {
      title: "Your services",
      subtitle: "Add at least one service you offer to customers.",
      name: "Name",
      duration: "Duration (min)",
      price: "Price ($)",
      add: "Add service",
    },
    done: {
      title: "You're all set!",
      subtitle: "Your dashboard is live. Add bookings and leads to get started.",
      cta: "Open dashboard",
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.fr;
}

export const PLAN_PRICES = {
  starter: { monthly: 49, annual: 490 },
  pro: { monthly: 149, annual: 1490 },
  premium: { monthly: 349, annual: 3490 },
} as const;