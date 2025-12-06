import type { NextPage } from "next";
import Head from "next/head";
import { Sandpack } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";

const TestAI: NextPage = () => {
  return (
    <>
      <Head>
        <title>Test Assistant IA - Sandpack</title>
        <meta name="description" content="Page de test pour l'assistant IA OpenRouter" />
      </Head>
      <div style={{ padding: "40px", minHeight: "100vh", backgroundColor: "#1e1e1e" }}>
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>
          Test de l'Assistant IA OpenRouter
        </h1>
        <p style={{ color: "#ccc", marginBottom: "30px" }}>
          L'assistant IA devrait apparaître comme un bouton 🤖 en bas à droite de l'éditeur.
          Cliquez dessus pour ouvrir le panneau de chat.
        </p>
        
        <div style={{ border: "1px solid #333", borderRadius: "8px", overflow: "hidden" }}>
          <Sandpack
            template="react"
            theme={sandpackDark}
            files={{
              "/App.js": {
                code: `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Compteur: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}`,
              },
            }}
            options={{
              showTabs: true,
              showLineNumbers: true,
              showInlineErrors: true,
            }}
          />
        </div>

        <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#2a2a2a", borderRadius: "8px" }}>
          <h2 style={{ color: "#fff", marginBottom: "15px" }}>Instructions :</h2>
          <ol style={{ color: "#ccc", lineHeight: "1.8" }}>
            <li>Regardez en bas à droite de l'éditeur ci-dessus</li>
            <li>Vous devriez voir un bouton circulaire avec l'icône 🤖</li>
            <li>Cliquez sur ce bouton pour ouvrir l'assistant IA</li>
            <li>Essayez les actions rapides : Expliquer, Améliorer, Déboguer</li>
            <li>Ou posez une question dans le chat</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default TestAI;

