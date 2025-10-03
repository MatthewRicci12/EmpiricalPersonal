import Button from "@mui/material/Button";
import Container from "@mui/system/Container";
import DialogSkeleton from "../utils/DialogSkeleton.tsx";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddTrialDialog from "./AddTrialDialog/AddTrialDialog.tsx";
import { useState } from "react";
import { TrialInnerData } from "./AddTrialDialog/types.tsx";

interface Props {
  handleAddTrial: (TrialInnerData: TrialInnerData) => void;
  handleOpenConclusionsPage: () => void;
  handleRemoveTrial: React.MouseEventHandler<HTMLButtonElement>;
  whichArenaSelected: string;
}
export const TopBar: React.FC<Props> = ({
  handleAddTrial,
  handleOpenConclusionsPage,
  handleRemoveTrial,
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

  return (
    <Stack direction="row" alignItems="center">
      <Container>
        <Button>File</Button>
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
