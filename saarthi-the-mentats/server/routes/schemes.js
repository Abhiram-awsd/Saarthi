import { Router } from "express";
import Scheme from "../models/Scheme.js";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const schemes = await Scheme.find().limit(200);
    res.json(schemes);
  } catch {
    res.status(500).json({ message: "Unable to load schemes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const scheme = await Scheme.findOne({ schemeId: req.params.id });
    if (!scheme) return res.status(404).json({ message: "Scheme not found" });
    res.json(scheme);
  } catch {
    res.status(500).json({ message: "Unable to load scheme" });
  }
});

export default router;