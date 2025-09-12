import { Box, Stack } from "@mui/system";
import Trial from "../Trial/Trial";
import { TrialData } from "../MainScreen";
import { Result } from "../Trial/SubTrial";

interface Props {
  trialData: TrialData,
  trialOrder: (keyof TrialData)[],
  handleAddSubTrial: (trialTitle: string, key: string, result: Result, date: string, data: string) => void,
  whichTrialSelected: string,
  handleClickTrial: (title: string) => React.MouseEventHandler<HTMLDivElement>
}

export const ArenaScreen: React.FC<Props> = ({ trialData, trialOrder, handleAddSubTrial, whichTrialSelected, handleClickTrial}) => {
  // Parameters for array.map are (singleItem, index?, fullArray?)
  //TODO: Order not enforced here.
  const trials = trialOrder.map((title, index) => (
    <Trial trialTitle={title} handleClickTrial={handleClickTrial(title)}
      selected={whichTrialSelected === title} key={`${title}-${index}`}
      handleAddSubTrial={handleAddSubTrial}
      subTrialData={trialData[title].subTrialData} 
      subTrialOrder={trialData[title].subTrialOrder}/>
    )
  );

  return (
    <Box sx={{ height: '80vh' }}>
      <Stack spacing={2}>
        {trials}
      </Stack>
    </Box>
  );
}

