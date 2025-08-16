import Button from "@mui/material/Button";
import { useState } from "react";
import Box from '@mui/system/Box';
import SubTrial from "./SubTrial.tsx";
import Typography from '@mui/material/Typography';


interface Props {
}

export const SubTrialDialog: React.FC<Props> = () => {



  return (
    <Box
    sx={{
    height: '200px',
    width: '600px',
    backgroundColor: '#66ccff'
    }}>
      <Typography>What're you looking at, FOO?</Typography>
    </Box>
  );
}

export default SubTrialDialog;