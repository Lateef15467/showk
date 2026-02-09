
import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem } from "../types";

// Always use the API key directly from process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPersonalizedRecommendation = async (
  userPreferences: string,
  menuItems: MenuItem[]
) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Head Chef at Showk-View. Based on the user preferences: "${userPreferences}", recommend the best dish from this menu: ${JSON.stringify(menuItems)}. 
      Explain why it fits their mood. Return your response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedItemId: { type: Type.STRING },
            chefNote: { type: Type.STRING },
            pairingSuggestion: { type: Type.STRING }
          },
          required: ["recommendedItemId", "chefNote", "pairingSuggestion"]
        }
      }
    });

    // Use .text property directly, handle possible undefined
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return null;
  }
};
