import { useState } from "react";
import { styles } from "./styles.tsx";
import DialogSkeleton from "../../DialogSkeleton/DialogSkeleton.tsx";
import CheckIcon from '@mui/icons-material/Check';
import ViewSubTrialDialog from "./ViewSubTrialDialog.tsx";
import CloseIcon from '@mui/icons-material/Close';

export enum Result {
  SUCCESS,
  FAILURE,
  NEUTRAL,
  EMPTY
}

interface Props {
    result: Result
    date: string,
    data: string
}
const SubTrial: React.FC<Props> = ({result, date, data}) => {
   const [openViewSubTrialInfoDialog, setOpenViewSubTrialInfoDialog] = useState(false);

<<<<<<< HEAD
  const handleOpenViewSubTrialDialog = () => {
    setOpenViewSubTrialInfoDialog(true);
  };

  const handleCloseViewSubTrialDialog = () => {
=======

  const handleOpenViewSubTrialDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => {//Triggered by add Tab button
    setOpenViewSubTrialInfoDialog(true);
  };

  const handleCloseViewSubTrialDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => { //Triggered by Dialog x
>>>>>>> refs/remotes/origin/main
    setOpenViewSubTrialInfoDialog(false);
  };

  return (
    <>
        {
        result === Result.SUCCESS ?
        <styles.SubTrialSuccess onClick={handleOpenViewSubTrialDialog}>
          <CheckIcon/>
        </styles.SubTrialSuccess>
        :
        <styles.SubTrialFailure onClick={handleOpenViewSubTrialDialog}>
          <CloseIcon/>
        </styles.SubTrialFailure>        
        }   

        <DialogSkeleton
        open={openViewSubTrialInfoDialog}
        onClose={handleCloseViewSubTrialDialog}>
            <ViewSubTrialDialog
            date={date}
            data={data}/>
        </DialogSkeleton>
    </>
  );
}

export default SubTrial;