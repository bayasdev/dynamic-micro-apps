import { useEffect, useRef, useState } from "react";
import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";

interface RemoteModuleParams {
  remoteName: string;
  remoteUrl: string;
  remoteModulePath: string;
}

const useRemoteModule = <T,>({
  remoteName,
  remoteUrl,
  remoteModulePath,
}: RemoteModuleParams): {
  remoteModule: T | null;
  isLoading: boolean;
  error: Error | null;
} => {
  const [remoteModule, setRemoteModule] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let canceled = false;

    const loadRemote = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Register the remote
        __federation_method_setRemote(remoteName, {
          url: () => Promise.resolve(remoteUrl),
          format: "esm",
          from: "vite",
        });

        // Fetch the remote module
        const moduleWrapped = await __federation_method_getRemote(
          remoteName,
          remoteModulePath
        );

        // If this hook is unmounted mid-fetch, avoid state updates
        if (canceled) return;

        setRemoteModule(moduleWrapped as T);
      } catch (err) {
        console.error("Failed to load remote module:", err);
        if (!canceled) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to load remote module")
          );
        }
      } finally {
        if (!canceled) {
          setIsLoading(false);
        }
      }
    };

    loadRemote();
    return () => {
      canceled = true;
    };
  }, [remoteName, remoteUrl, remoteModulePath]);

  return { remoteModule, isLoading, error };
};

export const useRemoteComponent = (params: RemoteModuleParams) => {
  const { remoteModule, isLoading, error } = useRemoteModule(params);
  const [RemoteComponent, setRemoteComponent] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    const unwrap = async () => {
      if (!remoteModule) return;
      try {
        const component = (await __federation_method_unwrapDefault(
          remoteModule
        )) as React.ComponentType;
        setRemoteComponent(() => component);
      } catch (err) {
        console.error("Failed to unwrap remote component:", err);
      }
    };
    unwrap();
  }, [remoteModule]);

  return { RemoteComponent, isLoading, error };
};

export const useRemoteBootstrap = (params: RemoteModuleParams) => {
  const { remoteModule, isLoading, error } = useRemoteModule(params);
  const [mountToFn, setMountToFn] = useState<
    ((el: HTMLElement, basePath?: string) => void) | null
  >(null);

  useEffect(() => {
    if (remoteModule) {
      const typedModule = remoteModule as {
        mountTo: (el: HTMLElement, basePath?: string) => void;
      };
      setMountToFn(() => typedModule.mountTo);
    }
  }, [remoteModule]);

  return { mountToFn, isLoading, error };
};

export interface RemoteBootstrapParams extends RemoteModuleParams {
  LoadingComponent: React.ReactNode;
  ErrorComponent: React.ReactNode;
  basePath?: string;
}

export const useRemoteApp = ({
  remoteName,
  remoteUrl,
  remoteModulePath,
  LoadingComponent,
  ErrorComponent,
  basePath,
}: RemoteBootstrapParams) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { mountToFn, isLoading, error } = useRemoteBootstrap({
    remoteName,
    remoteUrl,
    remoteModulePath,
  });

  useEffect(() => {
    if (!isLoading && !error && mountToFn && containerRef.current) {
      mountToFn(containerRef.current, basePath);
    }
  }, [isLoading, error, mountToFn]);

  if (error) {
    return <>{ErrorComponent}</>;
  }

  if (isLoading) {
    return <>{LoadingComponent}</>;
  }

  return <div ref={containerRef} />;
};
