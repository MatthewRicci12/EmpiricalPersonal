import { useEffect } from "react";
import { useDirtyState } from "../contexts/DirtyStateContext";
import { listen, UnlistenFn } from "@tauri-apps/api/event";

export const ExitListener = () => {
  const { isDirty } = useDirtyState();

  useEffect(() => {
    let unlisten: UnlistenFn | undefined;

    const askUserForConfirmation = async () => {
      try {
        if (!isDirty) {
          return;
        }

        unlisten = await listen("user-exit", (event) => {
          alert("You have unsaved changes. Are you sure you want to exit?");
        });
      } catch (e) {
        alert("!");
      }
    };

    askUserForConfirmation();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, [isDirty]);

  return null;
};
