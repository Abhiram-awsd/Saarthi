import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema({
  schemeId: { type: String, unique: true, required: true },
  name: String,
  purpose: [String],
  categories: [String],
  maxFamilyIncome: Number,
  minAge: Number,
  maxLoan: Number,
  interestRate: String,
  moratorium: String,
  tenure: String,
  businessTypes: [String],
  documents: [String],
  states: [String],
  partners: [String],
  source: String,
  lastVerified: Date
}, { timestamps: true });

export default mongoose.model("Scheme", SchemeSchema);