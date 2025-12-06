"use client";

import { SandpackConsole, useSandpackConsole } from "@codesandbox/sandpack-react";
import { useState, useMemo } from "react";

export const EnhancedConsole = () => {
  const { logs } = useSandpackConsole({
    resetOnPreviewRestart: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("all");

  // Note: La console Sandpack affiche déjà les logs, on ajoute juste la recherche
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{
        padding: "8px",
        background: "#f5f5f5",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}>
        <input
          type="text"
          placeholder="🔍 Rechercher dans la console..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "4px 8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          style={{
            padding: "4px 8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          <option value="all">Tous les niveaux</option>
          <option value="log">Log</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
          <option value="info">Info</option>
        </select>
        <span style={{ fontSize: "12px", color: "#666" }}>
          {logs.length} logs
        </span>
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        <SandpackConsole resetOnPreviewRestart={false} />
      </div>
    </div>
  );
};

