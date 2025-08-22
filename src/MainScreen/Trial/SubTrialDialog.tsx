import Button from "@mui/material/Button";
import { useState } from "react";
import Box from '@mui/system/Box';
import SubTrial, {SubTrialData} from "./SubTrial.tsx";
import Typography from '@mui/material/Typography';


interface Props {
  subTrialData: SubTrialData, 
  subTrialOrder: (keyof SubTrialData)[]
}

export const SubTrialDialog: React.FC<Props> = ({subTrialData, subTrialOrder}) => {

  const x = subTrialData;
  const y = subTrialOrder;

  return (
    <Box
    sx={{
    height: '200px',
    width: '600px',
    backgroundColor: '#66ccff'
    }}>
      {subTrialOrder?.map( (subTrialTitle) => <SubTrial title={subTrialTitle}/>)}

    </Box>
  );
}

export default SubTrialDialog;