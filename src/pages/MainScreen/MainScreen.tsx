import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import ConclusionScreen from "../ConclusionScreen.tsx";
import ContextMenuSkeleton from "../../utils/ContextMenuSkeleton.tsx";
import DialogSkeleton from "../../utils/DialogSkeleton.tsx";
import MenuItem from "@mui/material/MenuItem";
import React, { useReducer, useEffect } from "react";
import TopBar from "../../components/TopBar.tsx";
import { AddArenaDialog } from "../../components/AddArenaDialog/AddArenaDialog.tsx";
import { ArenaScreen } from "../../components/ArenaScreen.tsx";
import { ArenaTab } from "../../components/ArenaTab.tsx";
import { Result } from "../../components/types.tsx";
import { TrialInnerData } from "../../components/AddTrialDialog/types.tsx";
import { ArenaData, TrialData, SubtrialData } from "./types.tsx";
import { useDirtyState } from "../../contexts/DirtyStateContext.tsx";
import { useGlobalShortcut } from "../../hooks/DirtyState.tsx";
import { v4 as uuidv4 } from "uuid";

interface Props {}
const MainScreen: React.FC<Props> = () => {
  // Notice this is not using useState. This is RETRIEVING the context value.
  const { isDirty, setDirty } = useDirtyState();

  const [state, dispatch] = useReducer(reducer, initialState);

  const saveData = () => {
    setDirty(false);
  };

  // This is basically just a wrapped useEffect call to add a global Ctrl+S shortcut.
  // Setting dirty equal to false is obviously what we wanna do upon ctrl+s.
  // isDirty is only passed so we can no-op if there's nothing to save.
  useGlobalShortcut(isDirty, saveData);

  const handleOpenArenaDialog: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    dispatch({ type: ActionKind.ARENAMODAL, payload: [false, true] });
  };

  const handleCloseArenaDialog: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    dispatch({ type: ActionKind.ARENAMODAL, payload: [false, false] });
  };

  const handleClickEditArena = () => {
    dispatch({ type: ActionKind.ARENAMODAL, payload: [true, true] });
  };

  // Subroutine of submit button handler in AddArenaDialog.
  const handleAddArena = (tabName: string) => {
    setDirty(true);

    if (tabName in state.arenaData) {
      console.error(
        "Tab with that name already exists! (Some kind of UUID should be used as keys if that's supposed to be allowed.)"
      );
      return;
    }

    dispatch({ type: ActionKind.ADDARENA, payload: tabName });
  };

  // Subroutine of submit button handler in AddArenaDialog when editing an arena.
  const handleEditArena = (curArenaName: string) => (newName: string) => {
    dispatch({
      type: ActionKind.EDITARENA,
      payload: { curArenaName, newName },
    });
  };

  const handleDeleteArena =
    (arenaTitle: string): React.MouseEventHandler<HTMLLIElement> =>
    (e) => {
      e.stopPropagation();
      dispatch({ type: ActionKind.DELETEARENA, payload: { arenaTitle } });
    };

  const handleClickArena =
    (title: string): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.stopPropagation();
      dispatch({ type: ActionKind.CLICKARENA, payload: title });
    };

  // Subroutine of event handler in AddTrialDialog.
  const handleAddTrial = (TrialInnerData: TrialInnerData) => {
    // Can't add trial if no arena selected.
    if (state.whichArenaSelected === "") {
      return;
    }

    //TODO: Need to do a loop to check this.
    // Also it only matters if it exists in the CURRENT ARENA.

    // if (TrialInnerData.trialTitle in state.trialOrder) {
    //   console.error("Trial with that title already exists!");
    //   return state;
    // }

    dispatch({ type: ActionKind.ADDTRIAL, payload: TrialInnerData });
  };

  // Subroutine
  const handleOpenConclusionsPage = () => {
    dispatch({ type: ActionKind.CONCLUSIONSPAGE, payload: true });
  };

  // Subroutine
  const handleClickBackButton = () => {
    dispatch({ type: ActionKind.CONCLUSIONSPAGE, payload: false });
  };

  // Subroutine of event handler in ArenaScreen.
  const handleAddSubTrial = (
    trialKey: string,
    subtrialKey: string,
    result: Result,
    date: string,
    data: string
  ) => {
    dispatch({
      type: ActionKind.ADDSUBTRIAL,
      payload: { trialKey, subtrialKey, result, date, data },
    });
  };

  const handleRemoveTrial: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (state.whichArenaSelected === "" || state.whichTrialSelected === "") {
      return;
    }
    dispatch({
      type: ActionKind.REMOVETRIAL,
      payload: {},
    });
  };

  const handleClickTrial =
    (title: string): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      e.stopPropagation();
      dispatch({ type: ActionKind.CLICKTRIAL, payload: title });
    };

  //TODO: Reduce
  // Event already stopped in TopBar.
  const handleClear = () => {
    dispatch({ type: ActionKind.CLEAR, payload: {} });
  };

  const trialUuids = state.arenaData[state.whichArenaSelected] ?? [];

  return !state.displayConclusionsPage ? (
    <>
      <TopBar
        handleAddTrial={handleAddTrial}
        handleOpenConclusionsPage={handleOpenConclusionsPage}
        handleRemoveTrial={handleRemoveTrial}
        handleClear={handleClear}
        whichArenaSelected={state.whichArenaSelected}
        arenaData={state.arenaData}
      />
      <Box
        sx={{
          height: "90%",
          whiteSpace: "pre",
        }}
      >
        <ArenaScreen
          trialData={state.trialData}
          trialUuids={trialUuids}
          subtrialData={state.subtrialData}
          key={state.whichArenaSelected}
          handleAddSubTrial={handleAddSubTrial}
          whichTrialSelected={state.whichTrialSelected}
          handleClickTrial={handleClickTrial}
        />
      </Box>

      {/* Button to add a new Arena */}
      <Button onClick={handleOpenArenaDialog}>
        <AddIcon />
      </Button>
      <DialogSkeleton
        open={state.openAddArenaDialog}
        onClose={handleCloseArenaDialog}
      >
        <AddArenaDialog
          handleAddArena={handleAddArena}
          handleCloseArenaDialog={handleCloseArenaDialog}
          handleEditArena={handleEditArena(state.whichArenaSelected)}
          edit={state.editArenaDialog}
        />
      </DialogSkeleton>

      {/* Arena Tabs */}
      {state.arenaOrder.map((title: string, index) => {
        return (
          <ContextMenuSkeleton
            menuItems={[
              <MenuItem
                key={`${title}-${index}`}
                onClick={handleClickEditArena}
              >
                Edit Arena
              </MenuItem>,
              <MenuItem
                key={`${title}-${index}`}
                onClick={handleDeleteArena(title)}
              >
                Delete Arena
              </MenuItem>,
            ]}
            leftClick={false}
            key={`${title}-${index}`}
          >
            <ArenaTab
              title={title}
              handleClickArena={handleClickArena(title)}
              selected={title === state.whichArenaSelected}
              key={`${title}-${index}`}
            />
          </ContextMenuSkeleton>
        );
      })}
    </>
  ) : (
    <ConclusionScreen
      handleClickBackButton={handleClickBackButton}
      trialData={state.trialData}
      subtrialData={state.subtrialData}
    />
  );
};

enum ActionKind {
  ARENAMODAL = "ARENAMODAL",
  CONCLUSIONSPAGE = "CONCLUSIONSPAGE",

  ADDARENA = "ADDARENA",
  EDITARENA = "EDITARENA",
  DELETEARENA = "DELETEARENA",
  CLICKARENA = "CLICKARENA",

  ADDTRIAL = "ADDTRIAL",
  REMOVETRIAL = "REMOVETRIAL",
  CLICKTRIAL = "CLICKTRIAL",
  ADDSUBTRIAL = "ADDSUBTRIAL",

  CLEAR = "CLEAR",
}

interface Action {
  type: ActionKind;
  payload: any;
}

interface State {
  openAddArenaDialog: boolean;
  editArenaDialog: boolean;

  arenaData: ArenaData;
  arenaOrder: (keyof ArenaData)[];
  trialData: TrialData;
  subtrialData: SubtrialData;

  whichArenaSelected: keyof ArenaData | "";
  displayConclusionsPage: boolean;
  whichTrialSelected: keyof TrialData | "";
  windowTitle: string;
  dirty: boolean;
}

const initialState: State = {
  openAddArenaDialog: false,
  editArenaDialog: true,

  arenaData: {} as ArenaData,
  arenaOrder: [] as (keyof ArenaData)[],
  trialData: {} as TrialData,
  subtrialData: {} as SubtrialData,

  whichArenaSelected: "f" as keyof ArenaData | "",
  displayConclusionsPage: false,
  whichTrialSelected: "" as keyof TrialData | "",
  windowTitle: "Personal Empirical",
  dirty: false,
};

const initialStateFilled: State = {
  openAddArenaDialog: false,
  editArenaDialog: true,

  arenaData: { "Arena 1": ["0", "1"] } as ArenaData,
  arenaOrder: ["Arena 1"] as (keyof ArenaData)[],

  trialData: {
    "0": {
      trialTitle: "Trial 1",
      successString: "",
      failureString: "",
      additionalNotesString: "",
      indivFactorData: { x: 5 },
      indivFactorOrder: ["x"],
      subtrialData: ["0", "1"],
    },
    "1": {
      trialTitle: "Trial 2",
      successString: "",
      failureString: "",
      additionalNotesString: "",
      indivFactorData: { x: 5 },
      indivFactorOrder: ["x"],
      subtrialData: ["2", "3"],
    },
  } as TrialData,

  subtrialData: {
    "2": [Result.SUCCESS, "2024-01-01", "Data"],
    "3": [Result.FAILURE, "2024-01-02", "Data"],
  } as SubtrialData,

  whichArenaSelected: "f" as keyof ArenaData | "",
  displayConclusionsPage: false,
  whichTrialSelected: "" as keyof TrialData | "",
  windowTitle: "Personal Empirical",
  dirty: false,
};

function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.CLEAR: {
      return initialState;
    }

    case ActionKind.ARENAMODAL: {
      const [editArenaDialog, openAddArenaDialog] = payload;

      return {
        ...state,
        editArenaDialog: editArenaDialog,
        openAddArenaDialog: openAddArenaDialog,
      };
    }

    case ActionKind.ADDARENA: {
      const tabName: string = payload;

      const newArenaData = {
        ...state.arenaData,
        [tabName]: [] as string[],
      };

      return {
        ...state,
        arenaOrder: [...state.arenaOrder, tabName],
        arenaData: newArenaData,
        dirty: true,
      };
    }

    case ActionKind.EDITARENA: {
      const { curArenaName, newName } = payload;

      let newArenaData: ArenaData = {
        ...state.arenaData,
        [newName]: state.arenaData[curArenaName],
      };

      delete newArenaData[curArenaName];

      const newArenaOrder = state.arenaOrder.map((arenaTitle) => {
        if (arenaTitle === curArenaName) {
          return newName;
        } else {
          return arenaTitle;
        }
      });

      return { ...state, arenaData: newArenaData, arenaOrder: newArenaOrder };
    }

    case ActionKind.DELETEARENA: {
      const { arenaTitle } = payload;

      let newArenaOrder = state.arenaOrder.filter(
        (curArenaTitle) => curArenaTitle != arenaTitle
      );
      const { [arenaTitle]: _, ...newArenaData } = state.arenaData;
      return { ...state, arenaData: newArenaData, arenaOrder: newArenaOrder };
    }

    case ActionKind.CLICKARENA: {
      const tabName = payload;

      return {
        ...state,
        whichArenaSelected: tabName,
        whichTrialSelected: "",
      };
    }

    case ActionKind.ADDTRIAL: {
      const trialInnerData = payload;

      const key = uuidv4();
      const curTrialList = state.arenaData[state.whichArenaSelected];

      const newArenaData = {
        ...state.arenaData,
        [state.whichArenaSelected]: [...curTrialList, key],
      };

      const newTrialData = {
        ...state.trialData,
        [key]: trialInnerData,
      };

      return {
        ...state,
        arenaData: newArenaData,
        trialData: newTrialData,
      };
    }

    case ActionKind.CONCLUSIONSPAGE: {
      const displayConclusionsPage = payload;
      return { ...state, displayConclusionsPage: displayConclusionsPage };
    }

    case ActionKind.ADDSUBTRIAL: {
      const { trialKey, subtrialKey, result, date, data } = payload;

      const newTrialData = {
        ...state.trialData,
        [trialKey]: {
          ...state.trialData[trialKey],
          subtrialData: [
            ...state.trialData[trialKey].subtrialData,
            subtrialKey,
          ],
        },
      };

      const newSubTrialData = {
        ...state.subtrialData,
        [subtrialKey]: [result, date, data],
      };

      return {
        ...state,
        trialData: newTrialData,
        subtrialData: newSubTrialData,
      };
    }

    case ActionKind.REMOVETRIAL: {
      const { [state.whichTrialSelected]: _, ...newTrialData } =
        state.trialData;

      const newArenaData = state.arenaData[state.whichArenaSelected].filter(
        (trialKey) => trialKey != state.whichTrialSelected
      );

      const updatedArenaData = {
        ...state.arenaData,
        [state.whichArenaSelected]: newArenaData,
      };

      return {
        ...state,
        arenaData: updatedArenaData,
        trialData: newTrialData,
        whichTrialSelected: "",
      };
    }

    case ActionKind.CLICKTRIAL: {
      const title = payload;

      let finalTitle = state.whichTrialSelected !== "" ? "" : title;

      return { ...state, whichTrialSelected: finalTitle };
    }

    default: {
      return state;
    }
  }
}

export default MainScreen;
