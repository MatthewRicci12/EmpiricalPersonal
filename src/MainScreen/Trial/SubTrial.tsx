import { useState } from "react";
import { styles } from "./styles.tsx";
import DialogSkeleton from "../../DialogSkeleton/DialogSkeleton.tsx";
import ViewSubTrialInfoDialog from "./ViewSubTrialDialog.tsx";
import CheckIcon from '@mui/icons-material/Check';
import ViewSubTrialDialog from "./ViewSubTrialDialog.tsx";
import CloseIcon from '@mui/icons-material/Close';


export enum Result {
  SUCCESS,
  FAILURE
}

interface Props {
    result: Result
    date: string,
    data: string
}
const SubTrial: React.FC<Props> = ({result, date, data}) => {
   const [openViewSubTrialInfoDialog, setOpenViewSubTrialInfoDialog] = useState(false);


  const handleOpenViewSubTrialDialog = () => { //Triggered by add Tab button
    setOpenViewSubTrialInfoDialog(true);
  };

  const handleCloseViewSubTrialDialog = () => { //Triggered by Dialog x
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
        onClose={handleCloseViewSubTrialDialog}
        >
            <ViewSubTrialDialog
            date={date}
            data={data}
            />
        </DialogSkeleton>
    </>
  );
}

export default SubTrial;