import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import { useState } from "react";
import { AddArenaDialog } from '../AddArenaDialog/AddArenaDialog.tsx';
import { ArenaScreen } from './ArenaScreen/ArenaScreen.tsx';
import { ArenaTab } from './ArenaTab.tsx';
import { AddTrialDialogData } from './AddTrialDialog.tsx';
import TopBar from './TopBar.tsx';
import ConclusionScreen from './ConclusionScreen.tsx';
import { Result } from './Trial/SubTrial.tsx';
import React from 'react';

export const MAX_ARENA_NAME_LENGTH = 32;

export type SubTrialData = Record<string, [Result, string, string]>;
export type TrialData = Record<string, AddTrialDialogData>
export type ArenaData = Record<string, TrialData>


interface Props {

}
const MainScreen: React.FC<Props> = () => {

  const [openAddArenaDialog, setOpenAddArenaDialog] = useState(false); //dialog pop up or not
  const [arenaOrder, setarenaOrder] = useState<(keyof ArenaData)[]>([]); //visible tabs
  const [whichArenaSelected, setWhichArenaSelected] = useState<keyof ArenaData>(""); //WHICH arena shown/tab selected
  const [displayConclusionsPage, setDisplayConclusionsPage] = useState<boolean>(false);
  const [arenaData, setArenaData] = useState<ArenaData>({});
  const [trialData, setTrialData] = useState<TrialData>({});
  const [trialOrder, setTrialOrder] = useState<(keyof TrialData)[]>([]);
  const [whichTrialSelected, setTrialSelected] = useState<keyof TrialData>("");

  const handleOpenArenaDialog = () => { //Triggered by add Tab button
    setOpenAddArenaDialog(true);
  };

  const handleCloseArenaDialog = () => { //Triggered by Dialog x
    setOpenAddArenaDialog(false);
  };

  const handleAddArena = (tabName: string) => { // Triggered by Dialog submit button
    setarenaOrder([...arenaOrder, tabName]);
    if (tabName in arenaData) {
      console.error("Tab with that name already exists! (Some kind of UUID should be used as keys if that's supposed to be allowed.)")
      return;
    }
    const newArenaData = {
      ...arenaData,
      [tabName]: arenaData[tabName] || {}, // avoid overwriting when it already exists - if arenaData[tabName] is null, this assigns {}
    }
    setArenaData(newArenaData)
  };

  const handleClickTab = (title: string): React.MouseEventHandler<HTMLButtonElement> => (e) => { //Triggered by clicking a tab
    e.stopPropagation()
    setWhichArenaSelected(title);
  };

  const handleAddTrial = (addTrialDialogData: AddTrialDialogData) => { //Triggered by trial add button
    // Can't add trial if no arena selected.

    const trialTitle = addTrialDialogData.trialTitle;

    setTrialOrder([...trialOrder, trialTitle]);

    const newTrialData = {
      ...arenaData[whichArenaSelected],
      [trialTitle]: addTrialDialogData
    }


    setTrialData(newTrialData);

    const newArenaData = {
      ...arenaData,
      [whichArenaSelected]: newTrialData,
    }

    setArenaData(newArenaData);
  }

  const handleOpenConclusionsPage = () => { //Triggered by Dialog x
    setDisplayConclusionsPage(true);
  };


  const handleClickBackButton = () => { //Triggered by Dialog x
    setDisplayConclusionsPage(false);
  };

  const handleAddSubTrial = (trialTitle: string, key: string, result: Result, date: string, data: string) => {
      let trialData = arenaData[whichArenaSelected];
      let trialInnerData = trialData[trialTitle];
      
      trialInnerData.subTrialData = {...trialInnerData.subTrialData, [key] : [result, date, data]};
      trialInnerData.subTrialOrder = [...trialInnerData.subTrialOrder, key]

      const newArenaData = {
        ...arenaData,
        [whichArenaSelected]: trialData
      }
      
      setArenaData(newArenaData);
  }

  const handleRemoveTrial: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setTrialOrder(trialOrder.filter(trialTitle => trialTitle != whichTrialSelected));
    const { [whichTrialSelected]: _, ...newTrialData} = trialData;
    setTrialData(newTrialData);
  }

  const handleClickTrial = (title: string): React.MouseEventHandler<HTMLDivElement> => (e) => {
    e.stopPropagation();
    whichTrialSelected === title ? setTrialSelected("") : setTrialSelected(title);
  }

  const curTrialData = arenaData[whichArenaSelected] ?? {}

  return (
    !displayConclusionsPage ?
    <>
     <TopBar handleAddTrial={handleAddTrial} 
     handleOpenConclusionsPage={handleOpenConclusionsPage} 
     handleRemoveTrial={handleRemoveTrial}
     whichArenaSelected={whichArenaSelected}/>
      <Box
        sx={{
          height: '90%',
          whiteSpace: 'pre'
        }}>
        <ArenaScreen trialData={curTrialData} trialOrder={trialOrder} key={whichArenaSelected} handleAddSubTrial={handleAddSubTrial}
          whichTrialSelected={whichTrialSelected} handleClickTrial={handleClickTrial}/>
      </Box>

      {/* Button to add a new Arena */}
      <Button
        onClick={handleOpenArenaDialog}>
        <AddIcon />
      </Button>
      <DialogSkeleton
        open={openAddArenaDialog}
        onClose={handleCloseArenaDialog}
      >
        <AddArenaDialog handleAddArena={handleAddArena} handleCloseArenaDialog={handleCloseArenaDialog} />
      </DialogSkeleton>

      {arenaOrder.map((title, index) =>
        <ArenaTab title={title} handleClickTab={handleClickTab(title)} selected={title === whichArenaSelected} key={`${title}-${index}`} />)}
    </>
    :
    <ConclusionScreen 
    handleClickBackButton={handleClickBackButton} 
    trialData={curTrialData}/>
  );
}


export default MainScreen;