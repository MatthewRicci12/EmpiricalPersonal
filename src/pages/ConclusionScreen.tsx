import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Result } from "../components/types.tsx";
import { TrialData } from "./MainScreen/types.tsx";
import { styles } from "../components/Trial/styles.tsx";
import { calculateTrialStatus } from "../components/Trial/Trial.tsx";

const trialColumnsx = {
  outline: "0.01em solid black",
  height: "100%",
  flexGrow: "1",
  textAlign: "left",
};

interface Props {
  handleClickBackButton: () => void;
  trialData: TrialData;
}
const ConclusionScreen: React.FC<Props> = ({
  handleClickBackButton,
  trialData,
}) => {
  let successTrials: React.ReactNode[] = [];
  let failureTrials: React.ReactNode[] = [];
  let neutralTrials: React.ReactNode[] = [];

  Object.keys(trialData).map((trialTitle) => {
    let curSubTrialData = trialData[trialTitle].subTrialData;

    switch (calculateTrialStatus(curSubTrialData)) {
      case Result.SUCCESS:
        successTrials = [
          ...successTrials,
          <Stack direction="row">
            <styles.TrialSuccess>
              <CheckIcon sx={styles.imgSx} />
            </styles.TrialSuccess>
            <Typography sx={styles.trialTitleStyle}>{trialTitle}</Typography>
          </Stack>,
        ];
        break;

      case Result.FAILURE:
        failureTrials = [
          ...failureTrials,
          <Stack direction="row">
            <styles.TrialFailure>
              <CloseIcon sx={styles.imgSx} />
            </styles.TrialFailure>
            <Typography sx={styles.trialTitleStyle}>{trialTitle}</Typography>
          </Stack>,
        ];
        break;

      case Result.NEUTRAL:
        neutralTrials = [
          ...neutralTrials,
          <Stack direction="row">
            <styles.TrialNeutral>
              <RemoveIcon sx={styles.imgSx} />
            </styles.TrialNeutral>
            <Typography sx={styles.trialTitleStyle}>{trialTitle}</Typography>
          </Stack>,
        ];
        break;
    }
  });

  return (
    <>
      <Box>
        <IconButton
          aria-label="close"
          onClick={handleClickBackButton}
          sx={(theme) => ({
            position: "left",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" gutterBottom align="center">
          Conclusions for Arena x
        </Typography>
      </Box>
      {/* Reused SX: Maybe as a variable? */}
      <Box
        sx={{
          columnCount: "3",
          display: "flex",
          justifyContent: "Center",
          textAlign: "center",
        }}
      >
        <Box sx={trialColumnsx}>
          <Typography variant="h6">Successes</Typography>
          {/* Success trials go here */}
          {successTrials}
        </Box>

        <Box sx={trialColumnsx}>
          <Typography variant="h6">Failures</Typography>
          {/* Failure trials go here */}
          {failureTrials}
        </Box>

        <Box sx={trialColumnsx}>
          <Typography variant="h6">Neutrals</Typography>
          {/* Neutral trials go here */}
          {neutralTrials}
        </Box>
      </Box>
    </>
  );
};

export default ConclusionScreen;
