
import Stack from '@mui/material/Stack';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import AddTrialDialog, { AddTrialDialogData } from './AddTrialDialog.tsx';

interface Props {
  handleAddTrial: (addTrialDialogData: AddTrialDialogData) => void,
  handleOpenConclusionsPage: () => void,
  handleRemoveTrial: React.MouseEventHandler<HTMLButtonElement>,
  whichArenaSelected: string
}
export const TopBar: React.FC<Props> = ({ handleAddTrial, handleOpenConclusionsPage, handleRemoveTrial, whichArenaSelected }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (whichArenaSelected.length !== 0) setOpen(true);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpen(false);
  };


  return(
    <Stack
    direction="row"
    alignItems="center">
      <Container>
        <Button>
          File
        </Button>
      </Container>

      <Container>
        {/* Add Trial Button */}
        <Button onClick={handleClickOpen} sx={{display: "inline"}}>
        <Typography>Add Trial</Typography>
        </Button>
          <DialogSkeleton
          open={open}
          onClose={handleClose}>
          <AddTrialDialog handleAddTrial={handleAddTrial} handleClose={handleClose} />
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
}


export default TopBar;