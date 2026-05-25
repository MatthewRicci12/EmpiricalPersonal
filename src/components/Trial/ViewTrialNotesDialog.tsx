import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

interface Props {
  successString: string;
  failureString: string;
  additionalNotesString: string;
}
export const ViewTrialNotesDialog: React.FC<Props> = ({
  successString,
  failureString,
  additionalNotesString}) => {

  return (
    <Box
    >
        <Typography>What a success looks like</Typography>
        <Box>
        {successString}
        </Box>

        <Typography>What a failure looks like</Typography>
        <Box>
        {failureString}
        </Box>

        <Typography>Additional notes</Typography>
        <Box>
        {additionalNotesString}
        </Box>

    </Box>
  );
};

export default ViewTrialNotesDialog;
