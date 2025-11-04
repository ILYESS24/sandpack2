"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { useState, useMemo } from "react";

export const FileSearch = () => {
  const { sandpack } = useSandpack();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInFiles, setSearchInFiles] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showReplace, setShowReplace] = useState(false);

  const files = Object.keys(sandpack.files);

  // Recherche dans les noms de fichiers
  const matchingFiles = useMemo(() => {
    if (!searchQuery) return [];
    return files.filter(file => 
      file.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, files]);

  // Recherche dans le contenu des fichiers
  const fileContentMatches = useMemo(() => {
    if (!searchInFiles) return {};
    
    const matches: Record<string, Array<{ line: number; content: string }>> = {};
    
    Object.entries(sandpack.files).forEach(([path, file]) => {
      const content = typeof file === "string" ? file : file.code;
      const lines = content.split("\n");
      const fileMatches: Array<{ line: number; content: string }> = [];
      
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(searchInFiles.toLowerCase())) {
          fileMatches.push({ line: index + 1, content: line.trim() });
        }
      });
      
      if (fileMatches.length > 0) {
        matches[path] = fileMatches;
      }
    });
    
    return matches;
  }, [searchInFiles, sandpack.files]);

  const handleReplace = () => {
    if (!searchInFiles || !replaceText) return;
    
    Object.entries(sandpack.files).forEach(([path, file]) => {
      const content = typeof file === "string" ? file : file.code;
      const newContent = content.replace(
        new RegExp(searchInFiles, "gi"),
        replaceText
      );
      
      if (newContent !== content) {
        sandpack.updateFile(path, newContent);
      }
    });
    
    setSearchInFiles("");
    setReplaceText("");
    alert("Remplacement effectué dans tous les fichiers !");
  };

  const openFile = (filePath: string) => {
    sandpack.openFile(filePath);
  };

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
        🔍 Recherche
      </div>

      {/* Search in File Names */}
      <div style={{ padding: "12px", borderBottom: "1px solid #3e3e42" }}>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#cccccc" }}>
          Rechercher dans les noms de fichiers
        </div>
        <input
          type="text"
          placeholder="Nom du fichier..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "6px 8px",
            background: "#3c3c3c",
            border: "1px solid #3e3e42",
            color: "#cccccc",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        {matchingFiles.length > 0 && (
          <div style={{ marginTop: "8px", maxHeight: "200px", overflowY: "auto" }}>
            {matchingFiles.map((file) => (
              <div
                key={file}
                onClick={() => openFile(file)}
                style={{
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: "12px",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#2a2d2e"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                📄 {file}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search in File Contents */}
      <div style={{ padding: "12px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#cccccc" }}>
          Rechercher dans le contenu
        </div>
        <input
          type="text"
          placeholder="Texte à rechercher..."
          value={searchInFiles}
          onChange={(e) => setSearchInFiles(e.target.value)}
          style={{
            width: "100%",
            padding: "6px 8px",
            background: "#3c3c3c",
            border: "1px solid #3e3e42",
            color: "#cccccc",
            borderRadius: "4px",
            fontSize: "12px",
            marginBottom: "8px",
          }}
        />
        
        {showReplace && (
          <input
            type="text"
            placeholder="Remplacer par..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            style={{
              width: "100%",
              padding: "6px 8px",
              background: "#3c3c3c",
              border: "1px solid #3e3e42",
              color: "#cccccc",
              borderRadius: "4px",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          />
        )}
        
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <button
            onClick={() => setShowReplace(!showReplace)}
            style={{
              padding: "4px 8px",
              background: showReplace ? "#0e639c" : "#3c3c3c",
              border: "1px solid #3e3e42",
              color: "#cccccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "11px",
            }}
          >
            {showReplace ? "✓ Remplacer" : "Remplacer"}
          </button>
          {showReplace && searchInFiles && replaceText && (
            <button
              onClick={handleReplace}
              style={{
                padding: "4px 8px",
                background: "#0e639c",
                border: "1px solid #3e3e42",
                color: "#ffffff",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              Remplacer Tout
            </button>
          )}
        </div>

        {/* Results */}
        {Object.keys(fileContentMatches).length > 0 && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>
              {Object.values(fileContentMatches).reduce((sum, matches) => sum + matches.length, 0)} résultat(s) trouvé(s)
            </div>
            {Object.entries(fileContentMatches).map(([filePath, matches]) => (
              <div key={filePath} style={{ marginBottom: "12px" }}>
                <div
                  onClick={() => openFile(filePath)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#4ec9b0",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                >
                  📄 {filePath}
                </div>
                <div style={{ marginLeft: "16px" }}>
                  {matches.map((match, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        openFile(filePath);
                        // TODO: Scroll to line
                      }}
                      style={{
                        padding: "2px 8px",
                        fontSize: "11px",
                        cursor: "pointer",
                        color: "#cccccc",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#2a2d2e"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ color: "#888" }}>Ligne {match.line}:</span> {match.content}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

