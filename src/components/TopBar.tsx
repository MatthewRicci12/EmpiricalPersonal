import Button from "@mui/material/Button";
import Container from "@mui/system/Container";
import DialogSkeleton from "../utils/DialogSkeleton.tsx";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddTrialDialog from "./AddTrialDialog/AddTrialDialog.tsx";
import { useState, useRef } from "react";
import { TrialInnerData } from "./AddTrialDialog/types.tsx";
import ContextMenuSkeleton from "../utils/ContextMenuSkeleton.tsx";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { invoke } from "@tauri-apps/api/core";
import {
  ArenaData,
  SubtrialData,
  TrialData,
} from "../pages/MainScreen/types.tsx";
import { useDirtyState } from "../contexts/DirtyStateContext";
interface Props {
  handleAddTrial: (TrialInnerData: TrialInnerData) => void;
  handleOpenConclusionsPage: () => void;
  handleRemoveTrial: React.MouseEventHandler<HTMLButtonElement>;
  handleClear: () => void;
  handleLoadFile: (obj: any) => void;
  whichArenaSelected: string;
  payload: [ArenaData, (keyof ArenaData)[], TrialData, SubtrialData];
}
export const TopBar: React.FC<Props> = ({
  handleAddTrial,
  handleOpenConclusionsPage,
  handleRemoveTrial,
  handleClear,
  handleLoadFile,
  whichArenaSelected,
  payload,
}) => {
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleClickOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (whichArenaSelected.length !== 0) setOpen(true);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleNewFile: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
    handleClear();
  };

  const handleOpenFile: React.MouseEventHandler<HTMLLIElement> = (e) => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }

    e.stopPropagation();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      inputFileRef.current!.value = "";
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsText(selectedFile);

        reader.onload = (event: ProgressEvent<FileReader>) => {
          try {
            if (!event.target) {
              throw new Error("File reading failed: No target found.");
            }

            const jsonString: string = event.target!.result as string;

            const obj: typeof payload = JSON.parse(
              jsonString
            ) as typeof payload;

            handleLoadFile(obj);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            // Handle non-JSON file or corrupt data
            alert("Failed to parse file: Please ensure it is valid JSON.");
          }
        };

        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        };
      }
    }
  };

  const handleSaveFile: React.MouseEventHandler<HTMLLIElement> = async (e) => {
    try {
      await invoke("save_file", { label: "main", payload: payload });
    } catch (e: any) {
      alert(e.toString());
    }

    e.stopPropagation();
  };

  const handleExit: React.MouseEventHandler<HTMLLIElement> = async (e) => {
    e.stopPropagation();
    try {
      const { isDirty } = useDirtyState();
      await invoke("close_application", {
        isDirty: isDirty,
      });
    } catch (e: any) {
      alert(e.toString());
    }
  };

  return (
    <Stack direction="row" alignItems="center">
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Container>
        <ContextMenuSkeleton
          menuItems={[
            <>
              <MenuItem key={0} onClick={handleNewFile}>
                New
              </MenuItem>
              ,
              <MenuItem key={1} onClick={handleOpenFile}>
                Open
              </MenuItem>
              ,
              <Divider />
              <MenuItem key={2} onClick={handleSaveFile}>
                Save
              </MenuItem>
              ,
              <Divider />
              <MenuItem key={3} onClick={handleExit}>
                Exit
              </MenuItem>
              ,
            </>,
          ]}
          leftClick={true}
        >
          <Button>File</Button>
        </ContextMenuSkeleton>
      </Container>

      <Container>
        {/* Add Trial Button */}
        <Button onClick={handleClickOpen} sx={{ display: "inline" }}>
          <Typography>Add Trial</Typography>
        </Button>
        <DialogSkeleton open={open} onClose={handleClose}>
          <AddTrialDialog
            handleAddTrial={handleAddTrial}
            handleClose={handleClose}
          />
        </DialogSkeleton>

        {/* Remove Trial Button */}
        <Button onClick={handleRemoveTrial}>
          <Typography>Remove Trial</Typography>
        </Button>

        {/* Conclusions Button */}
        <Button onClick={handleOpenConclusionsPage}>
          <Typography>Conclusions</Typography>
        </Button>
      </Container>

      <Container>
        <Typography align="right">Settings</Typography>
      </Container>
    </Stack>
  );
};

export default TopBar;
