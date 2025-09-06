import { Box, Stack } from "@mui/system";
import Trial from "../Trial/Trial";
import { useState } from "react";
import TopBar from "../TopBar";
import { TrialData } from "../MainScreen";
import { AddTrialDialogData } from "../AddTrialDialog";

interface Props {
  trialData: TrialData
}

export const ArenaScreen: React.FC<Props> = ({ trialData}) => {
  const [whichTrialSelected, setTrialSelected] = useState<keyof TrialData>("");

  const handleClickTrial = (title: string): React.MouseEventHandler<HTMLDivElement> => (e) => {
    e.stopPropagation()
    whichTrialSelected === title ? setTrialSelected("") : setTrialSelected(title);
  }


  // Parameters for array.map are (singleItem, index?, fullArray?)
  //TODO: Order not enforced here.
  const trials = Object.keys(trialData).map((title, index) => (
    <Trial trialTitle={title} handleClickTrial={handleClickTrial(title)}
      selected={whichTrialSelected === title} key={`${title}-${index}`}/>
    )
  );

  return (
    <>
      <Box sx={{ height: '80vh' }}>
        <Stack spacing={2}>
          {trials}
        </Stack>
      </Box>
    </>
  );
}

