import { useEffect, useState } from "react";
import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";

interface RemoteComponentParams {
  remoteName: string;
  remoteUrl: string;
  remoteModulePath: string;
}

export const useRemoteComponent = ({
  remoteName,
  remoteUrl,
  remoteModulePath,
}: RemoteComponentParams) => {
  const [RemoteComponent, setRemoteComponent] =
    useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadRemoteComponent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        __federation_method_setRemote(remoteName, {
          url: () => Promise.resolve(remoteUrl),
          format: "esm",
          from: "vite",
        });

        const moduleWrapped = await __federation_method_getRemote(
          remoteName,
          remoteModulePath
        );
        const remoteModule = (await __federation_method_unwrapDefault(
          moduleWrapped
        )) as React.ComponentType;
        setRemoteComponent(() => remoteModule);
      } catch (error) {
        console.error("Failed to load remote component:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("Failed to load remote component")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadRemoteComponent();
  }, [remoteName, remoteUrl, remoteModulePath]);

  return { RemoteComponent, isLoading, error };
};

type MountFunction = (el: HTMLElement) => void;

export function useRemoteBootstrap({
  remoteName,
  remoteUrl,
  remoteModulePath,
}: RemoteComponentParams) {
  const [mountToFn, setMountToFn] = useState<MountFunction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRemote() {
      try {
        setIsLoading(true);
        setError(null);

        __federation_method_setRemote(remoteName, {
          url: () => Promise.resolve(remoteUrl),
          format: "esm",
          from: "vite",
        });

        const moduleWrapped = await __federation_method_getRemote(
          remoteName,
          remoteModulePath
        );
        const remoteModule = moduleWrapped as {
          mountTo: MountFunction;
          [key: string]: any;
        };
        setMountToFn(() => remoteModule.mountTo);
      } catch (err) {
        console.error("Failed to load remote mount:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load remote mount")
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadRemote();
  }, [remoteName, remoteUrl, remoteModulePath]);

  return { mountToFn, isLoading, error };
}
