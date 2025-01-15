import { useRemoteApp } from "./hooks";

export default function MicroApp3Container() {
  const app = useRemoteApp({
    remoteName: "microapp3",
    remoteUrl: "http://localhost:3003/assets/remoteEntry.js",
    remoteModulePath: "./bootstrap",
    LoadingComponent: <p>Loading Micro App 3...</p>,
    ErrorComponent: <p>Error loading Micro App 3</p>,
  });

  return <>{app}</>;
}
