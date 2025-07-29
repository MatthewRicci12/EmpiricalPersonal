import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveIcon from '@mui/icons-material/Remove';
import { MAX_ARENA_NAME_LENGTH } from './MainScreen';
import { useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  handleAddArena: (tabName: string) => void,
  handleClose: () => void
}
export const AddArenaDialog: React.FC<Props> = ({ handleAddArena, handleClose }) => {
  const [value, setValue] = useState(""); //Value of input which changes on screen

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    if (e.target.value.length < MAX_ARENA_NAME_LENGTH) setValue(e.target.value);
  }

  // I prefer not declaring event handlers inline in the JSX if it includes 2 function calls like this one does
  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // this is often needed for button handlers in browser, to the point where I included it in every event handler
    e.stopPropagation()
    
    handleClose()
    handleAddArena(value)
  }

  return (
    <>
      <DialogTitle>Add New Arena</DialogTitle>
      <Box
        sx={{
          height: '500px',
          width: '500px'
        }}>
        <TextField id="outlined-basic" label="Arena Title" variant="outlined" value={value} onChange={handleInput}
          sx={{
            paddingBottom: '10px'
          }}></TextField>
        <Typography sx={{
          fontSize: "1.5em"
        }}>
          Factors
        </Typography>
        {/* Much easier to read when things are not on the same line*/}
        <Button>Save Preset</Button>
        <Button>Load Preset</Button>
        <Button>
          <AddIcon />
        </Button>
        <Button>
          <RemoveIcon />
        </Button>
        {/* If an HTML or JSX tag doesn't have anything between the open and close tag, they can be self closing (the opening tag ends with />) */}
        <TextField id=" outlined-multiline-flexible" multiline rows={4} disabled sx={{ width: '100%' }} />
        <Button variant="contained" onClick={onButtonClick}>Submit</Button>
      </Box>
    </>
  );
}

