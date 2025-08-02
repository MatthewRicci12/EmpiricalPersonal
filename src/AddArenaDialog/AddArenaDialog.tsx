import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveIcon from '@mui/icons-material/Remove';
import { MAX_ARENA_NAME_LENGTH } from '../MainScreen/MainScreen';
import { useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import LoadPresetDialog from './LoadPresetDialog.tsx';

interface Props {
  handleAddArena: (tabName: string) => void,
  handleCloseArenaDialog: () => void
}
export const AddArenaDialog: React.FC<Props> = ({ handleAddArena, handleCloseArenaDialog }) => {
  const [open, setOpen] = useState(false); //dialog pop up or not
  const [value, setValue] = useState(""); //Value of input which changes on screen

  const handleOpenPresetDialog = () => { //Triggered by add Tab button
    setOpen(true);
  };

  const handleClosePresetDialog = () => { //Triggered by Dialog x
    setOpen(false);
  };


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    if (e.target.value.length < MAX_ARENA_NAME_LENGTH) setValue(e.target.value);
  }

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    
    handleCloseArenaDialog()
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

        <Button onClick={handleOpenPresetDialog}>Load Preset</Button>
        {/* Preset Dialog */}
        <DialogSkeleton
        open={open}
        onClose={handleClosePresetDialog}
        >
          <LoadPresetDialog
          handleClosePresetDialog={handleClosePresetDialog}
          ></LoadPresetDialog>
        </DialogSkeleton>



        <Button>
          <AddIcon />
        </Button>
        <Button>
          <RemoveIcon />
        </Button>
        {/* If an HTML or JSX tag doesn't have anything between the open and close tag, they can be self closing (the opening tag ends with />) */}
        <Box sx={{ width: '100%', height:'200px', outlineStyle: 'solid', outlineWidth: '1px', marginBottom: '2px'}}>
         Testing testing
        </Box>
        <Button variant="contained" onClick={onButtonClick}>Submit</Button>
      </Box>
    </>
  );
}

