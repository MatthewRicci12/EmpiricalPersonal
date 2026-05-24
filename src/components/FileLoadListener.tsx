import { useEffect, useRef, useState } from "react";
import { useDirtyState } from "../contexts/DirtyStateContext";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { listen } from "@tauri-apps/api/event";

export const FileLoadListener = () => {
    useEffect(() => {
        const unlisten = listen("file-load", (event) => {
            let payload = event.payload
            console.log(payload);
        });

        return () => {
            unlisten.then(f => f());
        };
    }, []);

    return <></>;
};