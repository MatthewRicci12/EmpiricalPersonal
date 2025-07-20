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
import { addTrialDialogData }  from './TopBar.tsx';


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

  const handleAddArena = (tabName: string) => { // Triggered by Dialog submit button
    setTabDataArray(tabDataArray.concat({title: tabName, index: tabDataArray.length}));
    setArenaScreenDataArray(arenaScreenDataArray.concat({trialData: []}));
    setOpen(false);
  };

  const handleClickTab = (index: number) => { //Triggered by clicking a tab
    setWhichArenaSelected(index);
  };

  const handleAddTrial = (addTrialDialogData: addTrialDialogData) => {
    if (arenaScreenDataArray.length == 0) return;

    console.log(addTrialDialogData.successString);
    console.log(addTrialDialogData.failureString);
    console.log(addTrialDialogData.additionalNotesString);

    const trialTitle = addTrialDialogData.trialTitle;
    let arenaScreenDataArrayCopied = [...arenaScreenDataArray]; //new ram
    arenaScreenDataArrayCopied[whichArenaSelected].trialData = 
    arenaScreenDataArrayCopied[whichArenaSelected].trialData.concat(trialTitle);
    setArenaScreenDataArray(arenaScreenDataArrayCopied);
    setOpen(false);
  }

  let displayedArenaScreenData = arenaScreenDataArray[whichArenaSelected];
  const displayedArenaScreen = arenaScreenDataArray.length ? 
    <ArenaScreen trialData={displayedArenaScreenData.trialData}></ArenaScreen> : <></>;

  const tabs = tabDataArray.map(({title, index}) => 
    <ArenaTab title={title} handleClickTab={handleClickTab} index={index}></ArenaTab>);

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
      children={<AddArenaDialog handleAddArena={handleAddArena}/>}
      open={open}
      onClose={handleClose}
      >
      </DialogSkeleton>
      
      {tabs}
    </>
  );
}

interface AddArenaDialogProps {
  handleAddArena: (tabName: string) => void
}
function AddArenaDialog({handleAddArena} : AddArenaDialogProps) {
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
            <TextField id=" outlined-multiline-flexible" multiline rows={4} disabled sx={{width: '100%'}}></TextField>
            <Button variant="contained" onClick={() => handleAddArena(value)}>Submit</Button>
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