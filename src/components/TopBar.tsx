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
import { emit } from "@tauri-apps/api/event";

interface Props {
  handleAddTrial: (TrialInnerData: TrialInnerData) => void;
  handleOpenConclusionsPage: () => void;
  handleRemoveTrial: React.MouseEventHandler<HTMLButtonElement>;
  handleClear: () => void;
  whichArenaSelected: string;
}
export const TopBar: React.FC<Props> = ({
  handleAddTrial,
  handleOpenConclusionsPage,
  handleRemoveTrial,
  handleClear,
  whichArenaSelected,
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

  const handleSaveFile: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
  };

  const handleExit: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
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
