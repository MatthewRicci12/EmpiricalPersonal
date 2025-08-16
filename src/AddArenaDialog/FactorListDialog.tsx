import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {FactorData} from './Factor.tsx';

interface Props {
  factorData: FactorData,
  factorOrder: (keyof FactorData)[]
}
export const FactorListDialog: React.FC<Props> = ({factorData, factorOrder}) => {
  return (
    <Box
    sx={{
    height: '500px',
    width: '500px'
    }}>
    {factorOrder.map((factorTitle) =>
      <Typography>{`${factorTitle} ${factorData[factorTitle]}`}</Typography>
    )}
    </Box>
  );
}

export default FactorListDialog;