import { GoogleGenAI, Type } from "@google/genai";
import { GeminiFeedback } from "../types";

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const validateCodeWithGemini = async (
  taskInstruction: string,
  userCode: string
): Promise<GeminiFeedback> => {
  if (!API_KEY) {
    console.error("API Key is missing");
    return {
      correct: false,
      message: "Mi conexión está inestable. Revisa tu clave de acceso.",
      tips: ["Verifica el archivo .env"]
    };
  }

  try {
    const prompt = `
      You are CodeMaster Cortex, an elite senior engineer mentoring a junior. 
      Tone: Natural, confident, slightly witty, Encouraging but precise. NOT ROBOTIC.
      
      Task: "${taskInstruction}"
      Code: "${userCode}"

      CRITICAL VALIDATION RULES:
      1. **STRUCTURE FIRST:** Focus 99% on valid HTML syntax (opening/closing tags, correct nesting, correct tag name).
      2. **MOBILE FIRST MINDSET:** If the task involves structure, the <meta name="viewport"> tag is MANDATORY. If the task involves inputs, check if they used specific types (email/tel) over simple 'text' if requested.
      3. **IGNORE TEXT CONTENT:** If the task asks for an <h1> about "Philosophy" and the user writes <h1>Hello World</h1>, MARK IT CORRECT. The specific text inside tags DOES NOT MATTER.
      4. **STRICT ON CLOSING:** If a tag requires closing (like </h1>, </p>) and it's missing or malformed, mark it WRONG.
      5. **STRICT ON ATTRIBUTES:** If an attribute is required (like 'src' in img or 'href' in a), it must exist, but the value doesn't need to be exact unless it breaks the logic.

      Message Guidelines:
      - If Correct: "¡Estructura sólida! Funciona perfecto en móvil y escritorio.", "Sintaxis impecable."
      - If Wrong: "Te falta cerrar la etiqueta.", "Olvidaste el viewport para móvil.", "Esa no es la etiqueta que pedí.", "Cuidado con la anidación."
      - Language: Spanish (Neutral/European).

      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correct: { type: Type.BOOLEAN },
            message: { type: Type.STRING, description: "Natural spoken feedback." },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "1-2 direct fixes focusing on syntax."
            }
          },
          required: ["correct", "message", "tips"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response from AI");

    const result = JSON.parse(jsonText) as GeminiFeedback;
    return result;

  } catch (error) {
    console.error("Gemini Validation Error:", error);
    return {
      correct: false,
      message: "Hubo un error de red. Intenta enviarlo de nuevo.",
      tips: ["Intenta pulsar el botón otra vez."]
    };
  }
};

export const generateIntroMessage = async (moduleTitle: string, theoryText: string): Promise<string> => {
    return `Vamos a por el siguiente reto: ${moduleTitle}.`;
}
