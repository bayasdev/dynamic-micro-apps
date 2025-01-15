import React from "react";
import { Link } from "react-router";

interface AppProps {
  isEmbedded?: boolean;
}

function App({ isEmbedded = false }: AppProps) {
  const fireEvent = () => {
    const event = new CustomEvent("app:notifications", {
      detail: {
        message: "Hello from Micro App 3!",
      },
    });
    console.log("Firing event", event);
    window.dispatchEvent(event);
  };

  const reactVersion = React.version;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 8,
        }}
      >
        <h1>Micro App 4</h1>
        <Link to="/settings">Settings</Link>
      </div>
      <p>React version: {reactVersion}</p>
      <p>Embedded: {isEmbedded ? "Yes" : "No"}</p>
      <button onClick={fireEvent}>Fire event</button>
    </div>
  );
}

export default App;
