"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { OpenInCodeSandboxButton } from "@codesandbox/sandpack-react";

export const ExportButtons = () => {
  const { sandpack } = useSandpack();

  const exportToGitHub = async () => {
    const files = Object.entries(sandpack.files).map(([path, file]) => ({
      path: path.replace("/", ""),
      content: typeof file === "string" ? file : file.code,
    }));

    // Créer un gist GitHub
    const gistData = {
      description: "Exported from Sandpack",
      public: true,
      files: files.reduce((acc, file) => {
        acc[file.path] = { content: file.content };
        return acc;
      }, {} as Record<string, { content: string }>),
    };

    // Pour GitHub, on doit passer par CodeSandbox d'abord
    // ou créer un gist directement via l'API GitHub
    const response = await fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
      method: "POST",
      body: JSON.stringify({
        files: files.reduce((acc, file) => {
          acc[file.path] = { content: file.content };
          return acc;
        }, {} as Record<string, { content: string }>),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    window.open(`https://codesandbox.io/s/${result.sandbox_id}`, "_blank");
  };

  const downloadCode = () => {
    const files = Object.entries(sandpack.files);
    const zipData: Record<string, string> = {};
    
    files.forEach(([path, file]) => {
      const cleanPath = path.replace("/", "");
      zipData[cleanPath] = typeof file === "string" ? file : file.code;
    });

    const blob = new Blob([JSON.stringify(zipData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sandpack-project.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCode = async () => {
    const files = Object.entries(sandpack.files);
    const code = files.map(([path, file]) => {
      return `// ${path}\n${typeof file === "string" ? file : file.code}`;
    }).join("\n\n");
    
    await navigator.clipboard.writeText(code);
    alert("Code copié dans le presse-papiers !");
  };

  return (
    <div style={{
      display: "flex",
      gap: "8px",
      padding: "8px",
      background: "#f5f5f5",
      borderBottom: "1px solid #e0e0e0",
      alignItems: "center",
      flexWrap: "wrap",
    }}>
      <OpenInCodeSandboxButton />
      
      <button
        onClick={exportToGitHub}
        style={{
          padding: "6px 12px",
          background: "#24292e",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span>🐙</span>
        <span>Export to CodeSandbox → GitHub</span>
      </button>
      
      <button
        onClick={downloadCode}
        style={{
          padding: "6px 12px",
          background: "#0366d6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span>💾</span>
        <span>Download Code</span>
      </button>

      <button
        onClick={copyCode}
        style={{
          padding: "6px 12px",
          background: "#6f42c1",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span>📋</span>
        <span>Copy Code</span>
      </button>

      <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666" }}>
          {sandpack.status === "running" ? "● Running" : sandpack.status === "idle" ? "○ Idle" : "⏳ " + sandpack.status}
        </span>
      </div>
    </div>
  );
};

