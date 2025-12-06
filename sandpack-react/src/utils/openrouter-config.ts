/**
 * Configuration OpenRouter
 * Clé API pour accéder aux modèles d'IA via OpenRouter
 */
export const OPENROUTER_API_KEY =
  "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";

export const OPENROUTER_API_URL = "https://openrouter.ai/api/v1";

/**
 * Liste complète des modèles OpenRouter disponibles
 * Organisés par catégorie pour faciliter la sélection
 */
export const OPENROUTER_MODELS = {
  // OpenAI Models
  openai: [
    { id: "openai/gpt-4o", name: "GPT-4o", provider: "OpenAI" },
    { id: "openai/gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
    { id: "openai/gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI" },
    { id: "openai/gpt-4", name: "GPT-4", provider: "OpenAI" },
    { id: "openai/gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
    { id: "openai/o1-preview", name: "O1 Preview", provider: "OpenAI" },
    { id: "openai/o1-mini", name: "O1 Mini", provider: "OpenAI" },
  ],

  // Anthropic Claude Models
  anthropic: [
    { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
    { id: "anthropic/claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
    { id: "anthropic/claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic" },
    { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic" },
    { id: "anthropic/claude-2.1", name: "Claude 2.1", provider: "Anthropic" },
    { id: "anthropic/claude-2.0", name: "Claude 2.0", provider: "Anthropic" },
    { id: "anthropic/claude-instant-1.2", name: "Claude Instant 1.2", provider: "Anthropic" },
  ],

  // Google Models
  google: [
    { id: "google/gemini-pro-1.5", name: "Gemini Pro 1.5", provider: "Google" },
    { id: "google/gemini-pro", name: "Gemini Pro", provider: "Google" },
    { id: "google/gemini-flash-1.5", name: "Gemini Flash 1.5", provider: "Google" },
    { id: "google/palm-2-chat-bison", name: "PaLM 2 Chat Bison", provider: "Google" },
  ],

  // Meta Models
  meta: [
    { id: "meta-llama/llama-3.1-405b-instruct", name: "Llama 3.1 405B Instruct", provider: "Meta" },
    { id: "meta-llama/llama-3.1-70b-instruct", name: "Llama 3.1 70B Instruct", provider: "Meta" },
    { id: "meta-llama/llama-3.1-8b-instruct", name: "Llama 3.1 8B Instruct", provider: "Meta" },
    { id: "meta-llama/llama-3-70b-instruct", name: "Llama 3 70B Instruct", provider: "Meta" },
    { id: "meta-llama/llama-3-8b-instruct", name: "Llama 3 8B Instruct", provider: "Meta" },
    { id: "meta-llama/llama-2-70b-chat", name: "Llama 2 70B Chat", provider: "Meta" },
    { id: "meta-llama/llama-2-13b-chat", name: "Llama 2 13B Chat", provider: "Meta" },
    { id: "meta-llama/llama-2-7b-chat", name: "Llama 2 7B Chat", provider: "Meta" },
  ],

  // Mistral AI Models
  mistral: [
    { id: "mistralai/mistral-large", name: "Mistral Large", provider: "Mistral AI" },
    { id: "mistralai/mixtral-8x7b-instruct", name: "Mixtral 8x7B Instruct", provider: "Mistral AI" },
    { id: "mistralai/mistral-medium", name: "Mistral Medium", provider: "Mistral AI" },
    { id: "mistralai/mistral-small", name: "Mistral Small", provider: "Mistral AI" },
    { id: "mistralai/mistral-tiny", name: "Mistral Tiny", provider: "Mistral AI" },
  ],

  // Cohere Models
  cohere: [
    { id: "cohere/command-r-plus", name: "Command R+", provider: "Cohere" },
    { id: "cohere/command-r", name: "Command R", provider: "Cohere" },
    { id: "cohere/command", name: "Command", provider: "Cohere" },
    { id: "cohere/command-light", name: "Command Light", provider: "Cohere" },
  ],

  // Perplexity Models
  perplexity: [
    { id: "perplexity/llama-3.1-sonar-large-128k-online", name: "Sonar Large 128k Online", provider: "Perplexity" },
    { id: "perplexity/llama-3.1-sonar-small-128k-online", name: "Sonar Small 128k Online", provider: "Perplexity" },
    { id: "perplexity/llama-3.1-sonar-large-128k-chat", name: "Sonar Large 128k Chat", provider: "Perplexity" },
    { id: "perplexity/llama-3.1-sonar-small-128k-chat", name: "Sonar Small 128k Chat", provider: "Perplexity" },
  ],

  // Other Models
  other: [
    { id: "x-ai/grok-beta", name: "Grok Beta", provider: "xAI" },
    { id: "01-ai/yi-34b-chat", name: "Yi 34B Chat", provider: "01.ai" },
    { id: "qwen/qwen-2.5-72b-instruct", name: "Qwen 2.5 72B Instruct", provider: "Qwen" },
    { id: "deepseek/deepseek-chat", name: "DeepSeek Chat", provider: "DeepSeek" },
    { id: "deepseek/deepseek-coder", name: "DeepSeek Coder", provider: "DeepSeek" },
    { id: "togethercomputer/alpaca-7b", name: "Alpaca 7B", provider: "Together" },
    { id: "microsoft/wizardlm-2-8x22b", name: "WizardLM 2 8x22B", provider: "Microsoft" },
    { id: "anthropic/claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
  ],
};

/**
 * Liste plate de tous les modèles pour faciliter la recherche
 */
export const ALL_MODELS = [
  ...OPENROUTER_MODELS.openai,
  ...OPENROUTER_MODELS.anthropic,
  ...OPENROUTER_MODELS.google,
  ...OPENROUTER_MODELS.meta,
  ...OPENROUTER_MODELS.mistral,
  ...OPENROUTER_MODELS.cohere,
  ...OPENROUTER_MODELS.perplexity,
  ...OPENROUTER_MODELS.other,
];

/**
 * Modèle par défaut
 */
export const DEFAULT_MODEL = "openai/gpt-4o-mini";

