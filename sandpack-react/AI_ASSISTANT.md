# Assistant IA OpenRouter pour Sandpack

## Configuration

L'assistant IA est automatiquement intégré dans tous les composants Sandpack. Il utilise OpenRouter pour accéder à plus de 400 modèles d'IA.

### Clé API

La clé API OpenRouter est configurée dans `src/utils/openrouter-config.ts` :

```typescript
export const OPENROUTER_API_KEY = "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";
```

## Modèles disponibles

L'assistant IA supporte tous les modèles OpenRouter, organisés par catégorie :

### OpenAI
- GPT-4o
- GPT-4o Mini
- GPT-4 Turbo
- GPT-4
- GPT-3.5 Turbo
- O1 Preview
- O1 Mini

### Anthropic Claude
- Claude 3.5 Sonnet
- Claude 3 Opus
- Claude 3 Sonnet
- Claude 3 Haiku
- Claude 2.1
- Claude 2.0
- Claude Instant 1.2

### Google
- Gemini Pro 1.5
- Gemini Pro
- Gemini Flash 1.5
- PaLM 2 Chat Bison

### Meta
- Llama 3.1 405B Instruct
- Llama 3.1 70B Instruct
- Llama 3.1 8B Instruct
- Llama 3 70B Instruct
- Llama 3 8B Instruct
- Llama 2 70B Chat
- Llama 2 13B Chat
- Llama 2 7B Chat

### Mistral AI
- Mistral Large
- Mixtral 8x7B Instruct
- Mistral Medium
- Mistral Small
- Mistral Tiny

### Cohere
- Command R+
- Command R
- Command
- Command Light

### Perplexity
- Sonar Large 128k Online
- Sonar Small 128k Online
- Sonar Large 128k Chat
- Sonar Small 128k Chat

### Autres
- Grok Beta (xAI)
- Yi 34B Chat (01.ai)
- Qwen 2.5 72B Instruct
- DeepSeek Chat
- DeepSeek Coder
- Et bien d'autres...

## Utilisation

L'assistant IA apparaît automatiquement comme un bouton flottant en bas à droite de l'éditeur Sandpack. Cliquez sur le bouton 🤖 pour ouvrir le panneau de chat.

### Fonctionnalités

1. **Chat interactif** : Posez des questions à l'IA sur votre code
2. **Actions rapides** :
   - **Expliquer** : Explique le code actuel
   - **Améliorer** : Améliore le code avec des commentaires et optimisations
   - **Déboguer** : Vérifie et corrige les erreurs potentielles
3. **Sélection de modèle** : Choisissez parmi tous les modèles OpenRouter disponibles
4. **Contexte intelligent** : L'IA a accès au code actuel et au langage de programmation

### Exemple d'utilisation

```tsx
import { Sandpack } from "@codesandbox/sandpack-react";

function App() {
  return (
    <Sandpack
      template="react"
      files={{
        "/App.js": {
          code: `export default function App() {
  return <h1>Hello World</h1>;
}`,
        },
      }}
    />
  );
}
```

L'assistant IA sera automatiquement disponible dans cet éditeur.

## API du service

Le service OpenRouter est disponible via `openRouterService` :

```typescript
import { openRouterService } from "@codesandbox/sandpack-react/utils/openrouter-service";

// Générer du code
const code = await openRouterService.generateCode(
  "Crée une fonction pour calculer la factorielle",
  "",
  "javascript",
  "openai/gpt-4o"
);

// Expliquer du code
const explanation = await openRouterService.explainCode(
  code,
  "javascript",
  "anthropic/claude-3.5-sonnet"
);

// Déboguer
const fixedCode = await openRouterService.debugCode(
  code,
  "Erreur: undefined",
  "javascript"
);

// Poser une question
const answer = await openRouterService.askQuestion(
  "Comment optimiser cette fonction ?"
);
```

## Personnalisation

Pour changer la clé API ou ajouter des modèles, modifiez `src/utils/openrouter-config.ts`.

## Notes de sécurité

⚠️ **Important** : La clé API est actuellement stockée dans le code source. Pour un usage en production, il est recommandé de :

1. Utiliser des variables d'environnement
2. Créer un proxy backend pour masquer la clé API
3. Implémenter une authentification utilisateur

## Support

Pour plus d'informations sur OpenRouter, visitez : https://openrouter.ai/docs

