import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Preset, {PresetData} from './Preset.tsx';
import {FactorData} from './Factor.tsx';
import Factor from './Factor.tsx';

interface Props {
  factorData: FactorData,
  factorOrder: (keyof FactorData)[]
}
export const FactorListDialog: React.FC<Props> = ({factorData, factorOrder}) => {
  return (
    <>
    <Box
    sx={{
    height: '500px',
    width: '500px'
    }}></Box>
    {factorOrder.map((factorTitle, index) =>
      <Factor title={factorTitle} weight={factorData[factorTitle]} key={`${factorTitle}-${index}`}></Factor>
    )}
    </>
  );
}

export default FactorListDialog;