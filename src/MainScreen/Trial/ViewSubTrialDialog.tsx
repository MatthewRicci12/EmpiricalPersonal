import Button from "@mui/material/Button";
import { useState } from "react";
import Box from '@mui/system/Box';
import SubTrial, {SubTrialData} from "./SubTrial.tsx";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";


interface Props {
    date: string,
    data: string
}

export const ViewSubTrialDialog: React.FC<Props> = ({date, data}) => {

  return (
    <Box
    sx={{
        height: '500px',
        width: '500px'
    }}>
        <Typography>Date done: {date}</Typography>
        <Typography>Data:</Typography>
        <Box>
            {data}
        </Box>
        
    </Box>
  );
}

export default ViewSubTrialDialog;