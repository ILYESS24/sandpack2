"use client";

import { 
  useSandpack, 
  OpenInCodeSandboxButton,
  RoundedButton,
  RunButton,
  useSandpackNavigation,
  useSandpackShell,
} from "@codesandbox/sandpack-react";
import { useState } from "react";

export const CompleteToolbar = () => {
  const { sandpack } = useSandpack();
  const { refresh } = useSandpackNavigation();
  const { restart } = useSandpackShell();
  const [showExportMenu, setShowExportMenu] = useState(false);

  const exportToGitHub = async () => {
    const files = Object.entries(sandpack.files).map(([path, file]) => ({
      path: path.replace("/", ""),
      content: typeof file === "string" ? file : file.code,
    }));

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
      padding: "8px 12px",
      background: "#f5f5f5",
      borderBottom: "1px solid #e0e0e0",
      alignItems: "center",
      flexWrap: "wrap",
      minHeight: "48px",
    }}>
      {/* Section Actions - Run, Refresh, Restart */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <RunButton />
        
        {sandpack.status === "running" && (
          <RoundedButton onClick={refresh} title="Rafraîchir l'aperçu">
            <span>🔄</span>
          </RoundedButton>
        )}
        
        {sandpack.environment === "node" && (
          <RoundedButton onClick={restart} title="Redémarrer le serveur">
            <span>🔄</span>
          </RoundedButton>
        )}
      </div>

      <div style={{ width: "1px", height: "24px", background: "#ccc", margin: "0 4px" }} />

      {/* Section Export */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center", position: "relative" }}>
        <OpenInCodeSandboxButton />
        
        <button
          onClick={() => setShowExportMenu(!showExportMenu)}
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
          <span>📤</span>
          <span>Export</span>
        </button>

        {showExportMenu && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "4px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            minWidth: "200px",
          }}>
            <button
              onClick={exportToGitHub}
              style={{
                width: "100%",
                padding: "8px 12px",
                textAlign: "left",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "12px",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              🐙 Export to CodeSandbox → GitHub
            </button>
            <button
              onClick={downloadCode}
              style={{
                width: "100%",
                padding: "8px 12px",
                textAlign: "left",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "12px",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              💾 Download Code (JSON)
            </button>
            <button
              onClick={copyCode}
              style={{
                width: "100%",
                padding: "8px 12px",
                textAlign: "left",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "12px",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              📋 Copy All Code
            </button>
          </div>
        )}
      </div>

      <div style={{ width: "1px", height: "24px", background: "#ccc", margin: "0 4px" }} />

      {/* Section Status */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#666" }}>
            Status:
          </span>
          <span style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: sandpack.status === "running" ? "#28a745" : sandpack.status === "idle" ? "#666" : "#ffc107",
          }}>
            {sandpack.status === "running" ? "● Running" : sandpack.status === "idle" ? "○ Idle" : "⏳ " + sandpack.status}
          </span>
        </div>
        
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#666" }}>
            Fichier:
          </span>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#333" }}>
            {sandpack.activeFile}
          </span>
        </div>
      </div>
    </div>
  );
};

