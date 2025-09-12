
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
}
export const TopBar: React.FC<Props> = ({handleAddTrial, handleOpenConclusionsPage, handleRemoveTrial}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return(
    <Stack
    direction="row"
    alignItems="center"
    
    >
      <Container>
        <Button>
          File
        </Button>
      </Container>

      <Container>
        <Button onClick={handleClickOpen} sx={{display: "inline"}}>
        <Typography>Add Trial</Typography>
        </Button>
          <DialogSkeleton
          open={open}
          onClose={handleClose}>
          <AddTrialDialog handleAddTrial={handleAddTrial} handleClose={handleClose} />
          </DialogSkeleton>
        <Button onClick={handleRemoveTrial}>
          <Typography>Remove Trial</Typography>
        </Button>
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