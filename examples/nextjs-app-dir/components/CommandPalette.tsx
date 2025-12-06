"use client";

import { useState, useEffect } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

interface Command {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette = () => {
  const { sandpack } = useSandpack();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    {
      id: "open-file",
      label: "Open File",
      icon: "📂",
      action: () => {
        // TODO: Implement file picker
        setIsOpen(false);
      },
      shortcut: "Ctrl+P",
    },
    {
      id: "command-palette",
      label: "Show Command Palette",
      icon: "⌘",
      action: () => setIsOpen(true),
      shortcut: "Ctrl+Shift+P",
    },
    {
      id: "save",
      label: "Save",
      icon: "💾",
      action: () => {
        // Files are auto-saved in Sandpack
        setIsOpen(false);
      },
      shortcut: "Ctrl+S",
    },
    {
      id: "new-file",
      label: "New File",
      icon: "➕",
      action: () => {
        const fileName = prompt("File name:");
        if (fileName) {
          sandpack.addFile(fileName, "");
          setIsOpen(false);
        }
      },
    },
    {
      id: "format-document",
      label: "Format Document",
      icon: "✨",
      action: () => {
        // TODO: Implement formatting
        setIsOpen(false);
      },
      shortcut: "Shift+Alt+F",
    },
    {
      id: "toggle-terminal",
      label: "Toggle Terminal",
      icon: "💻",
      action: () => {
        // TODO: Implement terminal toggle
        setIsOpen(false);
      },
    },
    {
      id: "search",
      label: "Search in Files",
      icon: "🔍",
      action: () => {
        // TODO: Navigate to search panel
        setIsOpen(false);
      },
      shortcut: "Ctrl+F",
    },
    {
      id: "run",
      label: "Run",
      icon: "▶️",
      action: () => {
        sandpack.runSandpack();
        setIsOpen(false);
      },
      shortcut: "Ctrl+R",
    },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        if (e.key === "Enter") {
          e.preventDefault();
          filteredCommands[selectedIndex]?.action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      maxWidth: "90vw",
      background: "#252526",
      border: "1px solid #3e3e42",
      borderRadius: "4px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      zIndex: 10000,
    }}>
      <div style={{
        padding: "8px 12px",
        borderBottom: "1px solid #3e3e42",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span>⌘</span>
        <input
          type="text"
          placeholder="Type a command name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedIndex(0);
          }}
          autoFocus
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "#cccccc",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </div>
      <div style={{
        maxHeight: "400px",
        overflowY: "auto",
      }}>
        {filteredCommands.length === 0 ? (
          <div style={{ padding: "12px", color: "#888", textAlign: "center" }}>
            No commands found
          </div>
        ) : (
          filteredCommands.map((cmd, index) => (
            <div
              key={cmd.id}
              onClick={() => cmd.action()}
              style={{
                padding: "8px 12px",
                background: index === selectedIndex ? "#2a2d2e" : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderLeft: index === selectedIndex ? "3px solid #007acc" : "3px solid transparent",
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span style={{ fontSize: "16px" }}>{cmd.icon}</span>
              <span style={{ flex: 1, color: "#cccccc" }}>{cmd.label}</span>
              {cmd.shortcut && (
                <span style={{ color: "#888", fontSize: "11px" }}>{cmd.shortcut}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

