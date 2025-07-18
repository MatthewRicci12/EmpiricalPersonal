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
import TopBar from './TopBar.tsx';

interface tabData {
  title: string,
  index: number
}

interface arenaScreenData {
  trialData: string[]
}

function MainScreen() {
  const [open, setOpen] = useState(false); //dialog pop up or not
  const [tabDataArray, setTabDataArray] = useState<tabData[]>([]); //visible tabs
  const [arenaScreenDataArray, setArenaScreenDataArray] = useState<arenaScreenData[]>([]); //STORED arenaScreenData. ref()
  const [whichArenaSelected, setWhichArenaSelected] = useState<number>(0); //WHICH arena shown/tab selected

  const handleClickOpen = () => { //Triggered by add Tab button
    setOpen(true);
  };

  const handleClose = () => { //Triggered by Dialog x
    setOpen(false);
  };

  const handleClickSubmit = (tabName: string) => { // Triggered by Dialog submit button
    setTabDataArray(tabDataArray.concat({title: tabName, index: tabDataArray.length}));
    setArenaScreenDataArray(arenaScreenDataArray.concat({trialData: []}))
  };

  const handleClickTab = (index: number) => { //Triggered by clicking a tab
    setWhichArenaSelected(index);
  };

  //TODO
  const handleAddTrial = (trialTitle: string) => {
    arenaScreenDataArray[whichArenaSelected]
  }

  const displayedArenaScreenData = arenaScreenDataArray[whichArenaSelected];
  const displayedArenaScreen = <ArenaScreen trialData={displayedArenaScreenData.trialData}></ArenaScreen>

  const tabs = tabDataArray.map(({title, index}) => <ArenaTab title={title} handleClickTab={handleClickTab} index={index}></ArenaTab>);

  return (
    <>
      <TopBar handleAddTrial={handleAddTrial}></TopBar>
      <Box 
      sx={{
        height: '90%',
        whiteSpace: 'pre'
      }}>

        {displayedArenaScreen}

      </Box>
      <Button
        sx={{}}
        onClick={handleClickOpen}
        >
        <AddIcon></AddIcon>
      </Button>

      <DialogSkeleton
      children={<AddArenaDialog handleClickSubmit={handleClickSubmit}/>}
      open={open}
      onClose={handleClose}
      >
      </DialogSkeleton>
      
      {tabs}
    </>
  );
}

interface AddArenaDialogProps {
  handleClickSubmit: (tabName: string) => void
}
function AddArenaDialog({handleClickSubmit} : AddArenaDialogProps) {
  const [value, setValue] = useState(""); //Value of input which changes on screen

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    setValue(e.target.value);
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
            <Button variant="contained" onClick={() => handleClickSubmit(value)}>Submit</Button>
        </Box>
    </>
  );
}



interface ArenaScreenProps {
  trialData: string[]
}
function ArenaScreen({trialData} : ArenaScreenProps) {

  const trials = trialData.map((title) =>
    <Trial trialTitle={title}></Trial>
  );

  return (
    <Stack spacing={2}>
      {trials}
    </Stack>

  );
}

interface ArenaTabProps {
  title: string,
  handleClickTab: (title: number) => void, //
  index: number // To be able to tell parent which index to change to
}
function ArenaTab ({title, handleClickTab, index}: ArenaTabProps) { // how 2 isDisplayed
  return (
      <Button
      sx={{}}
      onClick={() => handleClickTab(index)}
      >
        {title}
      </Button>
  );
}

export default MainScreen;