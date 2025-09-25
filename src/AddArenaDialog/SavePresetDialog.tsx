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
  const [presetName, setPresetName] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setPresetName(e.target.value);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (presetName.length === 0) return;
    
    handleCloseSavePresetDialog();
    handleSavePreset(presetName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log("You pressed Enter!");
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <>
      <DialogTitle>Save Preset</DialogTitle>

      <Box
        sx={{
          height: '500px',
          width: '800px'}}
        onKeyDown={handleKeyPress}>

        <TextField 
        id="outlined-basic" 
        label="Preset Name" 
        variant="outlined" 
        value={presetName} 
        onChange={handleInput}
        sx={{
          paddingBottom: '10px'}}>
        </TextField>
  
      <Button variant="contained" onClick={onButtonClick}>Submit</Button>

      </Box> 
    </>
  );
}

export default SavePresetDialog;