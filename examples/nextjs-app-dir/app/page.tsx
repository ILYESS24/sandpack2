"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackTranspiledCode,
  SandpackStack,
  SandpackConsole,
  Navigator,
} from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";
import { EnhancedConsole } from "@/components/EnhancedConsole";
import { CompleteToolbar } from "@/components/CompleteToolbar";
import { SidebarButtons, type SidebarView } from "@/components/SidebarButtons";
import { FileSearch } from "@/components/FileSearch";
import { SettingsPanel } from "@/components/SettingsPanel";
import { StatusBar } from "@/components/StatusBar";
import { CommandPalette } from "@/components/CommandPalette";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";

export default function Home() {
  const [sidebarView, setSidebarView] = useState<SidebarView>("explorer");

  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <SandpackProvider
        theme={githubLight}
        template="react"
        options={{
          autoReload: true,
          autorun: true,
          initMode: "immediate",
        }}
      >
        {/* Command Palette - Overlay */}
        <CommandPalette />
        
        {/* Barre d'outils complète avec tous les boutons */}
        <CompleteToolbar />
        
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "row" }}>
          {/* Barre latérale avec boutons */}
          <SidebarButtons activeView={sidebarView} onViewChange={setSidebarView} />
          
          {/* Panneau latéral (Explorer, Search, Console, Settings) */}
          <div style={{ width: "250px", display: "flex", flexDirection: "column", borderRight: "1px solid #3e3e42", overflow: "hidden" }}>
            {sidebarView === "explorer" && <SandpackFileExplorer />}
            {sidebarView === "search" && <FileSearch />}
            {sidebarView === "console" && (
              <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <EnhancedConsole />
              </div>
            )}
            {sidebarView === "settings" && <SettingsPanel />}
          </div>
          
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Breadcrumb Navigation */}
            <Breadcrumb />
            
            <SandpackLayout style={{ flex: 1, display: "flex", flexDirection: "row" }}>
              {/* CodeEditor - Éditeur de code au centre */}
              <SandpackCodeEditor 
                showTabs
                showLineNumbers
                closableTabs
                showInlineErrors
                showRunButton
              />
              
              {/* Colonne droite - Preview, Transpiled */}
              <SandpackStack style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Preview - Aperçu avec Navigator */}
                <div style={{ flex: "1 1 50%", minHeight: "300px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  <SandpackPreview 
                    showNavigator
                    showRefreshButton
                    showOpenInCodeSandbox
                    showRestartButton
                    showOpenNewtab
                  />
                </div>
                
                {/* TranspiledCode - Code transpilé */}
                <div style={{ flex: "0 0 200px", minHeight: "200px", maxHeight: "300px", display: "flex", flexDirection: "column", overflow: "hidden", borderTop: "1px solid #e0e0e0" }}>
                  <div style={{ padding: "8px", background: "#f5f5f5", borderBottom: "1px solid #e0e0e0", fontSize: "12px", fontWeight: "bold" }}>
                    📦 Code Transpilé
                  </div>
                  <div style={{ flex: 1, overflow: "auto" }}>
                    <SandpackTranspiledCode />
                  </div>
                </div>
              </SandpackStack>
            </SandpackLayout>
            
            {/* Status Bar - Like VS Code */}
            <StatusBar />
          </div>
        </div>
      </SandpackProvider>
    </div>
  );
}
