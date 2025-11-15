import Box from "@mui/system/Box";
import SubTrial from "./SubTrial.tsx";
import { SubtrialData } from "../../pages/MainScreen/types.tsx";
import { RESULT_INDEX, DATE_INDEX, DATA_INDEX } from "./types.tsx";

interface Props {
  subtrialData: SubtrialData;
  subtrialUuids: (keyof SubtrialData)[];
}
export const SubTrialDialog: React.FC<Props> = ({
  subtrialData,
  subtrialUuids,
}) => {
  return (
    <Box
      sx={{
        height: "200px",
        width: "600px",
        backgroundColor: "#66ccff",
      }}
    >
      {subtrialUuids.map((uuid) => (
        <SubTrial
          result={subtrialData[uuid][RESULT_INDEX]}
          date={subtrialData[uuid][DATE_INDEX]}
          data={subtrialData[uuid][DATA_INDEX]}
          key={uuid}
        />
      ))}
    </Box>
  );
};

export default SubTrialDialog;
