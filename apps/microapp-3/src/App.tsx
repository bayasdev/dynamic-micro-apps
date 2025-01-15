import React from "react";

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
      <h1>Micro App 3</h1>
      <p>React version: {reactVersion}</p>
      <p>Embedded: {isEmbedded ? "Yes" : "No"}</p>
      <button onClick={fireEvent}>Fire event</button>
    </div>
  );
}

export default App;
