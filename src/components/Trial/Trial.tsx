import * as styles from "./styles.tsx";
import AddSubTrialDialog from "./AddSubTrialDialog.tsx";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DialogSkeleton from "../../utils/DialogSkeleton.tsx";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SubTrialDialog, { RESULT_INDEX } from "./SubTrialDialog.tsx";
import { Result } from "./SubTrial.tsx";
import { SubTrialData } from "../../pages/MainScreen/MainScreen.tsx";
import { useState } from "react";

export function calculateTrialStatus(subTrialData: SubTrialData) {
  if (Object.keys(subTrialData).length === 0) return Result.EMPTY;

  const counts = {
    successCount: 0,
    failureCount: 0,
  };

  Object.keys(subTrialData).map((key: string) =>
    subTrialData[key][RESULT_INDEX] === Result.SUCCESS
      ? counts.successCount++
      : counts.failureCount++
  );

  if (counts.successCount > counts.failureCount) {
    return Result.SUCCESS;
  } else if (counts.failureCount > counts.successCount) {
    return Result.FAILURE;
  } else {
    return Result.NEUTRAL;
  }
}

interface Props {
  trialTitle: string;
  selected: boolean;
  handleClickTrial: React.MouseEventHandler<HTMLDivElement>;
  handleAddSubTrial: (
    trialTitle: string,
    key: string,
    result: Result,
    date: string,
    data: string
  ) => void;
  subTrialData: SubTrialData;
  subTrialOrder: (keyof SubTrialData)[];
}
const Trial: React.FC<Props> = ({
  trialTitle,
  selected,
  handleClickTrial,
  handleAddSubTrial,
  subTrialData,
  subTrialOrder,
}) => {
  const [openSubTrialDialog, setOpenSubTrialDialog] = useState(false);
  const [openAddSubTrialDialog, setOpenAddSubTrialDialog] = useState(false);

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
    //Triggered by add Tab button
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

  let trialStatus;

  switch (calculateTrialStatus(subTrialData)) {
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

  return (
    <>
      <Stack
        direction="row"
        sx={{ backgroundColor: selected ? "cyan" : "none" }}
        onClick={handleClickTrial}
        onDoubleClick={handleOpenSubTrialDialog}
      >
        {trialStatus}

        <Typography sx={styles.trialTitleStyle}>{trialTitle}</Typography>

        <Typography sx={styles.skepTextStyle}>hello</Typography>

        <Button onClick={handleOpenAddSubTrialDialog}>Add Sub-Trial</Button>
      </Stack>

      <DialogSkeleton
        open={openAddSubTrialDialog}
        onClose={handleCloseAddSubTrialDialog}
      >
        <AddSubTrialDialog
          handleCloseAddSubTrialDialog={handleCloseAddSubTrialDialog}
          handleAddSubTrial={handleAddSubTrial}
          trialTitle={trialTitle}
        />
      </DialogSkeleton>

      <DialogSkeleton
        open={openSubTrialDialog}
        onClose={handleCloseSubTrialDialog}
      >
        <SubTrialDialog
          subTrialData={subTrialData}
          subTrialOrder={subTrialOrder}
        />
      </DialogSkeleton>
    </>
  );
};

export default Trial;
