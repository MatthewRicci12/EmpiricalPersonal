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
import AddFactorDialog from './AddFactorDialog.tsx';
import { FactorData } from './Factor.tsx';
import Preset, { PresetData } from './Preset.tsx';

interface Props {
  handleAddArena: (tabName: string) => void,
  handleCloseArenaDialog: () => void
}
export const AddArenaDialog: React.FC<Props> = ({ handleAddArena, handleCloseArenaDialog }) => {
  const [openPresetDialog, setOpenPresetDialog] = useState(false); //dialog pop up or not
  const [openAddFactorDialog, setOpenAddFactorDialog] = useState(false); //dialog pop up or not
  const [value, setValue] = useState(""); //Value of input which changes on screen
  const [factorData, setFactorData] = useState<FactorData>({});
  const [factorOrder, setFactorOrder] = useState<(keyof FactorData)[]>([]);

  const handleOpenPresetDialog = () => { //Triggered by add Tab button
    setOpenPresetDialog(true);
  };

  const handleClosePresetDialog = () => { //Triggered by Dialog x
    setOpenPresetDialog(false);
  };

  const handleOpenFactorDialog = () => { //Triggered by Dialog x
    setOpenAddFactorDialog(true);
  };

  const handleCloseAddFactorDialog = () => { //Triggered by Dialog x
    setOpenAddFactorDialog(false);
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

  //export type PresetData = Record<string, FactorData>
  //export type FactorData = Record<string, number>;

  const handleAddFactor = (factorName: string, weight: number) => {
    setFactorOrder([...factorOrder, factorName]);

    const newFactorData = {
      ...factorData,
      [factorName]: weight, // avoid overwriting when it already exists - if arenaData[tabName] is null, this assigns {}
    }
    setFactorData(newFactorData)
    

  }

  const handleRemoveFactor: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    

  }

  const handleSavePreset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    
    
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
        <Button onClick={handleSavePreset}>Save Preset</Button>

        {/* Load Preset */}
        <Button onClick={handleOpenPresetDialog}>Load Preset</Button>
        <DialogSkeleton
        open={openPresetDialog}
        onClose={handleClosePresetDialog}
        >
          <LoadPresetDialog
          handleClosePresetDialog={handleClosePresetDialog}
          ></LoadPresetDialog>
        </DialogSkeleton>

        {/* Add Factor */}
        <Button onClick={handleOpenFactorDialog}>
          <AddIcon/>
        </Button>
        <DialogSkeleton
        open={openAddFactorDialog}
        onClose={handleCloseAddFactorDialog}
        >
          <AddFactorDialog
          handleCloseAddFactorDialog={handleCloseAddFactorDialog}
          handleAddFactor={handleAddFactor}
          ></AddFactorDialog>
        </DialogSkeleton>

        {/* Remove Factor */}
        <Button onClick={handleRemoveFactor}>
          <RemoveIcon />
        </Button>
        {/* If an HTML or JSX tag doesn't have anything between the open and close tag, they can be self closing (the opening tag ends with />) */}
        <Box sx={{ width: '100%', height:'200px', outlineStyle: 'solid', outlineWidth: '1px', marginBottom: '2px'}}>
        {factorOrder.map((factorName, index) =>
        <>
        <Typography align="left">{factorName}   {factorData[factorName]}</Typography>
        </>
        )}
        </Box>
        <Button variant="contained" onClick={onButtonClick}>Submit</Button>
      </Box>
    </>
  );
}

