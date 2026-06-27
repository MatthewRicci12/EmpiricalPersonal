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
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
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

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const { isDirty } = useDirtyState();

  const handleClickOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (whichArenaSelected.length !== 0) setOpen(true);
    setContextMenu(null);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpen(false);
    setContextMenu(null);
  };

  const handleNewFile: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
    handleClear();
    setContextMenu(null);
  };

  const handleOpenFile: React.MouseEventHandler<HTMLLIElement> = async (e) => {
    try {
      await invoke("load_file");
    } catch (e: any) {
      alert(e.toString());
    }

    e.stopPropagation();
    setContextMenu(null);
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
      await invoke("close_application", {
        isDirty: isDirty,
      });
    } catch (e: any) {
      alert(e.toString());
    }

    setContextMenu(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mx: { xs: 2, md: 3 },
        mt: { xs: 2, md: 3 },
        mb: 2,
        px: { xs: 2.5, md: 3.5 },
        py: { xs: 2.4, md: 3 },
      }}
    >
      <Stack direction={{ xs: "column", lg: "row" }} spacing={2.5} alignItems={{ xs: "stretch", lg: "center" }} justifyContent="space-between">
        <Stack spacing={1.2}>
          <Typography variant="h3">Personal Empirical</Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="flex-end"
          flexWrap="wrap"
          useFlexGap
        >
          <Chip
            label={whichArenaSelected.length !== 0 ? `Active arena: ${whichArenaSelected}` : "Select an arena"}
            sx={{
              alignSelf: { xs: "flex-start", md: "center" },
              height: 38,
              '& .MuiChip-label': {
                px: 1.45,
              },
            }}
          />

          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              p: 0.95
            }}
          >
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
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
              >
                <Button>File</Button>
              </ContextMenuSkeleton>

              <Button onClick={handleClickOpen} sx={{ display: "inline" }}>
                <Typography>Add Trial</Typography>
              </Button>
              <DialogSkeleton open={open} onClose={handleClose}>
                <AddTrialDialog
                  handleAddTrial={handleAddTrial}
                  handleClose={handleClose}
                />
              </DialogSkeleton>

              <Button onClick={handleRemoveTrial}>
                <Typography>Remove Trial</Typography>
              </Button>

              {/* Conclusions Button */}
              <Button onClick={handleOpenConclusionsPage}>
                <Typography>Conclusions</Typography>
              </Button>
          </Paper>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TopBar;
