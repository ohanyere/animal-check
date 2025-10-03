import { GoogleGenerativeAI } from "@google/generative-ai";
import { GENAI_API_KEY } from "../config/env.js";

const genAI = new GoogleGenerativeAI(GENAI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
