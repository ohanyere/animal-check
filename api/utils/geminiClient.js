// /api/utils/geminiClient.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Vercel environment variable
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // or adjust as needed
});
