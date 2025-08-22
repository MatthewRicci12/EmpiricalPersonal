import { useState } from "react";
import { styles } from "./styles.tsx";
import DialogSkeleton from "../../DialogSkeleton/DialogSkeleton.tsx";
import ViewSubTrialInfoDialog from "./ViewSubTrialDialog.tsx";
import CheckIcon from '@mui/icons-material/Check';
import ViewSubTrialDialog from "./ViewSubTrialDialog.tsx";

export type SubTrialData = Record<string, [string, string]>;


interface Props {
    date: string,
    data: string
}
const SubTrial: React.FC<Props> = ({date, data}) => {
   const [openViewSubTrialInfoDialog, setOpenViewSubTrialInfoDialog] = useState(false);


  const handleOpenViewSubTrialDialog = () => { //Triggered by add Tab button
    setOpenViewSubTrialInfoDialog(true);
  };

  const handleCloseViewSubTrialDialog = () => { //Triggered by Dialog x
    setOpenViewSubTrialInfoDialog(false);
  };


  return (
    <>
        <styles.SubTrialSuccess onClick={handleOpenViewSubTrialDialog}>
          <CheckIcon/>
        </styles.SubTrialSuccess>
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