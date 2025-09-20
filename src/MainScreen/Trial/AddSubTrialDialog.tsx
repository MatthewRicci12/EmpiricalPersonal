import Button from "@mui/material/Button";
import { useState } from "react";
import Box from '@mui/system/Box';
import {Result} from "./SubTrial.tsx";
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styles } from "./styles";
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


const selectedEffect = {boxShadow: "0px 0px 20px 5px #0ff"}

interface Props {
    trialTitle: string,
    handleCloseAddSubTrialDialog: React.MouseEventHandler<HTMLButtonElement>,
    handleAddSubTrial: (trialTitle: string, key: string, result: Result, date: string, data: string) => void
}

export const AddSubTrialDialog: React.FC<Props> = ({trialTitle, handleCloseAddSubTrialDialog, handleAddSubTrial}) => {

  const [subTrialData, setSubTrialData] = useState(""); //Value of input which changes on screen
  const [subTrialDate, setSubTrialDate] = useState<Dayjs | null>(dayjs('')); //Value of input which changes on screen
  const [result, setResult] = useState<Result>(Result.SUCCESS);
  const [resultHasBeenSelected, setResultHasBeenSelected] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    e.stopPropagation();
    setSubTrialData(e.target.value);
  }

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    handleCloseAddSubTrialDialog(e);
    if (subTrialDate !== null) {
      handleAddSubTrial(trialTitle, uuidv4(), result, subTrialDate!.format('MM/DD/YYYY'), subTrialData);
    }

  }

  // Subroutine 
  const handleClickResult = (success: Result) => {
    setResult(success);
    setResultHasBeenSelected(true);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log(`You pressed: ${e.key}`);
    if (e.key === 'Enter') {
      console.log("You pressed Enter!");
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  }

  return (
    <Box
    sx={{
        height: '500px',
        width: '500px'
    }}
    onKeyDown={handleKeyPress}>

    <Typography display="inline">Result: </Typography>
    <styles.SubTrialSuccess onClick={(e) => {e.stopPropagation(); handleClickResult(Result.SUCCESS)}} sx={resultHasBeenSelected && result === Result.SUCCESS ? selectedEffect : {}}>
      <CheckIcon/>
    </styles.SubTrialSuccess>
    <styles.SubTrialFailure onClick={(e) => {e.stopPropagation(); ; handleClickResult(Result.FAILURE)}} sx={resultHasBeenSelected && result === Result.FAILURE ? selectedEffect : {}}>
      <CloseIcon/>
    </styles.SubTrialFailure>

    <br/>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker 
    label={"Pick date"}
    value={subTrialDate}
    onChange={(newDate) => setSubTrialDate(newDate)}
    />
    </LocalizationProvider>
    <br/>
    <TextField id="outlined-basic" label="Data" variant="outlined" value={subTrialData} onChange={handleInput}
    sx={{
    paddingBottom: '20px'
    }}></TextField>
    <br/>
    <Button variant="contained" onClick={onButtonClick}>Submit</Button>
    </Box>
  );
}

export default AddSubTrialDialog;