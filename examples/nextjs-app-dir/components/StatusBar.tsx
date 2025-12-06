"use client";

import { useSandpack } from "@codesandbox/sandpack-react";

export const StatusBar = () => {
  const { sandpack } = useSandpack();

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "4px 12px",
      background: "#007acc",
      color: "#ffffff",
      fontSize: "11px",
      height: "22px",
      borderTop: "1px solid #005a9e",
    }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {/* Status Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: sandpack.status === "running" ? "#4ec9b0" : sandpack.status === "idle" ? "#cccccc" : "#ffc107",
            display: "inline-block",
          }} />
          <span>{sandpack.status === "running" ? "Running" : sandpack.status === "idle" ? "Ready" : sandpack.status}</span>
        </div>

        {/* File Info */}
        {sandpack.activeFile && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>📄</span>
            <span>{sandpack.activeFile}</span>
          </div>
        )}

        {/* Language */}
        {sandpack.activeFile && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>{sandpack.activeFile.match(/\.(\w+)$/)?.[1]?.toUpperCase() || "TEXT"}</span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {/* Line/Column Info - Placeholder (could be enhanced with editor cursor position) */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>Ln 1, Col 1</span>
        </div>

        {/* Spaces/Encoding */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>Spaces: 2</span>
        </div>

        {/* UTF-8 */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>UTF-8</span>
        </div>

        {/* End of Line */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>LF</span>
        </div>
      </div>
    </div>
  );
};

