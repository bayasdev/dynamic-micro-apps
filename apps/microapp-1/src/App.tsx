import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const fireEvent = () => {
    const event = new CustomEvent("app:notifications", {
      detail: {
        message: "Hello from Micro App 1!",
      },
    });
    console.log("Firing event", event);
    window.dispatchEvent(event);
  };

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
      <h1>Micro App 1</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment count
      </button>

      <button onClick={fireEvent}>Fire event</button>
    </div>
  );
}

export default App;
