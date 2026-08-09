import { env } from "../../config/env";

export interface MessageContext {
  role: "user" | "model" | "assistant" | "system";
  content: string;
}

export class AIService {
  /**
   * Generate AI response using Gemini API (Free Tier), OpenAI API, or intelligent fallback
   */
  static async generateReply(
    userMessage: string,
    systemPrompt?: string,
    history: MessageContext[] = []
  ): Promise<string> {
    const prompt = systemPrompt || env.DEFAULT_SYSTEM_PROMPT;

    // 1. Try Groq API (100% Free Llama 3.3 - Zero Credit Card Required!)
    const groqKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        return await this.generateGroqReply(userMessage, prompt, groqKey, history);
      } catch (err) {
        console.error("⚠️ Groq API Error, attempting fallback:", err);
      }
    }

    // 2. Try Gemini API if GEMINI_API_KEY is available
    const geminiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        return await this.generateGeminiReply(userMessage, prompt, geminiKey, history);
      } catch (err) {
        console.error("⚠️ Gemini API Error, attempting fallback:", err);
      }
    }

    // 3. Try OpenAI API if OPENAI_API_KEY is available
    const openAiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    if (openAiKey) {
      try {
        return await this.generateOpenAIReply(userMessage, prompt, openAiKey, history);
      } catch (err) {
        console.error("⚠️ OpenAI API Error, attempting fallback:", err);
      }
    }

    // 4. Fallback Smart Response if no API key set yet
    return `Hello! 👋 Thank you for contacting Swastiai. I received your message: "${userMessage}".\n\n(To enable real AI generation, please set GROQ_API_KEY, GEMINI_API_KEY or OPENAI_API_KEY in your .env file).`;
  }

  private static async generateGroqReply(
    userMessage: string,
    systemPrompt: string,
    apiKey: string,
    history: MessageContext[] = []
  ): Promise<string> {
    const url = "https://api.groq.com/openai/v1/chat/completions";

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((h) => ({ role: h.role === "model" ? "assistant" : h.role, content: h.content })),
      { role: "user", content: userMessage },
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to call Groq API");
    }

    return data.choices?.[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate a response.";
  }

  private static async generateGeminiReply(
    userMessage: string,
    systemPrompt: string,
    apiKey: string,
    history: MessageContext[] = []
  ): Promise<string> {
    const candidateModels = ["gemini-2.5-computer-use-preview-10-2025", "gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash"];

    const contents = [
      {
        role: "user",
        parts: [{ text: `[System Prompt: ${systemPrompt}]\n\nCustomer Message: ${userMessage}` }],
      },
    ];

    let lastError: Error | null = null;
    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        });

        const data = await response.json();
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text.trim();
        }
        if (data.error?.message) {
          lastError = new Error(`[${model}] ${data.error.message}`);
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    throw lastError || new Error("Failed to call Gemini API");
  }

  private static async generateOpenAIReply(
    userMessage: string,
    systemPrompt: string,
    apiKey: string,
    history: MessageContext[] = []
  ): Promise<string> {
    const url = "https://api.openai.com/v1/chat/completions";

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((h) => ({ role: h.role === "model" ? "assistant" : h.role, content: h.content })),
      { role: "user", content: userMessage },
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to call OpenAI API");
    }

    return data.choices?.[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate a response.";
  }
}
