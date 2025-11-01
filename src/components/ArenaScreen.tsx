import Trial from "./Trial";
import { Box, Stack } from "@mui/system";
import { TrialData } from "../pages/MainScreen/types";
import { Result } from "./types";

interface Props {
  trialData: TrialData;
  trialOrder: (keyof TrialData)[];
  handleAddSubTrial: (
    trialTitle: string,
    key: string,
    result: Result,
    date: string,
    data: string
  ) => void;
  whichTrialSelected: string;
  handleClickTrial: (title: string) => React.MouseEventHandler<HTMLDivElement>;
}
export const ArenaScreen: React.FC<Props> = ({
  trialData,
  trialOrder,
  handleAddSubTrial,
  whichTrialSelected,
  handleClickTrial,
}) => {
  const trials = trialOrder.map((title, index) => (
    <Trial
      trialTitle={title}
      handleClickTrial={handleClickTrial(title)}
      selected={whichTrialSelected === title}
      key={`${title}-${index}`}
      handleAddSubTrial={handleAddSubTrial}
      subtrialData={trialData[title].subtrialData}
      subtrialOrder={trialData[title].subtrialOrder}
    />
  ));

  return (
    <Box sx={{ height: "80vh" }}>
      <Stack spacing={2}>{trials}</Stack>
    </Box>
  );
};
