import { Link } from "react-router";
import { useRemoteApp } from "./hooks";

export default function MicroApp4Container() {
  const app = useRemoteApp({
    remoteName: "microapp4",
    remoteUrl: "http://localhost:3004/assets/remoteEntry.js",
    remoteModulePath: "./bootstrap",
    LoadingComponent: <p>Loading Micro App 4...</p>,
    ErrorComponent: <p>Error loading Micro App 4</p>,
    basePath: "/microapp4",
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}
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
        <h1>Main App</h1>
        <Link to="/">Home</Link>
      </div>
      <div
        style={{
          border: "1px solid purple",
        }}
      >
        {app}
      </div>
    </div>
  );
}
