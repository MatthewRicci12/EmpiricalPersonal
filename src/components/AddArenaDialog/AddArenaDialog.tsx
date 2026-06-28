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
import Stack from "@mui/material/Stack";
import { FactorData } from "../types.tsx";
import { MAX_ARENA_NAME_LENGTH } from "../../pages/MainScreen/types.tsx";
import { PresetData } from "./types.tsx";
import { useReducer } from "react";

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDeletePreset =
    (presetToBeDeleted: string): React.MouseEventHandler<HTMLLIElement> =>
    (e) => {
      e.stopPropagation();
      dispatch({
        type: ActionKind.DELETESAVEDPRESET,
        payload: presetToBeDeleted,
      });
    };

  const handleOpenPresetDialog: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    dispatch({ type: ActionKind.VIEWPRESETSMODAL, payload: true });
  };

  const handleClosePresetDialog: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    dispatch({ type: ActionKind.VIEWPRESETSMODAL, payload: false });
  };

  const handleOpenFactorDialog: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    //Triggered by Dialog x
    e.stopPropagation();
    dispatch({ type: ActionKind.FACTORMODAL, payload: [true, false] });
  };

  // Subroutine of FactorDialog
  const handleCloseFactorDialog = () => {
    dispatch({ type: ActionKind.FACTORMODAL, payload: [false, false] });
  };

  const handleOpenSavePresetDialog: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.stopPropagation();
    dispatch({ type: ActionKind.SAVEPRESETMODAL, payload: true });
  };

  // Subroutine of SavePresetDialog
  const handleCloseSavePresetDialog = () => {
    dispatch({ type: ActionKind.SAVEPRESETMODAL, payload: false });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.value.length < MAX_ARENA_NAME_LENGTH) {
      dispatch({ type: ActionKind.SETARENATITLE, payload: e.target.value });
    }
  };

  // Note: These functions are passed in, so do not get reduced. They say 'handle' and not 'set'.
  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (state.arenaTitle.length === 0) return;
    handleCloseArenaDialog(e);

    if (edit) {
      handleEditArena(state.arenaTitle);
    } else {
      handleAddArena(state.arenaTitle);
    }
  };

  const handleClickFactor =
    (factorName: string): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      //Triggered by clicking a tab
      e.stopPropagation();
      dispatch({ type: ActionKind.CLICKFACTOR, payload: factorName });
    };

  // Subroutine
  const handleAddFactor = (factorName: string, weight: number) => {
    if (factorName in state.factorOrder) {
      console.error("Factor already exists.");
      return;
    }
    dispatch({
      type: ActionKind.ADDFACTOR,
      payload: [factorName, weight],
    });
  };

  // Subroutine
  const handleEditFactor = (factorName: string, newWeight: number) => {
    //Triggered by clicking a tab
    dispatch({ type: ActionKind.EDITFACTOR, payload: [factorName, newWeight] });
  };

  const handleClickWeight =
    (factorName: string): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      //Triggered by clicking a tab
      e.stopPropagation();
      dispatch({ type: ActionKind.CLICKWEIGHT, payload: factorName });
    };

  const handleRemoveFactor: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    dispatch({ type: ActionKind.REMOVEFACTOR, payload: {} });
  };

  const handleSavePreset = (presetName: string) => {
    dispatch({ type: ActionKind.SAVEPRESET, payload: presetName });
  };

  // Subroutine of LoadPresetDialog
  const handleLoadPreset = (
    factorData: FactorData,
    factorOrder: (keyof FactorData)[]
  ) => {
    dispatch({
      type: ActionKind.LOADPRESET,
      payload: [factorData, factorOrder],
    });
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
          <Typography variant="h4">{edit ? "Edit" : "Add"} Arena</Typography>
        </Stack>
      </DialogTitle>

      <Box
        sx={{
          maxWidth: "680px",
        }}
        onKeyDown={handleKeyPress}
      >
        <TextField
          id="outlined-basic"
          label="Arena Title"
          variant="outlined"
          value={state.arenaTitle}
          onChange={handleInput}
          sx={{ mb: 3 }}
        ></TextField>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1.25} alignItems={{ xs: 'stretch', sm: 'center' }} sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h5">Arena Factors</Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button onClick={handleOpenSavePresetDialog} variant="outlined">Save Preset</Button>
            <Button onClick={handleOpenPresetDialog} variant="outlined">Load Preset</Button>
          </Stack>
        </Stack>

        {/* Save Preset */}
        <DialogSkeleton
          open={state.openSavePresetDialog}
          onClose={handleCloseSavePresetDialog}
        >
          <SavePresetDialog
            handleCloseSavePresetDialog={handleCloseSavePresetDialog}
            handleSavePreset={handleSavePreset}
          ></SavePresetDialog>
        </DialogSkeleton>

        {/* Load Preset */}
        <DialogSkeleton
          open={state.openViewPresetsDialog}
          onClose={handleClosePresetDialog}
        >
          <LoadPresetDialog
            handleClosePresetDialog={handleClosePresetDialog}
            presetData={state.presetData}
            presetOrder={state.presetOrder}
            handleLoadPreset={handleLoadPreset}
            handleDeletePreset={handleDeletePreset}
          ></LoadPresetDialog>
        </DialogSkeleton>

        {/* Add Factor */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button onClick={handleOpenFactorDialog} variant="outlined" startIcon={<AddIcon />}>
          Add Factor
        </Button>
        <DialogSkeleton
          open={state.openFactorDialog}
          onClose={handleCloseFactorDialog}
        >
          <FactorDialog
            handleCloseFactorDialog={handleCloseFactorDialog}
            handleAddFactor={handleAddFactor}
            handleEditFactor={handleEditFactor}
            edit={state.editFactorDialog}
            givenFactorName={state.whichFactorSelected}
          ></FactorDialog>
        </DialogSkeleton>

        {/* Remove Factor */}
        <Button onClick={handleRemoveFactor} variant="outlined" startIcon={<RemoveIcon />}>
          Remove Factor
        </Button>
        </Stack>

        {/* List of Factors */}
        <Box
          sx={{
            width: "100%",
            minHeight: "180px",
            p: 1.5,
            mb: 3,
          }}
        >
          {state.factorOrder.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No factors defined yet. Add the variables that matter most to the arena.
            </Typography>
          ) : state.factorOrder.map((factorName, index) => {
            return (
              <Factor
                title={factorName}
                weight={state.factorData[factorName]}
                selected={state.whichFactorSelected === factorName}
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

enum ActionKind {
  FACTORMODAL = "FACTORMODAL",
  VIEWPRESETSMODAL = "VIEWPRESETSMODAL",
  SAVEPRESETMODAL = "SAVEPRESETMODAL",

  SETEDITFACTOR = "SETEDITFACTOR",
  SETADDFACTOR = "SETADDFACTOR",

  SETARENATITLE = "SETARENATITLE",
  ADDFACTOR = "ADDFACTOR",
  EDITFACTOR = "EDITFACTOR",
  REMOVEFACTOR = "REMOVEFACTOR",

  LOADPRESET = "LOADPRESET",
  SAVEPRESET = "SAVEPRESET",
  DELETESAVEDPRESET = "DELETESAVEDPRESET",

  CLICKWEIGHT = "CLICKWEIGHT",
  CLICKSUBMIT = "CLICKSUBMIT",
  CLICKFACTOR = "CLICKFACTOR",
}

interface Action {
  type: ActionKind;
  payload: any;
}

interface State {
  openFactorDialog: boolean;
  editFactorDialog: boolean;

  openViewPresetsDialog: boolean;
  openSavePresetDialog: boolean;

  arenaTitle: string;

  factorData: FactorData;
  factorOrder: (keyof FactorData)[];

  presetData: PresetData;
  presetOrder: (keyof PresetData)[];

  whichFactorSelected: keyof FactorData;
}

const initialState: State = {
  openFactorDialog: false,
  editFactorDialog: false,

  openViewPresetsDialog: false,
  openSavePresetDialog: false,

  arenaTitle: "",

  factorData: {},
  factorOrder: [],

  presetData: {},
  presetOrder: [],

  whichFactorSelected: "",
};

const initialStateFilled: State = {
  openFactorDialog: false,
  editFactorDialog: false,

  openViewPresetsDialog: false,
  openSavePresetDialog: false,

  arenaTitle: "",

  factorData: { y: 5 },
  factorOrder: ["y"],

  presetData: { x: { factorData: { x: 5 }, factorOrder: ["x"] } },
  presetOrder: ["x"],

  whichFactorSelected: "",
};

function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.CLICKWEIGHT: {
      const factorName = payload;

      const whichFactorSelected =
        state.whichFactorSelected === factorName ? "" : factorName;

      return {
        ...state,
        whichFactorSelected: whichFactorSelected,
        editFactorDialog: true,
        openFactorDialog: true,
      };
    }

    case ActionKind.VIEWPRESETSMODAL: {
      const openViewPresetsDialog = payload;

      return {
        ...state,
        openViewPresetsDialog: openViewPresetsDialog,
      } as State;
    }
    case ActionKind.SAVEPRESETMODAL: {
      const openSavePresetDialog = payload;

      return { ...state, openSavePresetDialog: openSavePresetDialog };
    }
    case ActionKind.FACTORMODAL: {
      const [openFactorDialog, editFactorDialog] = payload;

      return {
        ...state,
        openFactorDialog: openFactorDialog,
        editFactorDialog: editFactorDialog,
      };
    }

    case ActionKind.SETARENATITLE: {
      const currentInputValue = payload;
      return { ...state, arenaTitle: currentInputValue };
    }

    case ActionKind.ADDFACTOR: {
      const [factorName, weight] = payload;

      const newFactorOrder = [...state.factorOrder, factorName];

      const newFactorData = {
        ...state.factorData,
        [factorName]: weight,
      };

      return {
        ...state,
        factorData: newFactorData,
        factorOrder: newFactorOrder,
      };
    }
    case ActionKind.EDITFACTOR: {
      const [factorName, newWeight] = payload;

      const newFactorData = {
        ...state.factorData,
        [factorName]: newWeight,
      };
      return { ...state, factorData: newFactorData, whichFactorSelected: "" };
    }
    case ActionKind.REMOVEFACTOR: {
      const newFactorOrder = state.factorOrder.filter(
        (presetName) => presetName != state.whichFactorSelected
      );

      const { [state.whichFactorSelected]: _, ...newFactorData } =
        state.factorData;

      return {
        ...state,
        factorData: newFactorData,
        factorOrder: newFactorOrder,
      };
    }
    case ActionKind.LOADPRESET: {
      const [newFactorData, newFactorOrder] = payload;

      return {
        ...state,
        factorData: newFactorData,
        factorOrder: newFactorOrder,
      };
    }
    case ActionKind.SAVEPRESET: {
      const presetName = payload;

      if (presetName in state.presetOrder) {
        console.error("Preset with that name already exists!");
        return state;
      }

      const newPresetData = {
        ...state.presetData,
        [presetName]: {
          factorData: state.factorData,
          factorOrder: state.factorOrder,
        },
      };

      return {
        ...state,
        presetData: newPresetData,
        presetOrder: [...state.presetOrder, presetName],
      };
    }

    case ActionKind.DELETESAVEDPRESET: {
      const presetToBeDeleted = payload;

      const newPresetOrder = state.presetOrder.filter(
        (presetName) => presetName != presetToBeDeleted
      );
      const { [presetToBeDeleted]: _, ...newPresetData } = state.presetData;

      return {
        ...state,
        presetOrder: newPresetOrder,
        presetData: newPresetData,
      };
    }

    case ActionKind.CLICKFACTOR: {
      const factorName = payload;

      const whichFactorSelected =
        state.whichFactorSelected === factorName ? "" : factorName;
      return { ...state, whichFactorSelected: whichFactorSelected };
    }

    default: {
      return state;
    }
  }
}

export default AddArenaDialog;
