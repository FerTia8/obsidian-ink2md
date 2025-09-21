import { GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { getMimeType } from "./utils";

export class HTR {
  async useGemini(base64Img : string, apiKey : string) : Promise<string> {
    const instructions = `
You are an OCR assistant. 
Transcribe the handwritten text from this image into clear, accurate Markdown. 
- Correct obvious spelling mistakes.
- Preserve the original meaning and formatting (line breaks, paragraphs).
- Do NOT invent new content beyond what is written.
- Return only, and nothing else, the cleaned text as correctly formatted Markdown.
    ` 

    const ai = new GoogleGenAI({apiKey: apiKey});

    const contents = [
      {
        inlineData: {
          mimeType: getMimeType(base64Img),
          data: base64Img,
        },
      },
      { text: instructions },
    ];

    const response : GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    return response.text || "ERROR!";
  }
}