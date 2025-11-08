import { useEffect } from "react";
import { listen, UnlistenFn } from "@tauri-apps/api/event";

export const FileLoadListener = () => {
  useEffect(() => {
    let unlisten: UnlistenFn | undefined;

    const loadFile = async () => {
      try {
        unlisten = await listen("file-load", (event) => {
          let payload: string = event.payload as string;
          alert(`File received: {payload}`);
        });
      } catch (e) {
        alert("!");
      }
    };

    loadFile();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  return null;
};
