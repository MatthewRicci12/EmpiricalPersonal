import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Trial from './Trial.tsx';
import Stack from '@mui/material/Stack';
import DialogSkeleton from '../Dialogs.tsx';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveIcon from '@mui/icons-material/Remove';


interface AddArenaDialogProps {
}
function AddArenaDialog() {
  const [value, setValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const addArenaFormSubmit = () => {
    console.log(value);
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
            <Button>Save Preset</Button><Button>Load Preset</Button><Button><AddIcon></AddIcon></Button><Button><RemoveIcon></RemoveIcon></Button>
            <Box sx={{
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'gray',
                margin: '3px',
                height: '300px'
            }}>
            </Box>
            <Button variant="contained" onClick={addArenaFormSubmit}>Submit</Button>
        </Box>
    </>
  );
}

export interface arenaScreenData {
    index: number,
    trialDataArray: boolean[]
};


interface ArenaTabsProps {
  clickHandler: (index: number) => void,
  whichArenaSelected: number,
  data: arenaScreenData[],
  addTabHandler: () => void
}
function ArenaTabs({clickHandler, whichArenaSelected, data} : ArenaTabsProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const arenaScreensArray = data.map(({index, trialDataArray}) => 
    <ArenaScreen isDisplayed={index === whichArenaSelected} trialDataArray={trialDataArray}></ArenaScreen>
  );
  console.log(whichArenaSelected);
  console.log(data);

  const tabsArray = data.map(({index}) =>
    <ArenaTab clickHandler={clickHandler} index={index}></ArenaTab>
  );

  return (
    <>
      <Box 
      sx={{
        height: '90%',
        whiteSpace: 'pre'
      }}>
        {arenaScreensArray}

      </Box>
      <Button
        sx={{}}
        onClick={handleClickOpen}
        >
        <AddIcon></AddIcon>
      </Button>
      <DialogSkeleton
      children={<AddArenaDialog/>}
      open={open}
      onClose={handleClose}
      >
      </DialogSkeleton>
      {tabsArray}
    </>
  );
}


interface ArenaScreenProps {
  isDisplayed: Boolean,
  trialDataArray: boolean[]
}
function ArenaScreen({isDisplayed, trialDataArray} : ArenaScreenProps) {

  const trials = trialDataArray.map((success) =>
    <Trial success={success}></Trial>
  );

  return (
    <Stack spacing={2} 
    sx={{
      display: isDisplayed ? 'block' : 'none'
    }}>
      {trials}
    </Stack>

  );
}

interface ArenaTabProps {
  clickHandler: (index: number) => void,
  index: number
}
function ArenaTab ({clickHandler, index}: ArenaTabProps) { // how 2 isDisplayed
  return (
      <Button
      sx={{}}
      onClick={() => clickHandler(index)}
      >
        {`Tab ${index+1}`}
      </Button>
  );
}

export default ArenaTabs;