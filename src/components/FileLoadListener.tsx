import { useEffect, useRef, useState } from "react";
import { useDirtyState } from "../contexts/DirtyStateContext";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { listen } from "@tauri-apps/api/event";

export const FileLoadListener = () => {
    useEffect(() => {
        const unlisten = listen("file-load", (event) => {
            console.log("Received file-load event:", event.payload);
        });

        return () => {
            unlisten.then(f => f()); // cleanup listener on unmount
        };
    }, []);

    return <></>;
};