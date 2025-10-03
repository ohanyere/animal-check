import dotenv from "dotenv";
dotenv.config();

export const GENAI_API_KEY = process.env.GENAI_API_KEY;
export const PORT = process.env.PORT || 8000;
