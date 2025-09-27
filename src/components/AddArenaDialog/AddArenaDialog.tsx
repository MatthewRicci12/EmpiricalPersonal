import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import DialogSkeleton from "../../utils/DialogSkeleton.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import Factor from "../Factor.tsx";
import FactorDialog from "../AddFactorDialog.tsx";
import LoadPresetDialog from "./LoadPresetDialog.tsx";
import RemoveIcon from "@mui/icons-material/Remove";
import SavePresetDialog from "./SavePresetDialog.tsx";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FactorData } from "../types.tsx";
import { MAX_ARENA_NAME_LENGTH } from "../../pages/MainScreen/types.tsx";
import { useState } from "react";
import { PresetData } from "./types.tsx";

interface Props {
  handleAddArena: (tabName: string) => void;
  handleCloseArenaDialog: React.MouseEventHandler<HTMLButtonElement>;
  handleEditArena: (newName: string) => void;
  edit: boolean;
}
export const AddArenaDialog: React.FC<Props> = ({
  handleAddArena,
  handleCloseArenaDialog,
  handleEditArena,
  edit,
}) => {
  const [openFactorDialog, setOpenFactorDialog] = useState(false);
  const [editFactorDialog, setEditFactorDialog] = useState(false);

  const [openPresetDialog, setOpenPresetDialog] = useState(false);
  const [openSavePresetDialog, setOpenSavePresetDialog] = useState(false);

  const [arenaTitle, setArenaTitle] = useState("");

  const [factorData, setFactorData] = useState<FactorData>({});
  const [factorOrder, setFactorOrder] = useState<(keyof FactorData)[]>([]);

  const [presetData, setPresetData] = useState<PresetData>({});
  const [presetOrder, setPresetOrder] = useState<(keyof PresetData)[]>([]);

  const [whichFactorSelected, setWhichFactorSelected] =
    useState<keyof FactorData>("");

  const handleDeletePreset =
    (presetToBeDeleted: string): React.MouseEventHandler<HTMLLIElement> =>
    (e) => {
      setPresetOrder(
        presetOrder.filter((presetName) => presetName != presetToBeDeleted)
      );
      const { [presetToBeDeleted]: _, ...newPresetData } = presetData;
      setPresetData(newPresetData);
    };

  const handleOpenPresetDialog: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    setOpenPresetDialog(true);
  };

  const handleClosePresetDialog: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    setOpenPresetDialog(false);
  };

  const handleOpenFactorDialog: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    //Triggered by Dialog x
    e.stopPropagation();
    setEditFactorDialog(false);
    setOpenFactorDialog(true);
  };

  // Subroutine of FactorDialog
  const handleCloseFactorDialog = () => {
    setOpenFactorDialog(false);
  };

  const handleOpenSavePresetDialog: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.stopPropagation();
    setOpenSavePresetDialog(true);
  };

  // Subroutine of SavePresetDialog
  const handleCloseSavePresetDialog = () => {
    setOpenSavePresetDialog(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.value.length < MAX_ARENA_NAME_LENGTH)
      setArenaTitle(e.target.value);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (arenaTitle.length === 0) return;

    if (edit) {
      handleCloseArenaDialog(e);
      handleEditArena(arenaTitle);
    } else {
      handleCloseArenaDialog(e);
      handleAddArena(arenaTitle);
    }
  };

  const handleClickFactor =
    (factorName: string): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      //Triggered by clicking a tab
      e.stopPropagation();
      whichFactorSelected === factorName
        ? setWhichFactorSelected("")
        : setWhichFactorSelected(factorName);
    };

  // Subroutine
  const handleAddFactor = (factorName: string, weight: number) => {
    if (factorName in factorOrder) {
      console.error("Factor already exists.");
      return;
    }

    setFactorOrder([...factorOrder, factorName]);

    const newFactorData = {
      ...factorData,
      [factorName]: weight,
    };

    setFactorData(newFactorData);

    console.log(`handleAddFactor: ${newFactorData[factorName]}`);
  };

  // Subroutine
  const handleEditFactor = (factorName: string, newWeight: number) => {
    //Triggered by clicking a tab
    const newFactorData = {
      ...factorData,
      [factorName]: newWeight,
    };
    setFactorData(newFactorData);
    setWhichFactorSelected("");
  };

  const handleClickWeight =
    (factorName: string): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      //Triggered by clicking a tab
      e.stopPropagation();
      whichFactorSelected === factorName
        ? setWhichFactorSelected("")
        : setWhichFactorSelected(factorName);
      setEditFactorDialog(true);
      setOpenFactorDialog(true);
    };

  const handleRemoveFactor: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    setFactorOrder(
      factorOrder.filter((presetName) => presetName != whichFactorSelected)
    );
    const { [whichFactorSelected]: _, ...newFactorData } = factorData;
    setFactorData(newFactorData);
  };

  const handleSavePreset = (presetName: string) => {
    setPresetOrder([...presetOrder, presetName]);

    if (presetName in presetOrder) {
      console.error("Preset with that name already exists!");
      return;
    }

    const newPresetData = {
      ...presetData,
      [presetName]: { factorData: factorData, factorOrder: factorOrder },
    };
    setPresetData(newPresetData);
  };

  // Subroutine of LoadPresetDialog
  const handleLoadPreset = (
    factorData: FactorData,
    factorOrder: (keyof FactorData)[]
  ) => {
    setFactorData(factorData);
    setFactorOrder(factorOrder);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log(`You pressed: ${e.key}`);
    if (e.key === "Enter") {
      console.log("You pressed Enter!");
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <>
      <DialogTitle>{edit ? "Edit" : "Add"} Arena</DialogTitle>

      <Box
        sx={{
          height: "500px",
          width: "500px",
        }}
        onKeyDown={handleKeyPress}
      >
        <TextField
          id="outlined-basic"
          label="Arena Title"
          variant="outlined"
          value={arenaTitle}
          onChange={handleInput}
          sx={{
            paddingBottom: "10px",
          }}
        ></TextField>

        <Typography
          sx={{
            fontSize: "1.5em",
          }}
        >
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
          ></SavePresetDialog>
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
            handleDeletePreset={handleDeletePreset}
          ></LoadPresetDialog>
        </DialogSkeleton>

        {/* Add Factor */}
        <Button onClick={handleOpenFactorDialog}>
          <AddIcon />
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
        <Box
          sx={{
            width: "100%",
            height: "200px",
            outlineStyle: "solid",
            outlineWidth: "1px",
            marginBottom: "2px",
          }}
        >
          {factorOrder.map((factorName, index) => {
            console.log(
              `factorName: ${factorName}, factorData: ${factorData}, factorData[factorName]: ${factorData[factorName]}`
            );
            return (
              <Factor
                title={factorName}
                weight={factorData[factorName]}
                selected={whichFactorSelected === factorName}
                handleClickFactor={handleClickFactor(factorName)}
                handleClickWeight={handleClickWeight(factorName)}
                key={`${factorName}-${index}`}
              ></Factor>
            );
          })}
        </Box>
        {/* Submit button */}
        <Button variant="contained" onClick={onButtonClick}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddArenaDialog;
