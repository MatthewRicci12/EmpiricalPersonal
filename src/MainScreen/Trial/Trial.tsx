
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import * as styles from './styles.tsx';
import DialogSkeleton from "../../DialogSkeleton/DialogSkeleton.tsx";
import SubTrialDialog, { RESULT_INDEX } from "./SubTrialDialog.tsx";
import { useState } from "react";
import { Result} from './SubTrial.tsx';
import Button from '@mui/material/Button';
import AddSubTrialDialog from './AddSubTrialDialog.tsx';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { SubTrialData } from '../MainScreen.tsx';


export function calculateTrialStatus(subTrialData: SubTrialData) {
    if (Object.keys(subTrialData).length === 0) return Result.EMPTY

    const counts = {
      successCount: 0,
      failureCount: 0
    }

    Object.keys(subTrialData).map( (key: string) => 
      subTrialData[key][RESULT_INDEX] === Result.SUCCESS ? counts.successCount++ : counts.failureCount++);
    
    if (counts.successCount > counts.failureCount) {
      return Result.SUCCESS;
    } else if (counts.failureCount > counts.successCount) {
      return Result.FAILURE;
    } else {
      return Result.NEUTRAL;
    }
}

interface Props {
  trialTitle: string,
  selected: boolean,
  handleClickTrial: React.MouseEventHandler<HTMLDivElement>,
  handleAddSubTrial: (trialTitle: string, key: string, result: Result, date: string, data: string) => void,
  subTrialData: SubTrialData,
  subTrialOrder: (keyof SubTrialData)[]
}
const Trial: React.FC<Props> = ({ trialTitle, selected, handleClickTrial, handleAddSubTrial, subTrialData, subTrialOrder }) => {
  const [openSubTrialDialog, setOpenSubTrialDialog] = useState(false);
  const [openAddSubTrialDialog, setOpenAddSubTrialDialog] = useState(false);


  const handleOpenSubTrialDialog = () => { //Triggered by add Tab button
    setOpenSubTrialDialog(true);
  };

  const handleCloseSubTrialDialog = () => { //Triggered by Dialog x
    setOpenSubTrialDialog(false);
  };


  const handleOpenAddSubTrialDialog = () => { //Triggered by add Tab button
    setOpenAddSubTrialDialog(true);
  };

  const handleCloseAddSubTrialDialog = () => { //Triggered by Dialog x
    setOpenAddSubTrialDialog(false);
  };

  let trialStatus;

  switch (calculateTrialStatus(subTrialData)) {
    case Result.SUCCESS:
      trialStatus = 
      <styles.TrialSuccess>
        <CheckIcon sx={styles.imgSx} />
      </styles.TrialSuccess>
      break;
    case Result.FAILURE:
      trialStatus = 
      <styles.TrialFailure>
        <CloseIcon sx={styles.imgSx} />
      </styles.TrialFailure>       
      break;
    case Result.NEUTRAL:
      trialStatus = 
      <styles.TrialNeutral>
        <RemoveIcon sx={styles.imgSx} />
      </styles.TrialNeutral>  
      break;
    case Result.EMPTY:
      trialStatus =
      <styles.TrialEmpty><CheckIcon sx={styles.imgSx}/></styles.TrialEmpty>
      break;
  }

  return (
    <>
      <Stack direction="row" sx={{ backgroundColor: selected ? 'cyan' : 'none' }} onClick={handleClickTrial} onDoubleClick={handleOpenSubTrialDialog}>
        {trialStatus}
        <Typography sx={styles.trialTitleStyle}>
          {trialTitle}
        </Typography>
        <Typography sx={styles.skepTextStyle}>
          hello
        </Typography>
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
}

export default Trial;