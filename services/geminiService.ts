import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateForgeWisdom = async (taskName: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "불꽃이 조용히 타오릅니다. (API Key missing)";

  try {
    const prompt = `
      You are the Oracle of the Self-Forge. A user (an "M-type" personality: Idealist, prone to anxiety and perfectionism) 
      has just successfully completed 10 minutes of a task they were dreading: "${taskName}".
      
      Generate a short, profound, cryptic but encouraging sentence in Korean (max 20 words). 
      Metaphors should involve fire, metal, forging, light, shadows, or gold.
      Do not be overly cheerful. Be stoic and grand.
      
      Example style: "두려움은 불꽃 속에서 사라지고, 오직 당신의 의지만이 금속처럼 남았습니다."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating wisdom:", error);
    return "불꽃이 당신의 승리를 속삭입니다.";
  }
};