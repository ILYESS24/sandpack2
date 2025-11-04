"use client";

import { useState } from "react";

export type SidebarView = "explorer" | "search" | "console" | "settings";

interface SidebarButtonsProps {
  activeView: SidebarView;
  onViewChange: (view: SidebarView) => void;
}

export const SidebarButtons = ({ activeView, onViewChange }: SidebarButtonsProps) => {
  return (
    <div style={{
      width: "48px",
      display: "flex",
      flexDirection: "column",
      background: "#252526",
      borderRight: "1px solid #3e3e42",
      alignItems: "center",
      paddingTop: "8px",
      gap: "4px",
    }}>
      {/* Explorer Button */}
      <button
        onClick={() => onViewChange("explorer")}
        title="Explorer"
        style={{
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: activeView === "explorer" ? "#2a2d2e" : "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeView === "explorer" ? "#ffffff" : "#cccccc",
          fontSize: "20px",
        }}
        onMouseEnter={(e) => {
          if (activeView !== "explorer") {
            e.currentTarget.style.background = "#2a2d2e";
          }
        }}
        onMouseLeave={(e) => {
          if (activeView !== "explorer") {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        📁
      </button>

      {/* Search Button */}
      <button
        onClick={() => onViewChange("search")}
        title="Search"
        style={{
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: activeView === "search" ? "#2a2d2e" : "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeView === "search" ? "#ffffff" : "#cccccc",
          fontSize: "20px",
        }}
        onMouseEnter={(e) => {
          if (activeView !== "search") {
            e.currentTarget.style.background = "#2a2d2e";
          }
        }}
        onMouseLeave={(e) => {
          if (activeView !== "search") {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        🔍
      </button>

      {/* Console Button */}
      <button
        onClick={() => onViewChange("console")}
        title="Terminal"
        style={{
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: activeView === "console" ? "#2a2d2e" : "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeView === "console" ? "#ffffff" : "#cccccc",
          fontSize: "20px",
        }}
        onMouseEnter={(e) => {
          if (activeView !== "console") {
            e.currentTarget.style.background = "#2a2d2e";
          }
        }}
        onMouseLeave={(e) => {
          if (activeView !== "console") {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        💻
      </button>

      {/* Settings Button */}
      <button
        onClick={() => onViewChange("settings")}
        title="Settings"
        style={{
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: activeView === "settings" ? "#2a2d2e" : "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeView === "settings" ? "#ffffff" : "#cccccc",
          fontSize: "20px",
        }}
        onMouseEnter={(e) => {
          if (activeView !== "settings") {
            e.currentTarget.style.background = "#2a2d2e";
          }
        }}
        onMouseLeave={(e) => {
          if (activeView !== "settings") {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        ⚙️
      </button>
    </div>
  );
};

