import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { TrialData } from "./MainScreen";

interface Props {
    handleClickBackButton: () => void,
    trialData: TrialData
}
const ConclusionScreen: React.FC<Props> = ({handleClickBackButton, trialData}) => {
  
  const successTrials = <></>;

  const failureTrials = <></>;
  
  return (
    <>
        <Box>
            <IconButton
            aria-label="close"
            onClick={handleClickBackButton}
            sx={(theme) => ({
                position: 'left',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
            >
                <ArrowBackIcon/>
            </IconButton>
            <Typography variant="h4" gutterBottom align="center">Conclusions for Arena x</Typography>
        </Box>
            {/* Reused SX: Maybe as a variable? */}
        <Box sx={{columnCount: "2", display: "flex", justifyContent: "Center", textAlign: "center"}} >
            <Box sx={{outline: "0.01em solid black", height: "100%", flexGrow: "1"}}>
                <Typography variant="h6">Successes</Typography>
                {/* Success trials go here */}
                {successTrials}
            </Box>

            <Box sx={{outline: "0.01em solid black", height: "100%", flexGrow: "1", textAlign: "center"}}>
                <Typography variant="h6">Failures</Typography>
                {/* Failure trials go here */}
                {failureTrials}
            </Box>
        </Box>
    </>
  );
}


export default ConclusionScreen;