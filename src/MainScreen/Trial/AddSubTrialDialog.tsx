import Button from "@mui/material/Button";
import { useState } from "react";
import Box from '@mui/system/Box';
import SubTrial, {SubTrialData} from "./SubTrial.tsx";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";


interface Props {
    handleCloseAddSubTrialDialog: () => void,
    handleAddSubTrial: (subTrialTitle: string) => void
}

export const AddSubTrialDialog: React.FC<Props> = ({handleCloseAddSubTrialDialog, handleAddSubTrial}) => {

  const [subTrialTitle, setSubTrialTitle] = useState(""); //Value of input which changes on screen

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    e.stopPropagation();
    setSubTrialTitle(e.target.value);
  }

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    handleCloseAddSubTrialDialog();
    handleAddSubTrial(subTrialTitle);
  }

  return (
    <Box
    sx={{
        height: '500px',
        width: '500px'
    }}>
    <TextField id="outlined-basic" label="Subtrial Title" variant="outlined" value={subTrialTitle} onChange={handleInput}
    sx={{
    paddingBottom: '20px'
    }}></TextField>
    <Button variant="contained" onClick={onButtonClick}>Submit</Button>
    </Box>
  );
}

export default AddSubTrialDialog;