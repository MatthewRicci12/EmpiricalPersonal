
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import * as styles from './styles.tsx';
import DialogSkeleton from "../../DialogSkeleton/DialogSkeleton.tsx";
import SubTrialDialog from "./SubTrialDialog.tsx";
import { useState } from "react";
import SubTrial, { SubTrialData } from './SubTrial.tsx';
import Button from '@mui/material/Button';
import AddSubTrialDialog from './AddSubTrialDialog.tsx';

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

  const handleAddSubTrial = (key: string, date: string, data: string) => {
    handleCloseAddSubTrialDialog();
    setSubTrialOrder([...subTrialOrder, key]);

    const newSubTrialData = {
      ...subTrialData,
      [key]: [date, data] as [string, string]
    }

    setSubTrialData(newSubTrialData);
  }

  return (
    <>
      <Stack direction="row" sx={{ backgroundColor: selected ? 'cyan' : 'none' }} onClick={handleClickTrial} onDoubleClick={handleOpenSubTrialDialog}>
        <styles.TrialSuccess>
          <CheckIcon sx={styles.imgSx} />
        </styles.TrialSuccess>
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