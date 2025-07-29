import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogSkeleton from '../Dialogs/Dialogs.tsx';
import { useState } from "react";
import { AddArenaDialog } from './AddArenaDialog.tsx';
import { ArenaScreen } from './ArenaScreen.tsx';
import { ArenaTab } from './ArenaTab.tsx';
import { AddTrialDialogData } from './AddTrialDialog.tsx';

export const MAX_ARENA_NAME_LENGTH = 9;

export type TrialData = Record<string, AddTrialDialogData>
export type ArenaData = Record<string, TrialData>

// I generally have this in every component, even if there are no props
interface Props {

}

const MainScreen: React.FC<Props> = () => {
  const [open, setOpen] = useState(false); //dialog pop up or not
  const [tabOrder, setTabOrder] = useState<string[]>([]); //visible tabs
  const [whichArenaSelected, setWhichArenaSelected] = useState<string>(""); //WHICH arena shown/tab selected

  // I would handle the state like this.
  // With data being stored in an Object (called Maps in most languages), since that's easy to access
  // Order would be stored in a separate array of the keys
  const [arenaData, arenaDataSet] = useState<ArenaData>({})

  const handleClickOpen = () => { //Triggered by add Tab button
    setOpen(true);
  };

  const handleClose = () => { //Triggered by Dialog x
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
      [tabName]: arenaData[tabName] || {},
    }
    arenaDataSet(newArenaData)
  };

  /**
   * This is a common technique in functional programming, called "higher order functions".
   * Functions that return functions is a useful tool.
   * It often means you don't have to pass as much context down
   * In this case it means that the ArenaTab wouldn't need to know it's own title for the handler to work properly
   */
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
        <ArenaScreen trialData={trialData} key={whichArenaSelected} handleAddTrial={handleAddTrial} />;
      </Box>
      <Button
        sx={{}}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Button>

      <DialogSkeleton
        open={open}
        onClose={handleClose}
      >
        {/* "children"  as a prop refers to anything that shows up between the opening and close tag */}
        <AddArenaDialog handleAddArena={handleAddArena} handleClose={handleClose} />
      </DialogSkeleton>

      {tabOrder.map((title, index) =>
        <ArenaTab title={title} handleClickTab={handleClickTab(title)} selected={title === whichArenaSelected} key={`${title}-${index}`} />)}
    </>
  );
}


export default MainScreen;