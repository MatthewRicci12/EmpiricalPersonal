import { useState } from "react";
import { styles } from "./styles.tsx";
import DialogSkeleton from "../../DialogSkeleton/DialogSkeleton.tsx";
import SubTrialInfoDialog from "./SubTrialInfoDialog.tsx";
import CheckIcon from '@mui/icons-material/Check';

export type SubTrialData = Record<string, number>;


interface Props {
    title: string
}
const SubTrial: React.FC<Props> = () => {
   const [openSubTrialInfoDialog, setOpenSubTrialInfoDialog] = useState(false);


  const handleOpenSubTrialDialog = () => { //Triggered by add Tab button
    setOpenSubTrialInfoDialog(true);
  };

  const handleCloseSubTrialDialog = () => { //Triggered by Dialog x
    setOpenSubTrialInfoDialog(false);
  };


  return (
    <>
        <styles.SubTrialSuccess onClick={handleOpenSubTrialDialog}>
          <CheckIcon/>
        </styles.SubTrialSuccess>
        <DialogSkeleton
        open={openSubTrialInfoDialog}
        onClose={handleCloseSubTrialDialog}
        >
            <SubTrialInfoDialog/>
        </DialogSkeleton>
    </>
  );
}

export default SubTrial;