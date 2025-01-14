function App() {
  const fireEvent = () => {
    const event = new CustomEvent("app:notifications", {
      detail: {
        message: "Hello from Micro App 2!",
      },
    });
    console.log("Firing event", event);
    window.dispatchEvent(event);
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Micro App 2</h1>
      <button onClick={fireEvent}>Fire event</button>
    </div>
  );
}

export default App;
