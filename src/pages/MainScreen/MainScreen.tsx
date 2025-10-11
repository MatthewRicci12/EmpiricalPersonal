import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import ConclusionScreen from "../ConclusionScreen.tsx";
import ContextMenuSkeleton from "../../utils/ContextMenuSkeleton.tsx";
import DialogSkeleton from "../../utils/DialogSkeleton.tsx";
import MenuItem from "@mui/material/MenuItem";
import React, { useReducer, useContext, useEffect } from "react";
import TopBar from "../../components/TopBar.tsx";
import { AddArenaDialog } from "../../components/AddArenaDialog/AddArenaDialog.tsx";
import { ArenaScreen } from "../../components/ArenaScreen.tsx";
import { ArenaTab } from "../../components/ArenaTab.tsx";
import { Result } from "../../components/types.tsx";
import { TrialInnerData } from "../../components/AddTrialDialog/types.tsx";
import { ArenaData, TrialData } from "./types.tsx";

interface Props {}
const MainScreen: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, initialStateFilled);
  // const handleDirty = useContext(DirtyContext);

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
    if (tabName in state.arenaData) {
      console.error(
        "Tab with that name already exists! (Some kind of UUID should be used as keys if that's supposed to be allowed.)"
      );
      return;
    }

    dispatch({ type: ActionKind.ADDARENA, payload: { tabName } });
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

    if (TrialInnerData.trialTitle in state.trialOrder) {
      console.error("Trial with that title already exists!");
      return state;
    }

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
    trialTitle: string,
    key: string,
    result: Result,
    date: string,
    data: string
  ) => {
    dispatch({
      type: ActionKind.ADDSUBTRIAL,
      payload: { trialTitle, key, result, date, data },
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

  const curTrialData = state.arenaData[state.whichArenaSelected] ?? {};

  return !state.displayConclusionsPage ? (
    <>
      <TopBar
        handleAddTrial={handleAddTrial}
        handleOpenConclusionsPage={handleOpenConclusionsPage}
        handleRemoveTrial={handleRemoveTrial}
        handleClear={handleClear}
        whichArenaSelected={state.whichArenaSelected}
      />
      <Box
        sx={{
          height: "90%",
          whiteSpace: "pre",
        }}
      >
        <ArenaScreen
          trialData={curTrialData}
          trialOrder={state.trialOrder}
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
      {state.arenaOrder.map((title, index) => {
        return (
          <ContextMenuSkeleton
            menuItems={[
              <MenuItem onClick={handleClickEditArena}>Edit Arena</MenuItem>,
              <MenuItem onClick={handleDeleteArena(title)}>
                Delete Arena
              </MenuItem>,
            ]}
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
      trialData={curTrialData}
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
  whichArenaSelected: keyof ArenaData | "";
  displayConclusionsPage: boolean;
  trialData: TrialData;
  trialOrder: (keyof TrialData)[];
  whichTrialSelected: keyof TrialData | "";
  windowTitle: string;
}

const initialState: State = {
  openAddArenaDialog: false,
  editArenaDialog: true,
  arenaData: {} as ArenaData,
  arenaOrder: [] as (keyof ArenaData)[],
  whichArenaSelected: "" as keyof ArenaData | "",
  displayConclusionsPage: false,
  trialData: {} as TrialData,
  trialOrder: [] as (keyof TrialData)[],
  whichTrialSelected: "" as keyof TrialData | "",
  windowTitle: "Personal Empirical",
};

const initialStateFilled: State = {
  openAddArenaDialog: false,
  editArenaDialog: true,
  arenaData: {
    f: {
      title: {
        trialTitle: "title",
        successString: "",
        failureString: "",
        additionalNotesString: "",
        indivFactorData: { x: 5 },
        indivFactorOrder: ["x"],
        subTrialData: { title: [Result.SUCCESS, "", ""] },
        subTrialOrder: ["title"],
      },
    },
  } as ArenaData,
  arenaOrder: ["f"] as (keyof ArenaData)[],
  whichArenaSelected: "f" as keyof ArenaData | "",
  displayConclusionsPage: false,
  trialData: {} as TrialData,
  trialOrder: ["title"] as (keyof TrialData)[],
  whichTrialSelected: "" as keyof TrialData | "",
  windowTitle: "Personal Empirical",
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
      const { tabName } = payload;

      const newArenaData = {
        ...state.arenaData,
        [tabName]: state.arenaData[tabName],
      };

      return {
        ...state,
        arenaOrder: [...state.arenaOrder, tabName],
        arenaData: newArenaData,
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

      const trialTitle = trialInnerData.trialTitle;

      const newTrialData = {
        ...state.arenaData[state.whichArenaSelected],
        [trialTitle]: trialInnerData,
      };

      const newArenaData = {
        ...state.arenaData,
        [state.whichArenaSelected]: newTrialData,
      };

      return {
        ...state,
        arenaData: newArenaData,
        trialData: newTrialData,
        trialOrder: [...state.trialOrder, trialTitle],
      };
    }

    case ActionKind.CONCLUSIONSPAGE: {
      const displayConclusionsPage = payload;
      return { ...state, displayConclusionsPage: displayConclusionsPage };
    }

    case ActionKind.ADDSUBTRIAL: {
      const { trialTitle, key, result, date, data } = payload;

      let trialData = state.arenaData[state.whichArenaSelected];
      let trialInnerData = trialData[trialTitle];

      trialInnerData.subTrialOrder = [...trialInnerData.subTrialOrder, key];
      trialInnerData.subTrialData = {
        ...trialInnerData.subTrialData,
        [key]: [result, date, data],
      };

      const newArenaData = {
        ...state.arenaData,
        [state.whichArenaSelected]: trialData,
      };

      return { ...state, arenaData: newArenaData };
    }

    case ActionKind.REMOVETRIAL: {
      const { [state.whichTrialSelected]: _, ...newTrialData } =
        state.trialData;

      const newTrialOrder = state.trialOrder.filter(
        (trialTitle) => trialTitle != state.whichTrialSelected
      );

      return {
        ...state,
        trialData: newTrialData,
        trialOrder: newTrialOrder,
        whichTrialSelected: "",
      };
    }

    case ActionKind.CLICKTRIAL: {
      const { title } = payload;

      let finalTitle = title ? "" : title;

      return { ...state, whichTrialSelected: finalTitle };
    }

    default: {
      return state;
    }
  }
}

export default MainScreen;
