import { OPENROUTER_API_KEY, OPENROUTER_API_URL, DEFAULT_MODEL } from "./openrouter-config";

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterCompletionOptions {
  model?: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface OpenRouterResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface OpenRouterError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

/**
 * Service pour interagir avec l'API OpenRouter
 */
export class OpenRouterService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string = OPENROUTER_API_KEY, apiUrl: string = OPENROUTER_API_URL) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  /**
   * Envoie une requête de complétion à OpenRouter
   */
  async complete(options: OpenRouterCompletionOptions): Promise<OpenRouterResponse> {
    const {
      model = DEFAULT_MODEL,
      messages,
      temperature = 0.7,
      max_tokens = 2000,
      top_p = 1,
      frequency_penalty = 0,
      presence_penalty = 0,
    } = options;

    try {
      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
          "X-Title": "Sandpack AI Assistant",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens,
          top_p,
          frequency_penalty,
          presence_penalty,
        }),
      });

      if (!response.ok) {
        const errorData: OpenRouterError = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data: OpenRouterResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Une erreur inconnue s'est produite lors de l'appel à l'API OpenRouter");
    }
  }

  /**
   * Génère du code avec contexte de l'éditeur
   */
  async generateCode(
    prompt: string,
    currentCode: string,
    language: string,
    model?: string
  ): Promise<string> {
    const systemMessage = `Tu es un assistant IA expert en programmation. Tu aides les développeurs à écrire, améliorer et déboguer du code. 
Tu dois fournir du code de qualité, bien formaté et commenté si nécessaire.
Langage de programmation: ${language}`;

    const userMessage = `Code actuel:
\`\`\`${language}
${currentCode}
\`\`\`

${prompt}`;

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ];

    const response = await this.complete({
      model,
      messages,
      temperature: 0.3, // Plus bas pour du code plus déterministe
      max_tokens: 4000,
    });

    return response.choices[0]?.message?.content || "";
  }

  /**
   * Explique le code
   */
  async explainCode(code: string, language: string, model?: string): Promise<string> {
    const systemMessage = `Tu es un assistant IA expert en programmation. Tu expliques le code de manière claire et pédagogique.`;

    const userMessage = `Explique ce code en français:
\`\`\`${language}
${code}
\`\`\``;

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ];

    const response = await this.complete({
      model,
      messages,
      temperature: 0.5,
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || "";
  }

  /**
   * Débogue le code
   */
  async debugCode(
    code: string,
    error: string,
    language: string,
    model?: string
  ): Promise<string> {
    const systemMessage = `Tu es un assistant IA expert en débogage. Tu aides à identifier et corriger les erreurs dans le code.`;

    const userMessage = `J'ai cette erreur:
${error}

Code:
\`\`\`${language}
${code}
\`\`\`

Peux-tu m'aider à corriger cette erreur?`;

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ];

    const response = await this.complete({
      model,
      messages,
      temperature: 0.3,
      max_tokens: 3000,
    });

    return response.choices[0]?.message?.content || "";
  }

  /**
   * Répond à une question générale
   */
  async askQuestion(question: string, model?: string): Promise<string> {
    const systemMessage = `Tu es un assistant IA expert en programmation. Tu réponds aux questions de manière claire et précise.`;

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemMessage },
      { role: "user", content: question },
    ];

    const response = await this.complete({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || "";
  }
}

// Instance singleton
export const openRouterService = new OpenRouterService();

