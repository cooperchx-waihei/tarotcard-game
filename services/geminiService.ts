
import { GoogleGenAI, Type } from "@google/genai";
import { CardReading, ReadingResponse } from "../types";

export const getTarotInterpretation = async (readings: CardReading[]): Promise<ReadingResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const cardData = readings.map(r => ({
    position: r.position,
    name: r.card.name,
    orientation: r.isReversed ? 'Reversed (逆位)' : 'Upright (正位)',
    meaning: r.isReversed ? r.card.meaning_rev : r.card.meaning_up
  }));

  const prompt = `You are a professional mystic tarot reader. Interpret this three-card spread:
  ${JSON.stringify(cardData, null, 2)}
  
  Provide a cohesive reading in Chinese (Simplified). Use a mystical yet supportive tone.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { 
            type: Type.STRING, 
            description: "A brief overall summary of the reading energy." 
          },
          interpretations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                position: { type: Type.STRING },
                meaning: { type: Type.STRING, description: "Detailed interpretation for this specific card in context." }
              },
              required: ["position", "meaning"]
            }
          },
          guidance: { 
            type: Type.STRING, 
            description: "Final actionable advice or a mystical thought for the querent." 
          }
        },
        required: ["summary", "interpretations", "guidance"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  
  try {
    return JSON.parse(text) as ReadingResponse;
  } catch (err) {
    console.error("JSON Parse Error:", err, text);
    throw new Error("Failed to interpret reading result.");
  }
};
