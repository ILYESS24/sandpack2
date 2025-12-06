import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useSandpack } from "../../hooks/useSandpack";
import { useActiveCode } from "../../hooks/useActiveCode";
import { css } from "../../styles";
import { openRouterService, type OpenRouterMessage } from "../../utils/openrouter-service";
import { ALL_MODELS, DEFAULT_MODEL } from "../../utils/openrouter-config";

const aiAssistantContainer = css({
  position: "fixed",
  bottom: "$space$4",
  right: "$space$4",
  zIndex: 1000,
  fontFamily: "$font$body",
});

const aiButton = css({
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "$colors$clickable",
  color: "$colors$base",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "$colors$hover",
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
});

const aiPanel = css({
  position: "absolute",
  bottom: "70px",
  right: "0",
  width: "400px",
  maxHeight: "600px",
  backgroundColor: "$colors$surface1",
  border: "1px solid $colors$surface2",
  borderRadius: "8px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const aiHeader = css({
  padding: "$space$3",
  borderBottom: "1px solid $colors$surface2",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "$colors$surface2",
});

const aiTitle = css({
  fontSize: "$font$size$base",
  fontWeight: "600",
  color: "$colors$base",
  margin: 0,
});

const aiCloseButton = css({
  background: "none",
  border: "none",
  color: "$colors$base",
  cursor: "pointer",
  fontSize: "20px",
  padding: "0",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    opacity: 0.7,
  },
});

const aiModelSelect = css({
  padding: "$space$2",
  fontSize: "$font$size$sm",
  borderRadius: "4px",
  border: "1px solid $colors$surface3",
  backgroundColor: "$colors$surface1",
  color: "$colors$base",
  marginLeft: "$space$2",
  cursor: "pointer",
  "&:focus": {
    outline: "2px solid $colors$clickable",
    outlineOffset: "2px",
  },
});

const aiMessages = css({
  flex: 1,
  overflowY: "auto",
  padding: "$space$3",
  display: "flex",
  flexDirection: "column",
  gap: "$space$3",
});

const aiMessage = css({
  padding: "$space$2 $space$3",
  borderRadius: "8px",
  fontSize: "$font$size$sm",
  lineHeight: "1.5",
  maxWidth: "85%",
  wordWrap: "break-word",
});

const aiMessageUser = css({
  backgroundColor: "$colors$clickable",
  color: "$colors$base",
  alignSelf: "flex-end",
});

const aiMessageAssistant = css({
  backgroundColor: "$colors$surface2",
  color: "$colors$base",
  alignSelf: "flex-start",
});

const aiInputContainer = css({
  padding: "$space$3",
  borderTop: "1px solid $colors$surface2",
  display: "flex",
  gap: "$space$2",
  backgroundColor: "$colors$surface1",
});

const aiInput = css({
  flex: 1,
  padding: "$space$2",
  fontSize: "$font$size$sm",
  borderRadius: "4px",
  border: "1px solid $colors$surface3",
  backgroundColor: "$colors$surface1",
  color: "$colors$base",
  "&:focus": {
    outline: "2px solid $colors$clickable",
    outlineOffset: "2px",
  },
});

const aiSendButton = css({
  padding: "$space$2 $space$4",
  fontSize: "$font$size$sm",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "$colors$clickable",
  color: "$colors$base",
  cursor: "pointer",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "$colors$hover",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const aiLoading = css({
  padding: "$space$2 $space$3",
  fontSize: "$font$size$sm",
  color: "$colors$base",
  fontStyle: "italic",
});

const aiQuickActions = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "$space$2",
  padding: "$space$2",
  borderBottom: "1px solid $colors$surface2",
  backgroundColor: "$colors$surface1",
});

const aiQuickButton = css({
  padding: "$space$1 $space$2",
  fontSize: "$font$size$xs",
  borderRadius: "4px",
  border: "1px solid $colors$surface3",
  backgroundColor: "$colors$surface2",
  color: "$colors$base",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "$colors$surface3",
  },
});

interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sandpack } = useSandpack();
  const { code } = useActiveCode();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLanguage = () => {
    const activeFile = sandpack.activeFile;
    const extension = activeFile.split(".").pop()?.toLowerCase() || "";
    const languageMap: Record<string, string> = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      cs: "csharp",
      php: "php",
      rb: "ruby",
      go: "go",
      rs: "rust",
      swift: "swift",
      kt: "kotlin",
      html: "html",
      css: "css",
      scss: "scss",
      json: "json",
      xml: "xml",
      yml: "yaml",
      yaml: "yaml",
    };
    return languageMap[extension] || "text";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await openRouterService.askQuestion(userMessage, selectedModel);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Erreur: ${errorMessage}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    const language = getLanguage();
    setIsLoading(true);

    try {
      let response: string;
      switch (action) {
        case "explain":
          response = await openRouterService.explainCode(code, language, selectedModel);
          break;
        case "improve":
          response = await openRouterService.generateCode(
            "Améliore ce code en ajoutant des commentaires, en optimisant les performances et en suivant les meilleures pratiques.",
            code,
            language,
            selectedModel
          );
          break;
        case "debug":
          response = await openRouterService.generateCode(
            "Vérifie ce code pour d'éventuelles erreurs et propose des corrections.",
            code,
            language,
            selectedModel
          );
          break;
        default:
          response = "";
      }

      if (response) {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: `Action: ${action}` },
          { role: "assistant", content: response },
        ]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Erreur: ${errorMessage}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={aiAssistantContainer.toString()}>
      {isOpen && (
        <div className={aiPanel.toString()}>
          <div className={aiHeader.toString()}>
            <h3 className={aiTitle.toString()}>Assistant IA</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <select
                className={aiModelSelect.toString()}
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                {ALL_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.provider})
                  </option>
                ))}
              </select>
              <button
                className={aiCloseButton.toString()}
                onClick={() => setIsOpen(false)}
                aria-label="Fermer"
              >
                ×
              </button>
            </div>
          </div>

          <div className={aiQuickActions.toString()}>
            <button
              className={aiQuickButton.toString()}
              onClick={() => handleQuickAction("explain")}
              disabled={isLoading}
            >
              Expliquer
            </button>
            <button
              className={aiQuickButton.toString()}
              onClick={() => handleQuickAction("improve")}
              disabled={isLoading}
            >
              Améliorer
            </button>
            <button
              className={aiQuickButton.toString()}
              onClick={() => handleQuickAction("debug")}
              disabled={isLoading}
            >
              Déboguer
            </button>
          </div>

          <div className={aiMessages.toString()}>
            {messages.length === 0 && (
              <div style={{ color: "var(--sp-colors-base)", textAlign: "center", padding: "20px" }}>
                Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider avec votre code ?
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${aiMessage.toString()} ${
                  message.role === "user" ? aiMessageUser.toString() : aiMessageAssistant.toString()
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className={aiLoading.toString()}>L'IA réfléchit...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={aiInputContainer.toString()}>
            <input
              className={aiInput.toString()}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              disabled={isLoading}
            />
            <button
              className={aiSendButton.toString()}
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}

      <button
        className={aiButton.toString()}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir l'assistant IA"
        title="Assistant IA"
      >
        🤖
      </button>
    </div>
  );
};

