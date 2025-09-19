import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

interface Props {
  handleCloseSavePresetDialog: () => void,
  handleSavePreset: (presetName: string) => void
}
export const SavePresetDialog: React.FC<Props> = ({handleCloseSavePresetDialog, handleSavePreset}) => {
  const [presetName, setPresetName] = useState(""); //Value of input which changes on screen

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    e.stopPropagation();
    setPresetName(e.target.value);
  }


  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (presetName.length === 0) return;
    
    handleCloseSavePresetDialog();
    handleSavePreset(presetName);
  }

  return (
    <>
      <DialogTitle>Save Preset</DialogTitle>
      <Box
        sx={{
          height: '500px',
          width: '800px'
        }}>
        <TextField id="outlined-basic" label="Preset Name" variant="outlined" value={presetName} onChange={handleInput}
          sx={{
            paddingBottom: '10px'
          }}></TextField>
  
      <Button variant="contained" onClick={onButtonClick}>Submit</Button>
      </Box> 
    </>
  );
}

export default SavePresetDialog;