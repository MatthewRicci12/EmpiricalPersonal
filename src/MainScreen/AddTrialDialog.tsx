import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { SubTrialData } from "./MainScreen";
import DialogSkeleton from "../DialogSkeleton/DialogSkeleton";
import FactorDialog from "../AddArenaDialog/FactorDialog";
import Factor, { FactorData } from "../AddArenaDialog/Factor";
import Box from "@mui/system/Box";

const MAX_TRIAL_NAME_LENGTH = 64;

export interface AddTrialDialogData {
  trialTitle: string,
  successString: string,
  failureString: string,
  additionalNotesString: string,
  subTrialData: SubTrialData,
  subTrialOrder: (keyof SubTrialData)[]
}


interface Props {
  handleAddTrial: (addTrialDialogData: AddTrialDialogData) => void,
  handleClose: () => void
}

export const AddTrialDialog: React.FC<Props> = ({ handleAddTrial, handleClose }) => {
  const [valueTrialName, setValueTrialName] = useState("");
  const [valueSuccess, setValueSuccess] = useState("");
  const [valueFailure, setValueFailure] = useState("");
  const [valueAdditionalNotes, setValueAdditionalNotes] = useState("");
  const [whichIndivFactorSelected, setWhichIndivFactorSelected] = useState<(keyof FactorData)>("");
  const [indivFactorData, setIndivFactorData] = useState<FactorData>({});
  const [indivFactorOrder, setIndivFactorOrder] = useState<(keyof FactorData)[]>([]);
  const [editIndivFactorDialog, setEditIndivFactorDialog] = useState(false); 

  const [openAddIndivFactorDialog, setOpenAddIndivFactorDialog] = useState(false);


  const handleInputTrialName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length < MAX_TRIAL_NAME_LENGTH) setValueTrialName(e.target.value);
  }

  const handleInputSuccess: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValueSuccess(e.target.value);
  }

  const handleInputFailure: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValueFailure(e.target.value);
  }

  const handleInputAdditionalNotes: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValueAdditionalNotes(e.target.value);
  }

  const handleCloseIndivFactorDialog = () => {
    setOpenAddIndivFactorDialog(false);
  }

  const onSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    const newData = {
      trialTitle: valueTrialName,
      successString: valueSuccess,
      failureString: valueFailure,
      additionalNotesString: valueAdditionalNotes,
      subTrialData: {},
      subTrialOrder: []
    }
    handleClose();
    handleAddTrial(newData);
  }

  const handleAddIndivFactor = (indivFactorName: string, weight: number) => {
    setIndivFactorOrder([...indivFactorOrder, indivFactorName]);

    const newFactorData = {
      ...indivFactorData,
      [indivFactorName]: weight,
    }
    setIndivFactorData(newFactorData);
  }

  const handleEditIndivFactor = (factorName: string, weight: number) => {
    const newFactorData = {
      ...indivFactorData,
      [factorName]: weight
    }
    setIndivFactorData(newFactorData);
    setWhichIndivFactorSelected("");
  }

  const handleClickFactor = (factorName: string): React.MouseEventHandler<HTMLDivElement> => (e) => { //Triggered by clicking a tab
    e.stopPropagation()
    whichIndivFactorSelected === factorName ? setWhichIndivFactorSelected("") : setWhichIndivFactorSelected(factorName);
  };

  const handleClickWeight = (factorName: string): React.MouseEventHandler<HTMLButtonElement> => (e) => {   //Triggered by clicking a tab
      e.stopPropagation();
      whichIndivFactorSelected === factorName ? setWhichIndivFactorSelected("") : setWhichIndivFactorSelected(factorName);
      setEditIndivFactorDialog(true);
      setOpenAddIndivFactorDialog(true);
  };

  const handleRemoveFactor: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIndivFactorOrder(indivFactorOrder.filter(presetName => presetName != whichIndivFactorSelected));
    const { [whichIndivFactorSelected]: _, ...newIndivFactorData} = indivFactorData;
    setIndivFactorData(newIndivFactorData);
  }

  const handleOpenIndivFactorDialog = () => { //Triggered by Dialog x
    setEditIndivFactorDialog(false);
    setOpenAddIndivFactorDialog(true);
  };


  return (
    <>
      <DialogTitle>Add New Trial</DialogTitle>


      {/* Input for trial's name */}
      <Typography>Trial name:</Typography>
      <TextField id="outlined-basic" variant="outlined" value={valueTrialName} onChange={handleInputTrialName}
        sx={{
          paddingBottom: '10px' }} />

      {/* What a success looks like */}
      <Typography>What a success looks like</Typography>
      <TextField id=" outlined-multiline-flexible" multiline rows={4} value={valueSuccess} onChange={handleInputSuccess} />

      {/* What a failure looks like */}
      <Typography>What a failure looks like</Typography>
      <TextField id=" outlined-multiline-flexible" multiline rows={4} value={valueFailure} onChange={handleInputFailure} />

      {/* Individual Factors \*/}
      <Typography>
        Individual Factors
        <Button onClick={ handleOpenIndivFactorDialog }>
          <AddIcon />
        </Button>
        <DialogSkeleton
        open={openAddIndivFactorDialog}
        onClose={handleClose}>
          <FactorDialog
          handleCloseFactorDialog={handleCloseIndivFactorDialog}
          handleAddFactor={handleAddIndivFactor}
          handleEditFactor={handleEditIndivFactor}
          edit={editIndivFactorDialog}
          givenFactorName={whichIndivFactorSelected}
          />
        </DialogSkeleton>

        <Button onClick={handleRemoveFactor}>
          <RemoveIcon />
        </Button>
      </Typography>
      <Box sx={{ width: '100%', height:'200px', outlineStyle: 'solid', outlineWidth: '1px', marginBottom: '2px'}}>
        {indivFactorOrder.map((indivFactorName, index) => {
         return <Factor 
          title={indivFactorName} 
          weight={indivFactorData[indivFactorName]} 
          selected={whichIndivFactorSelected === indivFactorName} 
          handleClickFactor={handleClickFactor(indivFactorName)} 
          handleClickWeight={handleClickWeight(indivFactorName)}
          key={`${indivFactorName}-${index}`}
          ></Factor>}
        )}
      </Box>

      {/* Additional notes */}
      <Typography>Additional notes</Typography>
      <TextField id=" outlined-multiline-flexible" multiline rows={4} value={valueAdditionalNotes} onChange={handleInputAdditionalNotes} />

      {/* BOTTOM SUBMIT BUTTON */}
      <Button variant="contained" onClick={onSubmitClick}>Submit</Button>
    </>
  );
}

export default AddTrialDialog;