import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import DialogSkeleton from "../../utils/DialogSkeleton";
import DialogTitle from "@mui/material/DialogTitle";
import AddFactorDialog from "../AddFactorDialog";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { FactorData } from "../types";
import Factor from "../Factor";
import { useState } from "react";
import { MAX_TRIAL_NAME_LENGTH } from "./types";
import { TrialInnerData } from "./types";

interface Props {
  handleAddTrial: (TrialInnerData: TrialInnerData) => void;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}
export const AddTrialDialog: React.FC<Props> = ({
  handleAddTrial,
  handleClose,
}) => {
  const [valueTrialName, setValueTrialName] = useState("");
  const [valueSuccess, setValueSuccess] = useState("");
  const [valueFailure, setValueFailure] = useState("");
  const [valueAdditionalNotes, setValueAdditionalNotes] = useState("");

  const [whichIndivFactorSelected, setWhichIndivFactorSelected] =
    useState<keyof FactorData>("");

  const [indivFactorData, setIndivFactorData] = useState<FactorData>({});
  const [indivFactorOrder, setIndivFactorOrder] = useState<
    (keyof FactorData)[]
  >([]);

  const [editIndivFactorDialog, setEditIndivFactorDialog] = useState(false);

  const [openAddIndivFactorDialog, setOpenAddIndivFactorDialog] =
    useState(false);

  const handleInputTrialName: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.stopPropagation();
    if (e.target.value.length < MAX_TRIAL_NAME_LENGTH)
      setValueTrialName(e.target.value);
  };

  const handleInputSuccess: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.stopPropagation();
    setValueSuccess(e.target.value);
  };

  const handleInputFailure: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.stopPropagation();
    setValueFailure(e.target.value);
  };

  const handleInputAdditionalNotes: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    e.stopPropagation();
    setValueAdditionalNotes(e.target.value);
  };

  const handleCloseIndivFactorDialog: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.stopPropagation();
    setOpenAddIndivFactorDialog(false);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (valueTrialName.length === 0) return;

    const newData = {
      trialTitle: valueTrialName,
      successString: valueSuccess,
      failureString: valueFailure,
      additionalNotesString: valueAdditionalNotes,
      indivFactorData: indivFactorData,
      indivFactorOrder: indivFactorOrder,
      subtrialData: [],
    };
    handleClose(e);
    handleAddTrial(newData);
  };

  // Subroutine of submit button handler in FactorDialog.
  const handleAddIndivFactor = (indivFactorName: string, weight: number) => {
    setIndivFactorOrder([...indivFactorOrder, indivFactorName]);

    const newFactorData = {
      ...indivFactorData,
      [indivFactorName]: weight,
    };

    setIndivFactorData(newFactorData);
  };

  // Subroutine of submit button handler in FactorDialog.
  const handleEditIndivFactor = (factorName: string, weight: number) => {
    const newFactorData = {
      ...indivFactorData,
      [factorName]: weight,
    };

    setIndivFactorData(newFactorData);
    setWhichIndivFactorSelected("");
  };

  const handleClickFactor =
    (factorName: string): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      //Triggered by clicking a tab
      e.stopPropagation();
      whichIndivFactorSelected === factorName
        ? setWhichIndivFactorSelected("")
        : setWhichIndivFactorSelected(factorName);
    };

  const handleClickWeight =
    (factorName: string): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      //Triggered by clicking a tab
      e.stopPropagation();
      whichIndivFactorSelected === factorName
        ? setWhichIndivFactorSelected("")
        : setWhichIndivFactorSelected(factorName);
      setEditIndivFactorDialog(true);
      setOpenAddIndivFactorDialog(true);
    };

  const handleRemoveFactor: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    setIndivFactorOrder(
      indivFactorOrder.filter(
        (presetName) => presetName != whichIndivFactorSelected
      )
    );

    const { [whichIndivFactorSelected]: _, ...newIndivFactorData } =
      indivFactorData;

    setIndivFactorData(newIndivFactorData);
  };

  const handleOpenIndivFactorDialog: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.stopPropagation();
    setEditIndivFactorDialog(false);
    setOpenAddIndivFactorDialog(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <>
      <DialogTitle sx={{ p: 0, mb: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h4">Add New Trial</Typography>
        </Stack>
      </DialogTitle>

      <Stack spacing={2.5} onKeyDown={handleKeyPress} sx={{ minWidth: { xs: 0, md: 640 } }}>
        {/* Input for trial's name */}
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Trial Name</Typography>
        <TextField
          id="outlined-basic"
          value={valueTrialName}
          onChange={handleInputTrialName}
          helperText={`${valueTrialName.length} characters entered`}
        />
        </Box>

        {/* What a success looks like */}
        <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Success Criteria</Typography>
        <TextField
          id=" outlined-multiline-flexible"
          multiline
          rows={4}
          placeholder="Ideal measurable outcome for trial"
          value={valueSuccess}
          onChange={handleInputSuccess}
        />
        </Box>

        {/* What a failure looks like */}
        <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Failure Criteria</Typography>
        <TextField
          id=" outlined-multiline-flexible"
          multiline
          rows={4}
          placeholder="What would be considered a trial failure"
          value={valueFailure}
          onChange={handleInputFailure}
        />
        </Box>

        {/* Individual Factors \*/}
        <Paper elevation={0} sx={{ p: 2.7}}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1.5} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6">Individual Factors</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={handleOpenIndivFactorDialog} startIcon={<AddIcon />}>
                Add Factor
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleRemoveFactor}
                startIcon={<RemoveIcon />}
                disabled={whichIndivFactorSelected.length === 0}
              >
                Remove
              </Button>
            </Stack>
          </Stack>
          <DialogSkeleton open={openAddIndivFactorDialog} onClose={handleCloseIndivFactorDialog}>
            {/* Re-using same factor dialog, so no need for prop names to match */}
            <AddFactorDialog
              handleCloseFactorDialog={handleCloseIndivFactorDialog}
              handleAddFactor={handleAddIndivFactor}
              handleEditFactor={handleEditIndivFactor}
              edit={editIndivFactorDialog}
              givenFactorName={whichIndivFactorSelected}
            />
          </DialogSkeleton>

        <Box
          sx={{
            width: "100%",
            minHeight: "140px",
            p: 1.85,
          }}
        >
          {indivFactorOrder.length === 0 ? (
            <Typography variant="body2">
              No factors added yet
            </Typography>
          ) : indivFactorOrder.map((indivFactorName, index) => {
            return (
              <Factor
                title={indivFactorName}
                weight={indivFactorData[indivFactorName]}
                selected={whichIndivFactorSelected === indivFactorName}
                handleClickFactor={handleClickFactor(indivFactorName)}
                handleClickWeight={handleClickWeight(indivFactorName)}
                key={`${indivFactorName}-${index}`}
              ></Factor>
            );
          })}
        </Box>
        </Paper>

        <Divider />

        {/* Additional notes */}
        <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Additional Notes</Typography>
        <TextField
          id=" outlined-multiline-flexible"
          multiline
          rows={4}
          placeholder="Particular notes for this trial"
          value={valueAdditionalNotes}
          onChange={handleInputAdditionalNotes}
        />
        </Box>

        {/* BOTTOM SUBMIT BUTTON */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.25}
          justifyContent="flex-end"
          sx={{
            position: 'sticky',
            bottom: -1,
            py: 1,
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onButtonClick} disabled={valueTrialName.trim().length === 0}>
            Create Trial
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default AddTrialDialog;
