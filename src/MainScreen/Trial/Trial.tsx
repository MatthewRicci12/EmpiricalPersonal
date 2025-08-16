
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
import { v4 as uuidv4 } from 'uuid';
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

interface Props {
  trialTitle: string,
  selected: boolean,
  handleClickTrial: React.MouseEventHandler<HTMLDivElement>,
}
const Trial: React.FC<Props> = ({ trialTitle, selected, handleClickTrial }) => {
  const [openSubTrialDialog, setOpenSubTrialDialog] = useState(false);
  const [subTrialData, setSubTrialData] = useState<SubTrialData>();
  const [subTrialOrder,setSubTrialOrder] = useState<(keyof SubTrialData)[]>();


  const handleOpenSubTrialDialog = () => { //Triggered by add Tab button
    setOpenSubTrialDialog(true);
  };

  const handleCloseSubTrialDialog = () => { //Triggered by Dialog x
    setOpenSubTrialDialog(false);
  };

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
      </Stack>
      <DialogSkeleton
      open={openSubTrialDialog}
      onClose={handleCloseSubTrialDialog}
      >
        <SubTrialDialog/>
      </DialogSkeleton>
    </>

  );
}

export default Trial;