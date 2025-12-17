import { GoogleGenAI, Type } from "@google/genai";
import { GeminiFeedback } from "../types";

// Removed global initialization to prevent crash on import
// const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export const validateCodeWithGemini = async (
  taskInstruction: string,
  userCode: string,
  // NEW: We pass the theory so the AI knows strictly what the user knows
  context: {
    moduleTitle: string;
    theoryText: string;
  }
): Promise<GeminiFeedback> => {
  if (!import.meta.env.VITE_API_KEY) {
    console.error("API Key is missing");
    return {
      correct: false,
      message: "Mi conexión está inestable. Revisa tu clave de acceso.",
      tips: ["Verifica el archivo .env"]
    };
  }

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

  try {
    const prompt = `
      You are CodeMaster Cortex, an empathetic coding tutor for beginners.

      CURRENT LEVEL: "${context.moduleTitle}"
      WHAT THE STUDENT JUST LEARNED (THEORY): "${context.theoryText}"
      MISSION TASK: "${taskInstruction}"
      STUDENT CODE: "${userCode}"

      ### GRADING RULES (ABSOLUTE):
      1. **CONTEXT IS LAW:** You must ONLY evaluate based on the provided THEORY and MISSION.
         - If the Theory mentions 'viewport', you check for it.
         - If the Theory DOES NOT mention 'viewport' (or meta tags, or lang attributes), **YOU MUST IGNORE THEM**, even if standard HTML requires them.
         - **Do not act like a linter.** Act like a teacher checking specifically if the student understood *this specific lesson*.

      2. **ALLOW CODE FRAGMENTS (CRITICAL):**
         - The student is allowed to write ONLY the specific tag requested.
         - Example: If the task is "Create an H1", and the code is just "<h1>Hello</h1>" (NO <html>, NO <body>), this is **100% CORRECT**.
         - DO NOT tell the user "You are missing the body tag" unless the Mission specifically asks for "Full Structure".
         - Isolate the specific skill.

      3. **IGNORE CONTENT:** 
         - The student can write ANY text inside the tags. 
         - Example: If task is "Create an <h1>", and code is "<h1>I love tacos</h1>", mark it **CORRECT**.
         - Do not critique spelling, creativity, or text choice.

      4. **FEEDBACK STYLE:**
         - If Wrong: Point out exactly which part of the *Mission* is missing. "Te pedí un h1, pero veo un h2."
         - If Correct: "¡Perfecto! Tal como lo aprendimos." or "¡Bien hecho! Sintaxis correcta."
         - Language: Spanish (Friendly, encourage the user).

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
            message: { type: Type.STRING, description: "Feedback string." },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "1-2 short hints."
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
      message: "Error de comunicación con el núcleo de IA. Intenta de nuevo.",
      tips: ["Verifica tu conexión"]
    };
  }
};

export const generateIntroMessage = async (moduleTitle: string, theoryText: string): Promise<string> => {
  return `Vamos a por el siguiente reto: ${moduleTitle}.`;
}