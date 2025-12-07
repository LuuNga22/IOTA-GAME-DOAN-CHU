import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAnimalFunFact = async (animal: string): Promise<string> => {
  if (!apiKey) return "Cần cấu hình API KEY để xem sự thật thú vị.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Hãy cho tôi một sự thật thú vị ngắn gọn (dưới 30 từ) bằng tiếng Việt về loài vật này: ${animal}. Đừng dùng định dạng markdown, chỉ văn bản thô.`,
    });
    return response.text || "Không thể tải thông tin.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hệ thống AI đang bận.";
  }
};