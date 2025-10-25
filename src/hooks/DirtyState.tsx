import { useEffect, useCallback } from "react";

export const useGlobalShortcut = (
  isDirty: boolean,
  callback: () => void
): void => {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    if (!isDirty) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      if (isCtrlOrCmd && event.key === "s") {
        event.preventDefault();
        memoizedCallback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDirty, memoizedCallback]);
};
