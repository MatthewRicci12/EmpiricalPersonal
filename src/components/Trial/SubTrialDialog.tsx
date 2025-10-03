import Box from "@mui/system/Box";
import SubTrial from "./SubTrial.tsx";
import { SubTrialData } from "../../pages/MainScreen/types.tsx";
import { RESULT_INDEX, DATE_INDEX, DATA_INDEX } from "./types.tsx";

interface Props {
  subTrialData: SubTrialData;
  subTrialOrder: (keyof SubTrialData)[];
}
export const SubTrialDialog: React.FC<Props> = ({
  subTrialData,
  subTrialOrder,
}) => {
  return (
    <Box
      sx={{
        height: "200px",
        width: "600px",
        backgroundColor: "#66ccff",
      }}
    >
      {subTrialOrder.map((subTrialKey) => (
        <SubTrial
          result={subTrialData[subTrialKey][RESULT_INDEX]}
          date={subTrialData[subTrialKey][DATE_INDEX]}
          data={subTrialData[subTrialKey][DATA_INDEX]}
          key={subTrialKey}
        />
      ))}
    </Box>
  );
};

export default SubTrialDialog;
