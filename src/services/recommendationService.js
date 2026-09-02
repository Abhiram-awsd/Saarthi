import { schemes } from "../data/mockData";

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function getRecommendations(profile) {
  // ML integration point. Once the real model API is ready, this call
  // can return the same contract without changing the UI.
  if (API_BASE) {
    try {
      const response = await fetch(`${API_BASE}/api/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      if (response.ok) return response.json();
    } catch {
      // fall through to demo model
    }
  }

  const scored = schemes.map(scheme => {
    let score = 55;
    if (profile.category === "SC") score += 12;
    if (profile.purpose === "business" && scheme.id !== "MUDRA") score += 12;
    if (Number(profile.projectCost) >= 1000000 && scheme.id === "PMEGP") score += 10;
    if (Number(profile.loanRequired) <= 1000000 && scheme.id === "MUDRA") score += 8;
    return { schemeId: scheme.id, score: Math.min(score, 97), eligible: true, reasons: scheme.why };
  }).sort((a,b) => b.score - a.score);

  return { source: "demo-model", recommendations: scored };
}