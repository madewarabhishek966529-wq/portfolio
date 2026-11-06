/**
 * Universal Portfolio Master Configuration
 * Single source of truth for Abhishek Madewar's Portfolio.
 * Reference: https://portfolio-abhishek-madewar.vercel.app/
 */

export const siteConfig = {
  referenceWebsite: "https://portfolio-abhishek-madewar.vercel.app/",
  websiteUrl: "https://portfolio-abhishek-madewar.vercel.app/",

  identity: {
    fullName: "Abhishek Madewar",
    displayName: "ABHISHEK MADEWAR",
    initials: "AM",
    profession: "Flutter Developer & AI/ML Engineer",
    roleLine2: "Flutter • React • FastAPI • Gemini Vision • Groq AI",
    location: "Nanded, Maharashtra, India",
    coordinates: "19°09'36.0\"N 77°18'54.0\"E",
    availability: "Open to Opportunities & High-Impact Roles",
    headline: "BUILDING AI-INTEGRATED APPLICATIONS ACROSS MOBILE, WEB & BACKEND",
    intro: "B.Tech CSE graduate building AI-integrated applications across mobile, web, and backend. I turn ideas into deployable products — pairing Flutter and React front ends with FastAPI/Django backends and AI vision APIs like Gemini and Groq.",
    about: "I build AI-powered apps that ship — Flutter, React, FastAPI, and a habit of finishing what I start. Over 3+ years of hands-on engineering, I've delivered 8+ full-stack and mobile applications, including award-recognized solutions for the Google Solution Challenge (addressing UN SDGs 2 and 3 with Gemini Vision and Groq). Currently exploring my next engineering role while shipping production side projects.",
    portrait: "",
    resume: "#resume-modal",
    favicon: "/favicon.svg",
  },

  contact: {
    email: "madewarabhishek966529@gmail.com",
    phone: "+919665297294",
    phoneDisplay: "+91 96652 97294",
    whatsapp: "+919665297294",
    github: "https://github.com/madewarabhishek966529-wq",
    linkedin: "https://www.linkedin.com/",
    // Direct in-page delivery options (100% free, NO external tabs, NO external apps):
    // OPTION 1 (Easiest — 10 seconds): Enter madewarabhishek966529@gmail.com on web3forms.com, get key, paste here
    web3formsKey: "6374b28b-3039-4d41-b2d8-c5ded3d09a4f", // Web3Forms Access Key for madewarabhishek966529@gmail.com

    // OPTION 2: EmailJS (Free 200 emails/mo) from emailjs.com
    emailjs: {
      serviceId: "", // e.g. "service_xxxx" from emailjs.com
      templateId: "", // e.g. "template_xxxx" from emailjs.com
      publicKey: "", // e.g. "user_xxxx" from emailjs.com
    },

    // OPTION 3: Vercel serverless function with Resend API key (set RESEND_API_KEY in Vercel)
    apiEndpoint: "/api/contact",
    otherLinks: [],
  },

  metrics: [
    { label: "Shipped Projects", value: "8+", detail: "Mobile, full-stack & AI-integrated apps" },
    { label: "Years Building", value: "3+", detail: "Cross-platform mobile & backend APIs" },
    { label: "Frameworks & Tools", value: "15+", detail: "Flutter, React, FastAPI, Supabase, Firebase" },
    { label: "Google Challenge", value: "SDGs 2 & 3", detail: "FarmSense AI & CalorieSense AI" },
  ],

  appearance: {
    style: "cinematic minimal, premium, editorial, refined typography",
    theme: "dark",
    background: "#090909",
    backgroundCard: "#121212",
    backgroundElevated: "#181818",
    border: "#242424",
    text: "#f2efeb",
    muted: "#a09c9a",
    accent: "#e32b3c", // Vibrant editorial crimson/red
    accentGlow: "rgba(227, 43, 60, 0.35)",
    displayFont: "'Anton', sans-serif",
    bodyFont: "'Manrope', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
  },

  preferences: {
    showAwards: true,
    showEducation: true,
    showExperience: true,
    showContactForm: true,
    showDownloadResume: true,
  },
};
