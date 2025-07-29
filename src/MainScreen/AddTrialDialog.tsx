import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const MAX_TRIAL_NAME_LENGTH = 17;

// I use the convention of type names being capitalized.
// Older TS convention includes starting interface names with an I (like IAddTrialDialogData)
export interface AddTrialDialogData {
  trialTitle: string,
  successString: string,
  failureString: string,
  additionalNotesString: string
}


interface Props {
  handleAddTrial: (addTrialDialogData: AddTrialDialogData) => void,
  handleClose: () => void
}

export const AddTrialDialog: React.FC<Props> = ({ handleAddTrial, handleClose }) => {
  const [valueTrialName, setValueTrialName] = useState("");
  const [valueSuccess, setValueSuccess] = useState("");
  const [valueFailure, setValueFailure] = useState("");
  const [valueAdditionalNotes, setValueAdditionalNotes] = useState("");

  const handleInputTrialName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < MAX_TRIAL_NAME_LENGTH) setValueTrialName(e.target.value);
  }

  const handleInputSuccess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSuccess(e.target.value);
  }

  const handleInputFailure = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueFailure(e.target.value);
  }

  // I always prefer to type the function itself rather than it's params, but it's definitely not wrong to do otherwise
  const handleInputAdditionalNotes: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValueAdditionalNotes(e.target.value);
  }

  const onSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    const newData = {
      trialTitle: valueTrialName,
      successString: valueSuccess,
      failureString: valueFailure,
      additionalNotesString: valueAdditionalNotes,
    }
    handleClose();
    handleAddTrial(newData);
  }

  // outlined-multiline-flexible multiline maxRows={4}
  return (
    <>
      <DialogTitle>Add New Arena</DialogTitle>


      {/* Input for trial's name */}
      <Typography>Trial name:</Typography>
      <TextField id="outlined-basic" variant="outlined" value={valueTrialName} onChange={handleInputTrialName}
        sx={{
          paddingBottom: '10px'
        }} />

      {/* What a success looks like */}
      <Typography>What a success looks like</Typography>
      <TextField id=" outlined-multiline-flexible" multiline rows={4} value={valueSuccess} onChange={handleInputSuccess} />

      {/* What a failure looks like */}
      <Typography>What a failure looks like</Typography>
      <TextField id=" outlined-multiline-flexible" multiline rows={4} value={valueFailure} onChange={handleInputFailure} />

      {/* Individual Factors \*/}
      <Typography>
        Individual Factors
        <Button>
          <AddIcon />
        </Button>
        <Button>
          <RemoveIcon />
        </Button>
      </Typography>
      <TextField id=" outlined-multiline-flexible" multiline rows={4} disabled />

      {/* Additional notes */}
      <Typography>Additional notes</Typography>
      <TextField id=" outlined-multiline-flexible" multiline rows={4} value={valueAdditionalNotes} onChange={handleInputAdditionalNotes} />

      {/* BOTTOM SUBMIT BUTTON */}
      <Button variant="contained" onClick={onSubmitClick}>Submit</Button>
    </>
  );
}

export default AddTrialDialog;