"use client";

import { useSandpack } from "@codesandbox/sandpack-react";

export const Breadcrumb = () => {
  const { sandpack } = useSandpack();

  if (!sandpack.activeFile) return null;

  const parts = sandpack.activeFile.split("/").filter(Boolean);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "4px 12px",
      background: "#1e1e1e",
      borderBottom: "1px solid #3e3e42",
      fontSize: "12px",
      height: "24px",
      gap: "4px",
    }}>
      {parts.map((part, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {index > 0 && <span style={{ color: "#888", margin: "0 4px" }}>/</span>}
          <span
            style={{
              color: index === parts.length - 1 ? "#ffffff" : "#4ec9b0",
              cursor: index < parts.length - 1 ? "pointer" : "default",
            }}
            onClick={() => {
              if (index < parts.length - 1) {
                const path = "/" + parts.slice(0, index + 1).join("/");
                // TODO: Navigate to folder or open file
              }
            }}
          >
            {part}
          </span>
        </div>
      ))}
    </div>
  );
};

