import { useEffect, useRef } from "react";

import { useRemoteBootstrap } from "./hooks";

function MicroApp3Container() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    mountToFn: remoteBootstrap,
    isLoading,
    error,
  } = useRemoteBootstrap({
    remoteName: "microapp3",
    remoteUrl: "http://localhost:3003/assets/remoteEntry.js",
    remoteModulePath: "./bootstrap",
  });

  useEffect(() => {
    if (!isLoading && !error && remoteBootstrap && containerRef.current) {
      remoteBootstrap(containerRef.current);
    }
  }, [isLoading, error, remoteBootstrap]);

  if (error) return <p>Error loading MicroApp3: {error.message}</p>;
  if (isLoading) return <p>Loading MicroApp3...</p>;

  return <div ref={containerRef} />;
}

export default MicroApp3Container;
