import { GoogleGenAI, Type } from "@google/genai";
import { GeminiFeedback } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const validateCodeWithGemini = async (
  taskInstruction: string,
  userCode: string,
  context: {
    moduleTitle: string;
    theoryText: string;
  }
): Promise<GeminiFeedback> => {
  if (!process.env.API_KEY) {
    return {
      correct: false,
      message: "Enlace neuronal perdido (API Key ausente).",
      tips: ["Conecta tu llave API"]
    };
  }

  try {
    const prompt = `
      Eres Cortex v2.5, el Tutor Maestro y Arquitecto Jefe de Software. Tu enfoque es la PEDAGOGÍA EXTREMA.
      
      MISIÓN ACTUAL: "${taskInstruction}"
      CONTEXTO TEÓRICO: "${context.theoryText}"
      
      CÓDIGO DEL APRENDIZ:
      \`\`\`html
      ${userCode}
      \`\`\`

      ### PROTOCOLO DE TUTORÍA:
      1. **ANÁLISIS PEDAGÓGICO:** No solo busques errores, busca comprensión. Si el aprendiz olvidó cerrar una etiqueta, explícale que HTML funciona como una "caja": si no la cierras, el contenido se desparrama.
      2. **SIMPLICIDAD PARA PRINCIPIANTES:** Estamos enseñando desde cero. No exijas atributos avanzados a menos que la misión lo pida.
      3. **CONEXIÓN WEB:** Explica brevemente cómo este elemento específico ayuda al usuario final o al SEO.
      4. **TONO:** Sé un mentor motivador, sabio y preciso. Usa metáforas de construcción (cimientos, vigas, ventanas).
      5. **VERIFICACIÓN ESTRUCTURAL:** Revisa que el elemento esté dentro de la etiqueta correcta (ej: inputs dentro de forms, metas dentro de head).

      RESPONDE ESTRICTAMENTE EN JSON:
      {
        "correct": boolean,
        "message": "Feedback magistral explicando el qué, por qué y cómo mejorar",
        "tips": ["Consejo pedagógico 1", "Consejo de buena práctica 2"]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correct: { type: Type.BOOLEAN },
            message: { type: Type.STRING },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["correct", "message", "tips"]
        }
      }
    });

    return JSON.parse(response.text) as GeminiFeedback;
  } catch (error) {
    return {
      correct: false,
      message: "Fallo en el escáner de arquitectura. Intenta re-sincronizar.",
      tips: ["Reintenta la validación"]
    };
  }
};