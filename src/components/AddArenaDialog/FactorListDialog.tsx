import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { FactorData } from "../Factor.tsx";

interface Props {
  factorData: FactorData;
  factorOrder: (keyof FactorData)[];
}
export const FactorListDialog: React.FC<Props> = ({
  factorData,
  factorOrder,
}) => {
  return (
    <Box
      sx={{
        height: "500px",
        width: "500px",
      }}
    >
      {factorOrder.map((factorTitle, index) => (
        <Typography
          key={`${factorTitle}-${index}`}
        >{`${factorTitle} ${factorData[factorTitle]}`}</Typography>
      ))}
    </Box>
  );
};

export default FactorListDialog;
