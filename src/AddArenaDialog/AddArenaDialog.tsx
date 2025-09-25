import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveIcon from '@mui/icons-material/Remove';
import { MAX_ARENA_NAME_LENGTH } from '../MainScreen/MainScreen.tsx';
import { useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import LoadPresetDialog from './LoadPresetDialog.tsx';
import FactorDialog from './FactorDialog.tsx';
import { FactorData } from './Factor.tsx';
import { PresetData } from './Preset.tsx';
import SavePresetDialog from './SavePresetDialog.tsx';
import Factor from './Factor.tsx';

interface Props {
  handleAddArena: (tabName: string) => void,
  handleCloseArenaDialog: React.MouseEventHandler<HTMLButtonElement>,
  handleEditArena: (newName: string) =>  void
  edit: boolean
}
export const AddArenaDialog: React.FC<Props> = ({ handleAddArena, handleCloseArenaDialog, handleEditArena, edit }) => {
  const [openFactorDialog, setOpenFactorDialog] = useState(false);
  const [editFactorDialog, setEditFactorDialog] = useState(false);

  const [openPresetDialog, setOpenPresetDialog] = useState(false);

  const [openSavePresetDialog, setOpenSavePresetDialog] = useState(false);

  const [arenaTitleValue, setArenaTitleValue] = useState("");

  const [whichFactorSelected, setWhichFactorSelected] = useState<(keyof FactorData)>("");

  const [factorData, setFactorData] = useState<FactorData>({});
  const [factorOrder, setFactorOrder] = useState<(keyof FactorData)[]>([]);

<<<<<<< HEAD
<<<<<<< Updated upstream
  const handleOpenPresetDialog = () => { //Triggered by add Tab button
=======
  const [presetData, setPresetData] = useState<PresetData>({});
  const [presetOrder, setPresetOrder] = useState<(keyof PresetData)[]>([]);

  const handleDeletePreset = (presetToBeDeleted: string): React.MouseEventHandler<HTMLLIElement> => (e) => {
    e.stopPropagation();

    setPresetOrder(presetOrder.filter(presetName => presetName != presetToBeDeleted));

    const { [presetToBeDeleted]: _, ...newPresetData } = presetData;

    setPresetData(newPresetData);
  };

  const handleOpenPresetDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => { 
    e.stopPropagation();
>>>>>>> Stashed changes
=======

  const handleOpenPresetDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => { 
    e.stopPropagation();
>>>>>>> refs/remotes/origin/main
    setOpenPresetDialog(true);
  };

  const handleClosePresetDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpenPresetDialog(false);
  };

<<<<<<< HEAD
<<<<<<< Updated upstream
  const handleOpenFactorDialog = () => { //Triggered by Dialog x
=======
  const handleOpenFactorDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
>>>>>>> Stashed changes
=======
  const handleOpenFactorDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => { //Triggered by Dialog x
    e.stopPropagation();
>>>>>>> refs/remotes/origin/main
    setEditFactorDialog(false);
    setOpenFactorDialog(true);
  };

<<<<<<< HEAD
<<<<<<< Updated upstream
=======
  // Subroutine of FactorDialog
>>>>>>> refs/remotes/origin/main
  const handleCloseFactorDialog = () => { //Triggered by Dialog x
    setOpenFactorDialog(false);
  };

  const handleOpenSavePresetDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => {  //Triggered by Dialog x
    setOpenSavePresetDialog(true);
  };

  // Subroutine of SavePresetDialog
  const handleCloseSavePresetDialog = () => { //Triggered by Dialog x
=======
  // Subroutine of FactorDialog
  const handleCloseFactorDialog = () => {
    setOpenFactorDialog(false);
  };

  const handleOpenSavePresetDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setOpenSavePresetDialog(true);
  };

  // Subroutine of SavePresetDialog
  const handleCloseSavePresetDialog = () => {
>>>>>>> Stashed changes
    setOpenSavePresetDialog(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.value.length < MAX_ARENA_NAME_LENGTH) setArenaTitleValue(e.target.value);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
<<<<<<< HEAD
<<<<<<< Updated upstream
    e.stopPropagation()
=======
>>>>>>> refs/remotes/origin/main
    if (value.length === 0) return;

    if (edit) {
      handleCloseArenaDialog(e);
      handleEditArena(value);
    } else {
      handleCloseArenaDialog(e);
      handleAddArena(value);
    }
    
    
=======
    if (arenaTitleValue.length === 0) return;

    if (edit) {
>>>>>>> Stashed changes

      handleCloseArenaDialog(e);
      handleEditArena(arenaTitleValue);

    } else {

      handleCloseArenaDialog(e);
      handleAddArena(arenaTitleValue);

    }
  };

  const handleClickFactor = (factorName: string): React.MouseEventHandler<HTMLDivElement> => (e) => { //Triggered by clicking a tab
    e.stopPropagation()
    whichFactorSelected === factorName ? setWhichFactorSelected("") : setWhichFactorSelected(factorName);
  };

<<<<<<< Updated upstream

<<<<<<< HEAD
=======
  // Subroutine
>>>>>>> Stashed changes
=======
  // SUbroutine
>>>>>>> refs/remotes/origin/main
  const handleAddFactor = (factorName: string, weight: number) => {
    if (factorName in factorOrder) {
      console.error("Factor already exists.")
      return;
    }

    setFactorOrder([...factorOrder, factorName]);

    const newFactorData = {
      ...factorData,
      [factorName]: weight,
    }
    setFactorData(newFactorData);
    console.log(`handleAddFactor: ${newFactorData[factorName]}`);
  };

<<<<<<< HEAD
<<<<<<< Updated upstream
=======
  }

  // Subroutine
>>>>>>> refs/remotes/origin/main
  const handleEditFactor = (factorName: string, newWeight: number) => {  //Triggered by clicking a tab
=======
  // Subroutine
  const handleEditFactor = (factorName: string, newWeight: number) => {
>>>>>>> Stashed changes
    const newFactorData = {
      ...factorData,
      [factorName]: newWeight
    }

    setFactorData(newFactorData);
    setWhichFactorSelected("");
  };

  const handleClickWeight = (factorName: string): React.MouseEventHandler<HTMLButtonElement> => (e) => {   //Triggered by clicking a tab
      e.stopPropagation();
      whichFactorSelected === factorName ? setWhichFactorSelected("") : setWhichFactorSelected(factorName);
      setEditFactorDialog(true);
      setOpenFactorDialog(true);
  }

  const handleRemoveFactor: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setFactorOrder(factorOrder.filter(presetName => presetName != whichFactorSelected));
    const { [whichFactorSelected]: _, ...newFactorData} = factorData;
    setFactorData(newFactorData);
  }

  const handleSavePreset = (presetName: string) => {
    setPresetOrder([...presetOrder, presetName]);

    if (presetName in presetOrder) {
      console.error("Preset with that name already exists!")
      return;
    }

    const newPresetData = {
      ...presetData,
      [presetName]: {factorData: factorData, factorOrder: factorOrder}
    }
    setPresetData(newPresetData);
  }

<<<<<<< HEAD
<<<<<<< Updated upstream
=======
  // Subroutine of LoadPresetDialog
>>>>>>> Stashed changes
=======

  // Subroutine of LoadPresetDialog
>>>>>>> refs/remotes/origin/main
  const handleLoadPreset = (factorData: FactorData, factorOrder: (keyof FactorData)[]) => {
    setFactorData(factorData);
    setFactorOrder(factorOrder);
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log(`You pressed: ${e.key}`);

    if (e.key === 'Enter') {
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  }

  return (
    <>
      <DialogTitle>{edit ? "Edit" : "Add"} Arena</DialogTitle>
      <Box
        sx={{
          height: '500px',
          width: '500px'}}
        onKeyDown={handleKeyPress}>
          <TextField 
          id="outlined-basic" 
          label="Arena Title" 
          variant="outlined" 
          value={arenaTitleValue} 
          onChange={handleInput}
          sx={{paddingBottom: '10px'}}>
          </TextField>

        <Typography sx={{fontSize: "1.5em"}}>
          Factors
        </Typography>

        {/* Save Preset Button*/}
        <Button onClick={handleOpenSavePresetDialog}>Save Preset</Button>

        <DialogSkeleton
        open={openSavePresetDialog}
        onClose={handleCloseSavePresetDialog}>
          <SavePresetDialog
          handleCloseSavePresetDialog={handleCloseSavePresetDialog}
          handleSavePreset={handleSavePreset}>
          </SavePresetDialog>
        </DialogSkeleton>

        {/* Load Preset */}
        <Button onClick={handleOpenPresetDialog}>Load Preset</Button>
        <DialogSkeleton
        open={openPresetDialog}
        onClose={handleClosePresetDialog}>
          <LoadPresetDialog
          handleClosePresetDialog={handleClosePresetDialog}
          presetData={presetData}
          presetOrder={presetOrder}
          handleLoadPreset={handleLoadPreset}
          handleDeletePreset={handleDeletePreset}>
          </LoadPresetDialog>
        </DialogSkeleton>

        {/* Add Factor */}
        <Button onClick={handleOpenFactorDialog}>
          <AddIcon/>
        </Button>
        <DialogSkeleton
        open={openFactorDialog}
        onClose={handleCloseFactorDialog}>
          <FactorDialog
          handleCloseFactorDialog={handleCloseFactorDialog}
          handleAddFactor={handleAddFactor}
          handleEditFactor={handleEditFactor}
          edit={editFactorDialog}
          givenFactorName={whichFactorSelected}>
          </FactorDialog>
        </DialogSkeleton>

        {/* Remove Factor */}
        <Button onClick={handleRemoveFactor}>
          <RemoveIcon />
        </Button>
        
        {/* List of Factors */}
        <Box sx={{ 
          width: '100%', 
          height:'200px', 
          outlineStyle: 'solid', 
          outlineWidth: '1px',
           marginBottom: '2px'}}>

        {factorOrder.map((factorName, index) => {
         return <Factor 
          title={factorName} 
          weight={factorData[factorName]} 
          selected={whichFactorSelected === factorName} 
          handleClickFactor={handleClickFactor(factorName)} 
          handleClickWeight={handleClickWeight(factorName)}
          key={`${factorName}-${index}`}>
          </Factor>}
        )}
        </Box>

        {/* Submit button */}
        <Button variant="contained" onClick={onButtonClick}>Submit</Button>

      </Box>
    </>
  );
}