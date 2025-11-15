import Trial from "./Trial";
import { Box, Stack } from "@mui/system";
import { TrialData, SubtrialData } from "../pages/MainScreen/types";
import { Result } from "./types";

interface Props {
  trialData: TrialData;
  trialUuids: string[];
  subtrialData: SubtrialData;
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
  trialUuids,
  subtrialData,
  handleAddSubTrial,
  whichTrialSelected,
  handleClickTrial,
}) => {
  const trials = trialUuids.map((uuid) => {
    const trialTitle = trialData[uuid].trialTitle;
    const curTrialSubtrialUuids = trialData[uuid].subtrialData;

    console.log(
      `Cur trial uuid: ${uuid}, subtrialData: ${JSON.stringify(
        curTrialSubtrialUuids
      )}`
    );

    return (
      <Trial
        trialTitle={trialTitle}
        trialKey={uuid}
        handleClickTrial={handleClickTrial(uuid)}
        selected={whichTrialSelected === uuid}
        handleAddSubTrial={handleAddSubTrial}
        subtrialUuids={curTrialSubtrialUuids}
        subtrialData={subtrialData}
      />
    );
  });

  return (
    <Box sx={{ height: "80vh" }}>
      <Stack spacing={2}>{trials}</Stack>
    </Box>
  );
};
