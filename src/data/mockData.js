export const schemes = [
  {
    id: "PMEGP",
    name: "Prime Minister's Employment Generation Programme",
    short: "PMEGP",
    category: "Enterprise",
    score: 92,
    status: "Best match",
    loan: "Up to ₹50.00 L",
    interest: "6.5% p.a.",
    moratorium: "6 months",
    tenure: "3–7 years",
    description: "Credit-linked support for new micro-enterprises and self-employment.",
    purpose: ["New business", "Micro enterprise", "Self employment"],
    why: ["Income falls within the applicable criteria", "Project cost fits the scheme range", "Business purpose is supported", "An eligible partner is available nearby"],
    documents: ["Aadhaar Card", "Income Certificate", "Business Plan", "Bank Statement"]
  },
  {
    id: "STANDUP",
    name: "Stand Up India Scheme",
    short: "Stand Up India",
    category: "Enterprise",
    score: 78,
    status: "Good match",
    loan: "₹10 L – ₹1 Cr",
    interest: "7.0% p.a.*",
    moratorium: "18 months",
    tenure: "Up to 7 years",
    description: "Facilitates bank loans for greenfield enterprises.",
    purpose: ["New business", "Greenfield enterprise"],
    why: ["Enterprise purpose aligns", "Eligible category is supported", "Loan requirement is within range"],
    documents: ["Aadhaar Card", "PAN", "Business Plan", "Bank Statement"]
  },
  {
    id: "MUDRA",
    name: "Pradhan Mantri MUDRA Yojana",
    short: "MUDRA",
    category: "Micro finance",
    score: 65,
    status: "Possible match",
    loan: "Up to ₹10 L",
    interest: "8.0% p.a.*",
    moratorium: "3 months",
    tenure: "3–5 years",
    description: "Credit support for micro and small income-generating activities.",
    purpose: ["Micro business", "Working capital"],
    why: ["Micro-enterprise purpose aligns", "Loan amount is within limit"],
    documents: ["Aadhaar Card", "PAN", "Bank Statement"]
  }
];

export const partners = [
  { id: 1, name: "State Channelizing Agency", type: "SCA", distance: "4.2 km", lat: 17.4065, lng: 78.4772, status: "Accepting applications", color: "good", schemes: ["PMEGP", "STANDUP", "MUDRA"] },
  { id: 2, name: "SBI — Main Branch", type: "PSB", distance: "6.1 km", lat: 17.3957, lng: 78.4647, status: "Accepting applications", color: "good", schemes: ["PMEGP", "MUDRA"] },
  { id: 3, name: "Grameena Bank", type: "RRB", distance: "8.3 km", lat: 17.3616, lng: 78.4747, status: "Accepting applications", color: "good", schemes: ["PMEGP"] },
  { id: 4, name: "NBFC — Urban", type: "NBFC-MFI", distance: "12.6 km", lat: 17.4440, lng: 78.3762, status: "Limited capacity", color: "warn", schemes: ["MUDRA"] }
];

export const application = {
  id: "PMEGP/AP/2026/45879",
  status: "Partner Review",
  submitted: "12 May 2026",
  verified: "14 May 2026",
  next: "Partner review is currently in progress."
};