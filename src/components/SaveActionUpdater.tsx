import { useEffect } from "react";
import { useDirtyState } from "../contexts/DirtyStateContext";
import { invoke } from "@tauri-apps/api/core";

export const SaveActionUpdater = () => {
  const { isDirty } = useDirtyState();

  useEffect(() => {
    const updateTitle = async () => {
      try {
        if (isDirty) {
          invoke("set_window_title", { label: "main", isDirty: true });
        } else {
          invoke("set_window_title", { label: "main", isDirty: false });
        }
      } catch (e) {
        alert("Failed to update window title");
      }
    };

    updateTitle();
  }, [isDirty]);

  return null;
};
