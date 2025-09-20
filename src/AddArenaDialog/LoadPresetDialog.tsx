import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Preset, { PresetData } from './Preset.tsx';
import Button from '@mui/material/Button';
import {FactorData} from './Factor.tsx';

interface Props {
  handleClosePresetDialog: React.MouseEventHandler<HTMLButtonElement>,
  presetData: PresetData,
  presetOrder: (keyof PresetData)[],
  handleLoadPreset: (factorData: FactorData, factorOrder: (keyof FactorData)[]) => void,
  handleDeletePreset: (presetToBeDeleted: string) => React.MouseEventHandler<HTMLLIElement>
}
export const LoadPresetDialog: React.FC<Props> = ({handleClosePresetDialog, presetData, presetOrder, handleLoadPreset, handleDeletePreset}) => {

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    handleClosePresetDialog(e);
  }

  const handleClickPreset = (factorData: FactorData, factorOrder: (keyof FactorData)[]): React.MouseEventHandler<HTMLButtonElement> => (e) => { //Triggered by clicking a tab
    handleClosePresetDialog(e);
    handleLoadPreset(factorData, factorOrder);
  };



//key={`${presetTitle}-${index}`}
  return (
    <>
      <DialogTitle>Presets</DialogTitle>
      <Box
        sx={{
          height: '500px',
          width: '500px'
        }}>
          {presetOrder.map((presetTitle, index) => <Preset 
            title={presetTitle} 
            factorData={presetData[presetTitle].factorData} 
            factorOrder={presetData[presetTitle].factorOrder} 
            handleLoadPreset={handleClickPreset(presetData[presetTitle].factorData, presetData[presetTitle].factorOrder)} 
            handleDeletePreset={handleDeletePreset(presetTitle)}
            key={`${presetTitle}-${index}`}/>)}
        </Box>
    </>
  );
}

export default LoadPresetDialog;