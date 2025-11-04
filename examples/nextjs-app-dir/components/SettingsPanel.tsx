"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";

export const SettingsPanel = () => {
  const { sandpack } = useSandpack();
  const [autoReload, setAutoReload] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showInlineErrors, setShowInlineErrors] = useState(true);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "#1e1e1e",
      color: "#cccccc",
    }}>
      {/* Header */}
      <div style={{
        padding: "12px",
        borderBottom: "1px solid #3e3e42",
        fontSize: "13px",
        fontWeight: "bold",
      }}>
        ⚙️ Paramètres
      </div>

      {/* Settings Content */}
      <div style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "13px", marginBottom: "12px", color: "#ffffff" }}>
            Éditeur
          </h3>
          
          <label style={{ display: "flex", alignItems: "center", marginBottom: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={showLineNumbers}
              onChange={(e) => setShowLineNumbers(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            <span style={{ fontSize: "12px" }}>Afficher les numéros de ligne</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", marginBottom: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={showInlineErrors}
              onChange={(e) => setShowInlineErrors(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            <span style={{ fontSize: "12px" }}>Afficher les erreurs inline</span>
          </label>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "13px", marginBottom: "12px", color: "#ffffff" }}>
            Exécution
          </h3>
          
          <label style={{ display: "flex", alignItems: "center", marginBottom: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={autoReload}
              onChange={(e) => setAutoReload(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            <span style={{ fontSize: "12px" }}>Rechargement automatique</span>
          </label>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "13px", marginBottom: "12px", color: "#ffffff" }}>
            Informations
          </h3>
          
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            Statut: <span style={{ color: sandpack.status === "running" ? "#4ec9b0" : "#888" }}>
              {sandpack.status}
            </span>
          </div>
          
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            Environnement: <span style={{ color: "#4ec9b0" }}>
              {sandpack.environment || "browser"}
            </span>
          </div>
          
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            Fichier actif: <span style={{ color: "#4ec9b0" }}>
              {sandpack.activeFile || "aucun"}
            </span>
          </div>
          
          <div style={{ fontSize: "11px", color: "#888" }}>
            Fichiers ouverts: <span style={{ color: "#4ec9b0" }}>
              {sandpack.visibleFiles?.length || 0}
            </span>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "13px", marginBottom: "12px", color: "#ffffff" }}>
            Raccourcis clavier
          </h3>
          
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            <kbd style={{ padding: "2px 6px", background: "#3c3c3c", borderRadius: "3px" }}>Ctrl/Cmd</kbd> + <kbd style={{ padding: "2px 6px", background: "#3c3c3c", borderRadius: "3px" }}>F</kbd> : Rechercher
          </div>
          
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            <kbd style={{ padding: "2px 6px", background: "#3c3c3c", borderRadius: "3px" }}>Ctrl/Cmd</kbd> + <kbd style={{ padding: "2px 6px", background: "#3c3c3c", borderRadius: "3px" }}>H</kbd> : Remplacer
          </div>
          
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            <kbd style={{ padding: "2px 6px", background: "#3c3c3c", borderRadius: "3px" }}>Ctrl/Cmd</kbd> + <kbd style={{ padding: "2px 6px", background: "#3c3c3c", borderRadius: "3px" }}>S</kbd> : Sauvegarder
          </div>
        </div>
      </div>
    </div>
  );
};

