import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DialogSkeleton from "../../DialogSkeleton/DialogSkeleton.tsx";
import ViewSubTrialDialog from "./ViewSubTrialDialog.tsx";
import { styles } from "./styles.tsx";
import { useState } from "react";

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


  const handleOpenViewSubTrialDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => {//Triggered by add Tab button
    setOpenViewSubTrialInfoDialog(true);
  };

  const handleCloseViewSubTrialDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => { //Triggered by Dialog x
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