import Button from "@mui/material/Button";
import { useState } from "react";
import Box from '@mui/system/Box';
import SubTrial, {SubTrialData} from "./SubTrial.tsx";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface Props {
    handleCloseAddSubTrialDialog: () => void,
    handleAddSubTrial: (key: string, date: string, data: string) => void
}

export const AddSubTrialDialog: React.FC<Props> = ({handleCloseAddSubTrialDialog, handleAddSubTrial}) => {

  const [subTrialData, setSubTrialData] = useState(""); //Value of input which changes on screen
  const [subTrialDate, setSubTrialDate] = useState<Dayjs | null>(dayjs('')); //Value of input which changes on screen

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    e.stopPropagation();
    setSubTrialData(e.target.value);
  }

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    handleCloseAddSubTrialDialog();
    if (subTrialDate !== null) {
      handleAddSubTrial(uuidv4(), subTrialDate!.format('DD/MM/YYYY'), subTrialData);
    }

  }

  return (
    <Box
    sx={{
        height: '500px',
        width: '500px'
    }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker 
    label={"Pick date"}
    value={subTrialDate}
    onChange={(newDate) => setSubTrialDate(newDate)}
    />
    </LocalizationProvider>
    <TextField id="outlined-basic" label="Data" variant="outlined" value={subTrialData} onChange={handleInput}
    sx={{
    paddingBottom: '20px'
    }}></TextField>
    <Button variant="contained" onClick={onButtonClick}>Submit</Button>
    </Box>
  );
}

export default AddSubTrialDialog;