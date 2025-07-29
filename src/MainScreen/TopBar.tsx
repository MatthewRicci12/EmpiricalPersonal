
import Stack from '@mui/material/Stack';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import DialogSkeleton from '../Dialogs/Dialogs.tsx';
import AddTrialDialog, { AddTrialDialogData } from './AddTrialDialog.tsx';


interface Props {
  handleAddTrial: (addTrialDialogData: AddTrialDialogData) => void
}
export const TopBar: React.FC<Props> = ({handleAddTrial}) => {
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
        <Button onClick={handleClickOpen}>
        <AddIcon/>
        </Button>
          <DialogSkeleton
          open={open}
          onClose={handleClose}
          >
          <AddTrialDialog handleAddTrial={handleAddTrial} handleClose={handleClose} />
          </DialogSkeleton>
        Add Trial
      </Container>

      <Container>
        <Typography align="right">Settings</Typography>
      </Container>

    </Stack>
  );
}


export default TopBar;