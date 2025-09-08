import { Box, Stack } from "@mui/system";
import Trial from "../Trial/Trial";
import { useState } from "react";
import { TrialData } from "../MainScreen";
import { Result } from "../Trial/SubTrial";

interface Props {
  trialData: TrialData,
  handleAddSubTrial: (trialTitle: string, key: string, result: Result, date: string, data: string) => void
}

export const ArenaScreen: React.FC<Props> = ({ trialData, handleAddSubTrial }) => {
  const [whichTrialSelected, setTrialSelected] = useState<keyof TrialData>("");

  const handleClickTrial = (title: string): React.MouseEventHandler<HTMLDivElement> => (e) => {
    e.stopPropagation()
    whichTrialSelected === title ? setTrialSelected("") : setTrialSelected(title);
  }


  // Parameters for array.map are (singleItem, index?, fullArray?)
  //TODO: Order not enforced here.
  const trials = Object.keys(trialData).map((title, index) => (
    <Trial trialTitle={title} handleClickTrial={handleClickTrial(title)}
      selected={whichTrialSelected === title} key={`${title}-${index}`}
      handleAddSubTrial={handleAddSubTrial}
      subTrialData={trialData[title].subTrialData} subTrialOrder={trialData[title].subTrialOrder}/>
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

