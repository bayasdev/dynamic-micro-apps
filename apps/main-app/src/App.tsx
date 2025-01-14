import NotificationsListener from "./NotificationsListener";
import { useRemoteComponent } from "./hooks";

function App() {
  const {
    RemoteComponent: MicroApp1,
    isLoading: loadingMicroApp1,
    error: errorMicroApp1,
  } = useRemoteComponent({
    remoteName: "microapp1",
    remoteUrl: "http://localhost:3001/assets/remoteEntry.js",
    remoteModulePath: "./App",
  });

  const {
    RemoteComponent: MicroApp2,
    isLoading: loadingMicroApp2,
    error: errorMicroApp2,
  } = useRemoteComponent({
    remoteName: "microapp2",
    remoteUrl: "http://localhost:3002/assets/remoteEntry.js",
    remoteModulePath: "./App",
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}
    >
      <h1>Main App</h1>
      <NotificationsListener />
      <div style={{ border: "1px solid red" }}>
        {loadingMicroApp1 ? (
          <p>Loading Micro App 1...</p>
        ) : errorMicroApp1 ? (
          <p>Error loading Micro App 1: {errorMicroApp1.message}</p>
        ) : MicroApp1 ? (
          <MicroApp1 />
        ) : null}
      </div>
      <div style={{ border: "1px solid blue" }}>
        {loadingMicroApp2 ? (
          <p>Loading Micro App 2...</p>
        ) : errorMicroApp2 ? (
          <p>Error loading Micro App 2: {errorMicroApp2.message}</p>
        ) : MicroApp2 ? (
          <MicroApp2 />
        ) : null}
      </div>
    </div>
  );
}

export default App;
