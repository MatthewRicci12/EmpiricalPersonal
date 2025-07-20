
import Stack from '@mui/material/Stack';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import DialogSkeleton from '../Dialogs.tsx';


export interface addTrialDialogData {
  trialTitle: string,
  successString: string,
  failureString: string,
  additionalNotesString: string
}

interface AddTrialDialogProps {
  handleAddTrial: (addTrialDialogData: addTrialDialogData) => void
}
function AddTrialDialog({handleAddTrial} : AddTrialDialogProps) {
  const [valueTrialName, setValueTrialName] = useState("");
  const [valueSuccess, setValueSuccess] = useState("");
  const [valueFailure, setValueFailure] = useState("");
  const [valueAdditionalNotes, setValueAdditionalNotes] = useState("");


  let addTrialDialogData: addTrialDialogData = {} as addTrialDialogData;


  const handleInputTrialName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTrialName(e.target.value);
  }

  const handleInputSuccess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSuccess(e.target.value);
  }

  const handleInputFailure= (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueFailure(e.target.value);
  }

  const handleInputAdditionalNotes= (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueAdditionalNotes(e.target.value);
  }

  // outlined-multiline-flexible multiline maxRows={4}
  return (
    <>
    <DialogTitle>Add New Arena</DialogTitle>


    {/* Input for trial's name */}
    <Typography>Trial name: <TextField id="outlined-basic" variant="outlined" value={valueTrialName} onChange={handleInputTrialName} 
                sx={{
                    paddingBottom: '10px'
                }}></TextField></Typography>

    {/* What a success looks like */}
    <Typography>What a success looks like</Typography>
    <TextField  id=" outlined-multiline-flexible" multiline rows={4} value={valueSuccess} onChange={handleInputSuccess}></TextField>

    {/* What a failure looks like*/}
    <Typography>What a failure looks like</Typography>
    <TextField id=" outlined-multiline-flexible" multiline rows={4} value={valueFailure} onChange={handleInputFailure} ></TextField>

    {/* Additional notes */}
    <Typography>Additional notes</Typography>
    <TextField id=" outlined-multiline-flexible" multiline rows={4} value={valueAdditionalNotes} onChange={handleInputAdditionalNotes} ></TextField>

    {/* BOTTOM SUBMIT BUTTON */}
    <Button variant="contained" onClick={() => {
      //##############################################################HERE
      addTrialDialogData.trialTitle = valueTrialName;
      addTrialDialogData.successString = valueSuccess;
      addTrialDialogData.failureString = valueFailure;
      addTrialDialogData.additionalNotesString = valueAdditionalNotes;
      handleAddTrial(addTrialDialogData);
    }}>Submit</Button>
    </>
  );
}

interface TopBarProps {
  handleAddTrial: (addTrialDialogData: addTrialDialogData) => void
}
export function TopBar({handleAddTrial}: TopBarProps) {
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
        <AddIcon></AddIcon>
        </Button>
          <DialogSkeleton
          children={<AddTrialDialog handleAddTrial={handleAddTrial}></AddTrialDialog>}
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