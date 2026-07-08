import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  date: string;
  data: string;
}
export const ViewSubTrialDialog: React.FC<Props> = ({ date, data }) => {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 520 }}>

      <Paper elevation={0} sx={{ p: 2.25,}}>
        <Typography variant="h6" sx={{ mb: 1 }}>Completion date</Typography>
        <Typography variant="body1">{date}</Typography>
      </Paper>

      <Paper elevation={0} sx={{ p: 2.25}}>
        <Typography variant="h6" sx={{ mb: 1 }}>Captured data</Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{data || "No additional data recorded."}</Typography>
      </Paper>
    </Stack>
  );
};

export default ViewSubTrialDialog;
