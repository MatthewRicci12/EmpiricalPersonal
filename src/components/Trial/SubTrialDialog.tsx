import Box from "@mui/system/Box";
import SubTrial from "./SubTrial.tsx";
import { SubtrialData } from "../../pages/MainScreen/types.tsx";
import { RESULT_INDEX, DATE_INDEX, DATA_INDEX } from "./types.tsx";

interface Props {
  subtrialData: SubtrialData;
  subtrialOrder: (keyof SubtrialData)[];
}
export const SubTrialDialog: React.FC<Props> = ({
  subtrialData,
  subtrialOrder,
}) => {
  return (
    <Box
      sx={{
        height: "200px",
        width: "600px",
        backgroundColor: "#66ccff",
      }}
    >
      {subtrialOrder.map((subTrialKey) => (
        <SubTrial
          result={subtrialData[subTrialKey][RESULT_INDEX]}
          date={subtrialData[subTrialKey][DATE_INDEX]}
          data={subtrialData[subTrialKey][DATA_INDEX]}
          key={subTrialKey}
        />
      ))}
    </Box>
  );
};

export default SubTrialDialog;
