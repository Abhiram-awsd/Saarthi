import { Router } from "express";
const router = Router();

// Replace this endpoint with the ML team's inference service when ready.
router.post("/", async (req, res) => {
  const profile = req.body;
  res.json({
    profile,
    source: "mock-model",
    recommendations: [
      {
        schemeId: "PMEGP",
        score: 92,
        eligible: true,
        reasons: [
          "Income falls within the applicable criteria",
          "Business purpose is supported",
          "Project cost fits the scheme limit",
          "Beneficiary category is covered"
        ]
      },
      { schemeId: "STANDUP", score: 78, eligible: true, reasons: ["Purpose and category align"] },
      { schemeId: "MUDRA", score: 65, eligible: true, reasons: ["Micro-enterprise purpose aligns"] }
    ]
  });
});

export default router;