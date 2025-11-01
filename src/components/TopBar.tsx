import Button from "@mui/material/Button";
import Container from "@mui/system/Container";
import DialogSkeleton from "../utils/DialogSkeleton.tsx";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddTrialDialog from "./AddTrialDialog/AddTrialDialog.tsx";
import { useState } from "react";
import { TrialInnerData } from "./AddTrialDialog/types.tsx";
import ContextMenuSkeleton from "../utils/ContextMenuSkeleton.tsx";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { invoke } from "@tauri-apps/api/core";
import { ArenaData } from "../pages/MainScreen/types.tsx";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useDirtyState } from "../contexts/DirtyStateContext";

interface Props {
  handleAddTrial: (TrialInnerData: TrialInnerData) => void;
  handleOpenConclusionsPage: () => void;
  handleRemoveTrial: React.MouseEventHandler<HTMLButtonElement>;
  handleClear: () => void;
  whichArenaSelected: string;
  arenaData: ArenaData;
}
export const TopBar: React.FC<Props> = ({
  handleAddTrial,
  handleOpenConclusionsPage,
  handleRemoveTrial,
  handleClear,
  whichArenaSelected,
  arenaData,
}) => {
  const [open, setOpen] = useState(false);

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
    e.stopPropagation();
  };

  const handleSaveFile: React.MouseEventHandler<HTMLLIElement> = async (e) => {
    try {
      await invoke("save_file", { label: "main", payload: arenaData });
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
      <Container>
        <ContextMenuSkeleton
          menuItems={[
            <>
              <MenuItem onClick={handleNewFile}>New</MenuItem>,
              <MenuItem onClick={handleOpenFile}>Open</MenuItem>,
              <Divider />
              <MenuItem onClick={handleSaveFile}>Save</MenuItem>,
              <Divider />
              <MenuItem onClick={handleExit}>Exit</MenuItem>,
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
