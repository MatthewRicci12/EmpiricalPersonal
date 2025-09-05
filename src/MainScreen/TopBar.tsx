
import Stack from '@mui/material/Stack';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import AddTrialDialog, { AddTrialDialogData } from './AddTrialDialog.tsx';


interface Props {
  handleAddTrial: (addTrialDialogData: AddTrialDialogData) => void,
  handleOpenConclusionsPage: () => void
}
export const TopBar: React.FC<Props> = ({handleAddTrial, handleOpenConclusionsPage}) => {
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
        <AddIcon/>
        </Button>
        Add Trial
          <DialogSkeleton
          open={open}
          onClose={handleClose}
          >
          <AddTrialDialog handleAddTrial={handleAddTrial} handleClose={handleClose} />
          </DialogSkeleton>
      </Container>
      <Container>
        <Button onClick={handleOpenConclusionsPage}>
          <Typography color="cyan">Conclusions</Typography>
        </Button>
      </Container>

      <Container>
        <Typography align="right">Settings</Typography>
      </Container>

    </Stack>
  );
}


export default TopBar;