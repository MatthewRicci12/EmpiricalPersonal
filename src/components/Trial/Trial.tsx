import * as styles from "./styles.tsx";
import AddSubTrialDialog from "./AddSubTrialDialog.tsx";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DialogSkeleton from "../../utils/DialogSkeleton.tsx";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SubTrialDialog from "./SubTrialDialog.tsx";
import { SubtrialData } from "../../pages/MainScreen/types.tsx";
import { useState } from "react";
import { Result } from "../types.tsx";
import { RESULT_INDEX } from "./types.tsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ViewTrialNotesDialog } from "./ViewTrialNotesDialog.tsx";

interface Props {
  trialTitle: string;
  trialKey: string;
  successString: string;
  failureString: string;
  additionalNotesString: string;
  selected: boolean;
  handleClickTrial: React.MouseEventHandler<HTMLDivElement>;
  handleAddSubTrial: (
    trialTitle: string,
    key: string,
    result: Result,
    date: string,
    data: string
  ) => void;
  subtrialUuids: string[];
  subtrialData: SubtrialData;
  id: string;
}
const Trial: React.FC<Props> = ({
  trialTitle,
  trialKey,
  successString,
  failureString,
  additionalNotesString,
  selected,
  handleClickTrial,
  handleAddSubTrial,
  subtrialUuids,
  subtrialData,
  id,
}) => {
  const [openSubTrialDialog, setOpenSubTrialDialog] = useState(false);
  const [openAddSubTrialDialog, setOpenAddSubTrialDialog] = useState(false);
  const [openViewTrialNotesDialog, setOpenViewTrialNotesDialog] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOpenSubTrialDialog: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    //Triggered by add Tab button
    e.stopPropagation();
    setOpenSubTrialDialog(true);
  };

  const handleCloseSubTrialDialog: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    //Triggered by Dialog x
    e.stopPropagation();
    setOpenSubTrialDialog(false);
  };

  const handleOpenAddSubTrialDialog: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.stopPropagation();
    setOpenAddSubTrialDialog(true);
  };

  const handleCloseAddSubTrialDialog: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    //Triggered by Dialog x
    e.stopPropagation();
    setOpenAddSubTrialDialog(false);
  };

  const handleOpenViewTrialNotesDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpenViewTrialNotesDialog(true);
  };

  const handleCloseViewTrialNotesDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpenViewTrialNotesDialog(false);
  };


  let trialStatus;

  if (subtrialUuids.length === 0) {
    trialStatus = (
      <styles.TrialEmpty>
        <CheckIcon sx={styles.imgSx} />
      </styles.TrialEmpty>
    );
  } else {
    switch (calculateTrialStatus(subtrialUuids, subtrialData)) {
      case Result.SUCCESS:
        trialStatus = (
          <styles.TrialSuccess>
            <CheckIcon sx={styles.imgSx} />
          </styles.TrialSuccess>
        );
        break;

      case Result.FAILURE:
        trialStatus = (
          <styles.TrialFailure>
            <CloseIcon sx={styles.imgSx} />
          </styles.TrialFailure>
        );
        break;

      case Result.NEUTRAL:
        trialStatus = (
          <styles.TrialNeutral>
            <RemoveIcon sx={styles.imgSx} />
          </styles.TrialNeutral>
        );
        break;

      case Result.EMPTY:
        trialStatus = (
          <styles.TrialEmpty>
            <CheckIcon sx={styles.imgSx} />
          </styles.TrialEmpty>
        );
        break;
    }
  }

  return (
    <>
      <Stack
        direction="row"
        sx={{ backgroundColor: selected ? "cyan" : "none" }}
        onClick={handleClickTrial}
        onDoubleClick={handleOpenSubTrialDialog}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {trialStatus}

        <Typography sx={styles.trialTitleStyle}>{trialTitle}</Typography>

        <Button onPointerDown={(event) => event.stopPropagation()} onClick={handleOpenAddSubTrialDialog}>Add Sub-Trial</Button>
        <Button onPointerDown={(event) => event.stopPropagation()} onClick={handleOpenViewTrialNotesDialog}>View Notes</Button>
      </Stack>

      <DialogSkeleton
        open={openAddSubTrialDialog}
        onClose={handleCloseAddSubTrialDialog}
      >
        <AddSubTrialDialog
          handleCloseAddSubTrialDialog={handleCloseAddSubTrialDialog}
          handleAddSubTrial={handleAddSubTrial}
          trialKey={trialKey}
        />
      </DialogSkeleton>

      <DialogSkeleton
        open={openSubTrialDialog}
        onClose={handleCloseSubTrialDialog}
      >
        <SubTrialDialog
          subtrialData={subtrialData}
          subtrialUuids={subtrialUuids}
        />
      </DialogSkeleton>

      <DialogSkeleton
        open={openViewTrialNotesDialog}
        onClose={handleCloseViewTrialNotesDialog}
      >
        <ViewTrialNotesDialog
          successString={successString}
          failureString={failureString}
          additionalNotesString={additionalNotesString}
        />
      </DialogSkeleton>

    </>

  );
};

export function calculateTrialStatus(
  subtrialUuids: (keyof SubtrialData)[],
  subtrialData: SubtrialData
) {
  if (Object.keys(subtrialData).length === 0) return Result.EMPTY;

  const counts = {
    successCount: 0,
    failureCount: 0,
  };

  subtrialUuids.map((key: string) => {
    subtrialData[key][RESULT_INDEX] === Result.SUCCESS
      ? counts.successCount++
      : counts.failureCount++;
  });

  if (counts.successCount > counts.failureCount) {
    return Result.SUCCESS;
  } else if (counts.failureCount > counts.successCount) {
    return Result.FAILURE;
  } else {
    return Result.NEUTRAL;
  }
}

export default Trial;
