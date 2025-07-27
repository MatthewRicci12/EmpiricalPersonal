import { Box, Stack } from "@mui/system";
import Trial from "./Trial/Trial";
import { useState } from "react";
import TopBar from "./TopBar";
import { TrialData } from "./MainScreen";
import { AddTrialDialogData } from "./AddTrialDialog";

interface ArenaScreenProps {
  trialData: TrialData
  handleAddTrial: (newTrialData: AddTrialDialogData) => void
}

export const ArenaScreen: React.FC<ArenaScreenProps> = ({ trialData, handleAddTrial }) => {
  const [whichTrialSelected, setTrialSelected] = useState<keyof TrialData>("");

  const handleClickTrial = (title: keyof TrialData) => {
    setTrialSelected(title);
  }

  // Parameters for array.map are (singleItem, index?, fullArray?)
  const trials = Object.keys(trialData).map((title) => {
    return <Trial trialTitle={title} key={title} handleClickTrial={handleClickTrial}
      selected={whichTrialSelected === title} />
  }
  );
  console.log(`Which trial selected: ${whichTrialSelected}`);
  console.log(`Index after map: ${trialData.length}`);

  return (
    <>
      {/* Since trials belong to arenas, I would do as much handling of them as possible within the arenas */}
      <TopBar handleAddTrial={handleAddTrial} />
      <Box sx={{ height: '80vh' }}>
        <Stack spacing={2}>
          {trials}
        </Stack>
      </Box>
    </>
  );
}

