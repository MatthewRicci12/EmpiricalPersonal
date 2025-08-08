import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Preset, { PresetData } from './Preset.tsx';
import Button from '@mui/material/Button';
import {FactorData} from './Factor.tsx';

interface Props {
  handleClosePresetDialog: () => void,
  presetData: PresetData,
  presetOrder: (keyof PresetData)[]
}
export const LoadPresetDialog: React.FC<Props> = ({handleClosePresetDialog, presetData, presetOrder}) => {

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    handleClosePresetDialog();
  }
//key={`${presetTitle}-${index}`}
  return (
    <>
      <DialogTitle>Presets</DialogTitle>
      <Box
        sx={{
          height: '500px',
          width: '500px'
        }}>
          {presetOrder.map((presetTitle, index) => <Preset title={presetTitle} factorData={presetData[presetTitle].factorData} 
            factorOrder={presetData[presetTitle].factorOrder} key={`${presetTitle}-${index}`}/>)}
        </Box>
    </>
  );
}

export default LoadPresetDialog;