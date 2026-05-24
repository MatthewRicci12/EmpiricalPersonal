import { useEffect, useRef, useState } from "react";
import { useDirtyState } from "../contexts/DirtyStateContext";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const ExitListener = () => {
  const { isDirty } = useDirtyState();
  const isDirtyRef = useRef(isDirty);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  useEffect(() => {
    const appWindow = getCurrentWindow();
    let unlisten: (() => void) | undefined;

    const setup = async () => {
      unlisten = await appWindow.onCloseRequested(async (event) => {
        if (isDirtyRef.current) {
          event.preventDefault();
          setShowConfirm(true);
        }
      });
    };

    setup();
    return () => unlisten?.();
  }, []);

  if (!showConfirm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
        <p>You have unsaved changes. Are you sure you want to exit?</p>
        <div className="flex gap-2 justify-end">
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
          <button onClick={() => getCurrentWindow().destroy()}>Exit</button>
        </div>
      </div>
    </div>
  );
};