import { GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { getMimeType } from "./utils";

export class HTR {
  async useGemini(base64Img : string, apiKey : string) : Promise<string> {
    const ai = new GoogleGenAI({apiKey: apiKey});

    const contents = [
      {
        inlineData: {
          mimeType: getMimeType(base64Img),
          data: base64Img,
        },
      },
      { text: this.llmPrompt },
    ];

    const response : GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    return response.text || "ERROR!";
  }


  llmPrompt = `
You are an OCR assistant. 
Transcribe the handwritten text from this image into clear, accurate Markdown. 
- Correct obvious spelling mistakes.
- Preserve the original structure you see, including line breaks, paragraphs, bullet points, lists, headings, etc.
- Do NOT invent new content beyond what is written.
- Do NOT include any labels like "Transcription:" or metadata.
- Return only the cleaned text, as properly formatted Markdown, and nothing else.
    ` 
}