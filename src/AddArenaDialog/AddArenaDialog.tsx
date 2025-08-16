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
import FactorDialog from './FactorDialog.tsx';
import { FactorData } from './Factor.tsx';
import Preset, { PresetData } from './Preset.tsx';
import SavePresetDialog from './SavePresetDialog.tsx';
import Factor from './Factor.tsx';

interface Props {
  handleAddArena: (tabName: string) => void,
  handleCloseArenaDialog: () => void
}
export const AddArenaDialog: React.FC<Props> = ({ handleAddArena, handleCloseArenaDialog }) => {
  const [openPresetDialog, setOpenPresetDialog] = useState(false); //dialog pop up or not
  const [openFactorDialog, setOpenFactorDialog] = useState(false); //dialog pop up or not
  const [editFactorDialog, setEditFactorDialog] = useState(false);
  const [openSavePresetDialog, setOpenSavePresetDialog] = useState(false); //dialog pop up or not

  const [value, setValue] = useState(""); //Value of input which changes on screen
  const [factorData, setFactorData] = useState<FactorData>({});
  const [factorOrder, setFactorOrder] = useState<(keyof FactorData)[]>([]);
  const [presetData, setPresetData] = useState<PresetData>({});
  const [presetOrder, setPresetOrder] = useState<(keyof PresetData)[]>([]);
  const [whichFactorSelected, setWhichFactorSelected] = useState<(keyof FactorData)>("");

  const handleOpenPresetDialog = () => { //Triggered by add Tab button
    setOpenPresetDialog(true);
  };

  const handleClosePresetDialog = () => { //Triggered by Dialog x
    setOpenPresetDialog(false);
  };

  const handleOpenFactorDialog = () => { //Triggered by Dialog x
    setEditFactorDialog(false);
    setOpenFactorDialog(true);
  };

  const handleCloseFactorDialog = () => { //Triggered by Dialog x
    setOpenFactorDialog(false);
  };

  const handleOpenSavePresetDialog = () => { //Triggered by Dialog x
    setOpenSavePresetDialog(true);
  };

  const handleCloseSavePresetDialog = () => { //Triggered by Dialog x
    setOpenSavePresetDialog(false);
  };


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    e.stopPropagation();
    if (e.target.value.length < MAX_ARENA_NAME_LENGTH) setValue(e.target.value);
  }

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    
    handleCloseArenaDialog()
    handleAddArena(value)
  }

  const handleClickFactor = (factorName: string): React.MouseEventHandler<HTMLDivElement> => (e) => { //Triggered by clicking a tab
    e.stopPropagation()
    whichFactorSelected === factorName ? setWhichFactorSelected("") : setWhichFactorSelected(factorName);
  };


  const handleAddFactor = (factorName: string, weight: number) => {
    setFactorOrder([...factorOrder, factorName]);

    const newFactorData = {
      ...factorData,
      [factorName]: weight,
    }
    setFactorData(newFactorData);
    console.log(`handleAddFactor: ${newFactorData[factorName]}`);

  }

  const handleEditFactor = (factorName: string, newWeight: number) => {  //Triggered by clicking a tab
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
  };


  const handleRemoveFactor: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setFactorOrder(factorOrder.filter(presetName => presetName != whichFactorSelected));
    const { [whichFactorSelected]: _, ...newFactorData} = factorData;
    setFactorData(newFactorData);
  }

  const handleSavePreset = (presetName: string) => {
    setPresetOrder([...presetOrder, presetName]);

    const newPresetData = {
      ...presetData,
      [presetName]: {factorData: factorData, factorOrder: factorOrder}
    }
    setPresetData(newPresetData);
  }

  const handleLoadPreset = (factorData: FactorData, factorOrder: (keyof FactorData)[]) => {
    setFactorData(factorData);
    setFactorOrder(factorOrder);
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
        {/* Save Preset */}
        <Button onClick={handleOpenSavePresetDialog}>Save Preset</Button>
        <DialogSkeleton
        open={openSavePresetDialog}
        onClose={handleCloseSavePresetDialog}  
        >
          <SavePresetDialog
          handleCloseSavePresetDialog={handleCloseSavePresetDialog}
          handleSavePreset={handleSavePreset}
          >

          </SavePresetDialog>
        </DialogSkeleton>

        {/* Load Preset */}
        <Button onClick={handleOpenPresetDialog}>Load Preset</Button>
        <DialogSkeleton
        open={openPresetDialog}
        onClose={handleClosePresetDialog}
        >
          <LoadPresetDialog
          handleClosePresetDialog={handleClosePresetDialog}
          presetData={presetData}
          presetOrder={presetOrder}
          handleLoadPreset={handleLoadPreset}
          ></LoadPresetDialog>
        </DialogSkeleton>

        {/* Add Factor */}
        <Button onClick={handleOpenFactorDialog}>
          <AddIcon/>
        </Button>
        <DialogSkeleton
        open={openFactorDialog}
        onClose={handleCloseFactorDialog}
        >
          <FactorDialog
          handleCloseFactorDialog={handleCloseFactorDialog}
          handleAddFactor={handleAddFactor}
          handleEditFactor={handleEditFactor}
          edit={editFactorDialog}
          givenFactorName={whichFactorSelected}
          ></FactorDialog>
        </DialogSkeleton>

        {/* Remove Factor */}
        <Button onClick={handleRemoveFactor}>
          <RemoveIcon />
        </Button>
        
        {/* List of Factors */}
        <Box sx={{ width: '100%', height:'200px', outlineStyle: 'solid', outlineWidth: '1px', marginBottom: '2px'}}>

        
        {factorOrder.map((factorName, index) => {
         console.log(`factorName: ${factorName}, factorData: ${factorData}, factorData[factorName]: ${factorData[factorName]}`);
         return <Factor 
          title={factorName} 
          weight={factorData[factorName]} 
          selected={whichFactorSelected === factorName} 
          handleClickFactor={handleClickFactor(factorName)} 
          handleClickWeight={handleClickWeight(factorName)}
          key={`${factorName}-${index}`}
          ></Factor>}
        )}
        </Box>
        <Button variant="contained" onClick={onButtonClick}>Submit</Button>
      </Box>
    </>
  );
}

