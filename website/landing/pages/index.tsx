import type { NextPage } from "next";
import Head from "next/head";
import { Sandpack } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sandpack avec Assistant IA</title>
        <meta name="description" content="Éditeur de code Sandpack avec Assistant IA OpenRouter intégré" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: "#1e1e1e",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Header simple */}
        <header style={{
          padding: "20px 40px",
          backgroundColor: "#252525",
          borderBottom: "1px solid #333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{ 
            color: "#fff", 
            margin: 0,
            fontSize: "24px",
            fontWeight: "600"
          }}>
            Sandpack Editor
          </h1>
          <div style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "bold",
          }}>
            🤖 Assistant IA Activé
          </div>
        </header>

        {/* Éditeur Sandpack en plein écran */}
        <div style={{ 
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}>
          <Sandpack
            template="react"
            theme={sandpackDark}
            files={{
              "/App.js": {
                code: `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}>
      <h1>Bienvenue dans Sandpack !</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Compteur: <strong>{count}</strong>
      </p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Incrémenter
      </button>
      <p style={{ marginTop: '30px', color: '#666' }}>
        Cliquez sur le bouton 🤖 en bas à droite pour ouvrir l'assistant IA
      </p>
    </div>
  );
}`,
              },
            }}
            options={{
              showTabs: true,
              showLineNumbers: true,
              showInlineErrors: true,
              editorHeight: "100%",
              editorWidthPercentage: 50,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
