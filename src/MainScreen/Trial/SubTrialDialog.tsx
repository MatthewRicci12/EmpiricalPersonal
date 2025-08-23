import Button from "@mui/material/Button";
import { useState } from "react";
import Box from '@mui/system/Box';
import SubTrial, {SubTrialData} from "./SubTrial.tsx";
import Typography from '@mui/material/Typography';

const DATE_INDEX = 0;
const DATA_INDEX = 1;

interface Props {
  subTrialData: SubTrialData, 
  subTrialOrder: (keyof SubTrialData)[]
}

export const SubTrialDialog: React.FC<Props> = ({subTrialData, subTrialOrder}) => {
  return (
    <Box
    sx={{
    height: '200px',
    width: '600px',
    backgroundColor: '#66ccff'
    }}>
      {subTrialOrder?.map( (subTrialKey) => <SubTrial 
      date={subTrialData[subTrialKey][DATE_INDEX]} 
      data={subTrialData[subTrialKey][DATA_INDEX]}
      key={subTrialKey}/>)}

    </Box>
  );
}

export default SubTrialDialog;