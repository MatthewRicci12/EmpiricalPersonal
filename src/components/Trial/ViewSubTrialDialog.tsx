import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

interface Props {
  date: string;
  data: string;
}
export const ViewSubTrialDialog: React.FC<Props> = ({ date, data }) => {
  return (
    <Box
      sx={{
        height: "500px",
        width: "500px",
      }}
    >
      <Typography>Date done: {date}</Typography>

      <Typography>Data:</Typography>

      <Box>{data}</Box>
    </Box>
  );
};

export default ViewSubTrialDialog;
