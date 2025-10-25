import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import DialogSkeleton from "../../utils/DialogSkeleton";
import DialogTitle from "@mui/material/DialogTitle";
import AddFactorDialog from "../AddFactorDialog";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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
      subTrialData: {},
      subTrialOrder: [],
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
      <DialogTitle>Add New Trial</DialogTitle>

      <Box onKeyDown={handleKeyPress}>
        {/* Input for trial's name */}
        <Typography>Trial name:</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={valueTrialName}
          onChange={handleInputTrialName}
          sx={{
            paddingBottom: "10px",
          }}
        />

        {/* What a success looks like */}
        <Typography>What a success looks like</Typography>
        <TextField
          id=" outlined-multiline-flexible"
          multiline
          rows={4}
          value={valueSuccess}
          onChange={handleInputSuccess}
        />

        {/* What a failure looks like */}
        <Typography>What a failure looks like</Typography>
        <TextField
          id=" outlined-multiline-flexible"
          multiline
          rows={4}
          value={valueFailure}
          onChange={handleInputFailure}
        />

        {/* Individual Factors \*/}
        <Typography>
          Individual Factors
          <Button onClick={handleOpenIndivFactorDialog}>
            <AddIcon />
          </Button>
          <DialogSkeleton open={openAddIndivFactorDialog} onClose={handleClose}>
            {/* Re-using same factor dialog, so no need for prop names to match */}
            <AddFactorDialog
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

        <Box
          sx={{
            width: "100%",
            height: "200px",
            outlineStyle: "solid",
            outlineWidth: "1px",
            marginBottom: "2px",
          }}
        >
          {indivFactorOrder.map((indivFactorName, index) => {
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

        {/* Additional notes */}
        <Typography>Additional notes</Typography>
        <TextField
          id=" outlined-multiline-flexible"
          multiline
          rows={4}
          value={valueAdditionalNotes}
          onChange={handleInputAdditionalNotes}
        />

        {/* BOTTOM SUBMIT BUTTON */}
        <Button variant="contained" onClick={onButtonClick}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddTrialDialog;
