import { GENAI_API_KEY } from "../config/env.js";
import { geminiModel } from "../utilis/gemini.js";

export const analyzeLivestock = async (imageUrl, description) => {
  try {
    // Validate inputs
    if (!imageUrl) {
      throw new Error("Image URL is required");
    }

    // Fetch image from URL and convert to base64
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');

    // Determine MIME type from URL or response headers
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    const prompt = description 
      ? `Analyze this livestock image. ${description}. Please provide:
         1. What you can observe in the image
         2. Potential health issues or diseases
         3. Possible causes
         4. Prevention measures
         5. Treatment recommendations`
      : `Analyze this livestock image. Please provide:
         1. What you can observe in the image
         2. Animal type and condition
         3. Any visible health concerns
         4. General care recommendations`;

  const result = await geminiModel.generateContent([
  prompt,              
  {                    
    inlineData: {
      mimeType: contentType,
      data: imageBase64,
    },
  },
]);

    const responseText = await result.response.text();

    return { 
      success: true, 
      data: {
        analysis: responseText,
        imageUrl: imageUrl,
        description: description || "No additional description provided"
      }
    };

  } catch (err) {
    console.error('Livestock analysis error:', err);
    return { 
      success: false, 
      error: err.message || "Failed to analyze livestock image"
    };
  }
};
