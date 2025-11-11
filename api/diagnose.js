// /api/diagnose.js
import { analyzeLivestock } from "./utils/diagnoseImage.js";
import { formatError } from "./utils/errorHandler.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl, description } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const result = await analyzeLivestock(imageUrl, description);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Diagnosis failed:", err);
    return res.status(500).json(formatError(err));
  }
}
