import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Preset, { PresetData } from './Preset.tsx';
import Button from '@mui/material/Button';
import {FactorData} from './Factor.tsx';

interface Props {
  handleClosePresetDialog: () => void
}
export const LoadPresetDialog: React.FC<Props> = ({handleClosePresetDialog}) => {
  const [presetData, setPresetData] = useState<PresetData>({});
  const [presetOrder, setPresetOrder] = useState<(keyof PresetData)[]>([]); //visible tabs

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
          {presetOrder.map((presetTitle) => <Preset title={presetTitle}/>)}
        </Box>
    </>
  );
}

export default LoadPresetDialog;