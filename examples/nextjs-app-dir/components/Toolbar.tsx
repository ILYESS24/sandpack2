"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";

export const Toolbar = () => {
  const { sandpack } = useSandpack();
  const [showExport, setShowExport] = useState(false);

  const exportToGitHub = async () => {
    // Créer un repository GitHub avec le code
    const files = Object.entries(sandpack.files).map(([path, file]) => ({
      path: path.replace("/", ""),
      content: typeof file === "string" ? file : file.code,
    }));

    const data = {
      files: files.reduce((acc, file) => {
        acc[file.path] = { content: file.content };
        return acc;
      }, {} as Record<string, { content: string }>),
    };

    // Ouvrir CodeSandbox qui peut ensuite être exporté vers GitHub
    const response = await fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    window.open(`https://codesandbox.io/s/${result.sandbox_id}`, "_blank");
  };

  const exportToZip = () => {
    const files = Object.entries(sandpack.files);
    const zipData: Record<string, string> = {};
    
    files.forEach(([path, file]) => {
      const cleanPath = path.replace("/", "");
      zipData[cleanPath] = typeof file === "string" ? file : file.code;
    });

    // Créer un fichier JSON téléchargeable (peut être converti en ZIP côté serveur)
    const blob = new Blob([JSON.stringify(zipData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sandpack-project.json";
    a.click();
    URL.revokeObjectURL(url);
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
        }}
      >
        📦 Export to CodeSandbox
      </button>
      
      <button
        onClick={exportToZip}
        style={{
          padding: "6px 12px",
          background: "#0366d6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        💾 Download Code
      </button>

      <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666" }}>
          {sandpack.status === "running" ? "● Running" : "○ Idle"}
        </span>
      </div>
    </div>
  );
};

