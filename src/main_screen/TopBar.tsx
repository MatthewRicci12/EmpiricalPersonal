
import Stack from '@mui/material/Stack';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import DialogSkeleton from '../Dialogs.tsx';

interface AddTrialDialogProps {
  addTrialHandler: () => void
}
function AddTrialDialog({addTrialHandler} : AddTrialDialogProps) {
  const [value, setValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <>
    <DialogTitle>Add New Arena</DialogTitle>
    <Typography>Trial name: <TextField id="outlined-basic" variant="outlined" value={value} onChange={handleInput} 
                sx={{
                    paddingBottom: '10px'
                }}></TextField></Typography>
    <Button variant="contained" onClick={addTrialHandler}>Submit</Button>
    </>
  );
}

interface TopBarProps {
  addTrialHandler: () => void
}
export function TopBar({addTrialHandler} : TopBarProps) {
  const [value, setValue] = useState("");
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
          <AddIcon
            sx={{
            }}>
          </AddIcon>
        </Button>
      </Container>

      <Container>
        <Button onClick={handleClickOpen}>
        <AddIcon></AddIcon>
        </Button>
          <DialogSkeleton
          children={<AddTrialDialog addTrialHandler={addTrialHandler} />}
          open={open}
          onClose={handleClose}
          >
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