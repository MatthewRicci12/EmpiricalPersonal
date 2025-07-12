import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Trial from './Trial.tsx';
import Stack from '@mui/material/Stack';
import AddArenaDialog from '../Dialogs.tsx';
import { useState } from "react";

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
      <AddArenaDialog 
      open={open}
      onClose={handleClose}
      >
      </AddArenaDialog>
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