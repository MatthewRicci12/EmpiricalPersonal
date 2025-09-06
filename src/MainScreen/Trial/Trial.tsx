
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import * as styles from './styles.tsx';
import DialogSkeleton from "../../DialogSkeleton/DialogSkeleton.tsx";
import SubTrialDialog, { RESULT_INDEX } from "./SubTrialDialog.tsx";
import { useState } from "react";
import { Result, SubTrialData } from './SubTrial.tsx';
import Button from '@mui/material/Button';
import AddSubTrialDialog from './AddSubTrialDialog.tsx';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';


function calculateTrialStatus(subTrialData: SubTrialData) {
    if (Object.keys(subTrialData).length === 0) return <styles.TrialEmpty><CheckIcon sx={styles.imgSx}/></styles.TrialEmpty>

    const counts = {
      successCount: 0,
      failureCount: 0
    }

    Object.keys(subTrialData).map( (key: string) => 
      subTrialData[key][RESULT_INDEX] === Result.SUCCESS ? counts.successCount++ : counts.failureCount++);
    
    if (counts.successCount > counts.failureCount) {
      return (
        <styles.TrialSuccess>
          <CheckIcon sx={styles.imgSx} />
        </styles.TrialSuccess>
      )
    } else if (counts.failureCount > counts.successCount) {
      return (
        <styles.TrialFailure>
          <CloseIcon sx={styles.imgSx} />
        </styles.TrialFailure>        
      )
    } else {
      return (
        <styles.TrialNeutral>
          <RemoveIcon sx={styles.imgSx} />
        </styles.TrialNeutral>        
      )
    }
}

interface Props {
  trialTitle: string,
  selected: boolean,
  handleClickTrial: React.MouseEventHandler<HTMLDivElement>,
}
const Trial: React.FC<Props> = ({ trialTitle, selected, handleClickTrial }) => {
  const [openSubTrialDialog, setOpenSubTrialDialog] = useState(false);
  const [openAddSubTrialDialog, setOpenAddSubTrialDialog] = useState(false);
  const [subTrialData, setSubTrialData] = useState<SubTrialData>({});
  const [subTrialOrder,setSubTrialOrder] = useState<(keyof SubTrialData)[]>([]);


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

  const handleAddSubTrial = (key: string, result: Result, date: string, data: string) => {
    handleCloseAddSubTrialDialog();
    setSubTrialOrder([...subTrialOrder, key]);

    const newSubTrialData = {
      ...subTrialData,
      [key]: [result, date, data] as [Result, string, string]
    }

    setSubTrialData(newSubTrialData);
  }

  const trialStatus = calculateTrialStatus(subTrialData);

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