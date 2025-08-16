import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import { useState } from "react";
import { AddArenaDialog } from '../AddArenaDialog/AddArenaDialog.tsx';
import { ArenaScreen } from './ArenaScreen/ArenaScreen.tsx';
import { ArenaTab } from './ArenaTab.tsx';
import { AddTrialDialogData } from './AddTrialDialog.tsx';

export const MAX_ARENA_NAME_LENGTH = 32;

export type TrialData = Record<string, AddTrialDialogData>
export type ArenaData = Record<string, TrialData>

interface Props {

}
const MainScreen: React.FC<Props> = () => {
  const [open, setOpen] = useState(false); //dialog pop up or not
  const [tabOrder, setTabOrder] = useState<(keyof ArenaData)[]>([]); //visible tabs
  const [whichArenaSelected, setWhichArenaSelected] = useState<keyof ArenaData>(""); //WHICH arena shown/tab selected

  const [arenaData, arenaDataSet] = useState<ArenaData>({})

  const handleOpenArenaDialog = () => { //Triggered by add Tab button
    setOpen(true);
  };

  const handleCloseArenaDialog = () => { //Triggered by Dialog x
    setOpen(false);
  };

  const handleAddArena = (tabName: string) => { // Triggered by Dialog submit button
    setTabOrder([...tabOrder, tabName]);
    if (tabName in arenaData) {
      console.error("Tab with that name already exists! (Some kind of UUID should be used as keys if that's supposed ot be allowed.)")
      return;
    }
    const newArenaData = {
      ...arenaData,
      [tabName]: arenaData[tabName] || {}, // avoid overwriting when it already exists - if arenaData[tabName] is null, this assigns {}
    }
    arenaDataSet(newArenaData)
  };

  const handleClickTab = (title: string): React.MouseEventHandler<HTMLButtonElement> => (e) => { //Triggered by clicking a tab
    e.stopPropagation()
    setWhichArenaSelected(title);
  };

  const handleAddTrial = (addTrialDialogData: AddTrialDialogData) => { //Triggered by trial add button
    const trialTitle = addTrialDialogData.trialTitle;

    const newTrialData = {
        ...arenaData[whichArenaSelected],
        [trialTitle]: addTrialDialogData,
      }

    const newArenaData = {
      ...arenaData,
      [whichArenaSelected]: newTrialData,
    }
    arenaDataSet(newArenaData)
  }
  const trialData = arenaData[whichArenaSelected] ?? {}
  
  return (
    <>
      <Box
        sx={{
          height: '90%',
          whiteSpace: 'pre'
        }}>
        <ArenaScreen trialData={trialData} key={whichArenaSelected} handleAddTrial={handleAddTrial} />
      </Box>

      {/* Button to add a new Arena */}
      <Button
        sx={{}}
        onClick={handleOpenArenaDialog}>
        <AddIcon />
      </Button>
      <DialogSkeleton
        open={open}
        onClose={handleCloseArenaDialog}
      >
        <AddArenaDialog handleAddArena={handleAddArena} handleCloseArenaDialog={handleCloseArenaDialog} />
      </DialogSkeleton>

      {tabOrder.map((title, index) =>
        <ArenaTab title={title} handleClickTab={handleClickTab(title)} selected={title === whichArenaSelected} key={`${title}-${index}`} />)}
    </>
  );
}


export default MainScreen;