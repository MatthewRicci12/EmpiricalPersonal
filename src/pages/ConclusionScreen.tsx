import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Result } from "../components/types.tsx";
import { SubtrialData, TrialData } from "./MainScreen/types.tsx";
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
  subtrialData: SubtrialData;
}
const ConclusionScreen: React.FC<Props> = ({
  handleClickBackButton,
  trialData,
  subtrialData,
}) => {
  let successTrials: React.ReactNode[] = [];
  let failureTrials: React.ReactNode[] = [];
  let neutralTrials: React.ReactNode[] = [];

  Object.keys(trialData).map((trialTitle) => {
    let subtrialUuids = trialData[trialTitle].subtrialData;

    switch (calculateTrialStatus(subtrialUuids, subtrialData)) {
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

  const totalTrials = successTrials.length + failureTrials.length + neutralTrials.length;

  return (
    <Box>
      <Paper>
        <Box>
          <IconButton
          aria-label="close"
          onClick={handleClickBackButton}
          sx={(theme) => ({
            position: "left",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}>
          <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography variant="h4" gutterBottom align="center">
            Conclusions for Arena x
            </Typography>
          </Box>


        <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {[
          ["Total trials", totalTrials.toString()],
          ["Successes", successTrials.length.toString()],
          ["Failures", (failureTrials.length + neutralTrials.length).toString()],
        ].map(([label, value]) => (
          <Grid key={label} size={{ xs: 12, sm: 4 }}>
            <Paper elevation={0} sx={{ p: 2.25, borderRadius: '24px', border: '1px solid rgba(22,48,41,0.08)', backgroundColor: 'rgba(255,255,255,0.72)' }}>
              <Typography variant="body2">
                {label}
              </Typography>
              <Typography variant="h3" sx={{ mt: 0.5 }}>
                {value}
              </Typography>
            </Paper>
          </Grid>
        ))}
        </Grid>

          
          {/* <Grid>
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
                {successTrials}
              </Box>

              <Box sx={trialColumnsx}>
                <Typography variant="h6">Failures</Typography>
                {failureTrials}
              </Box>

              <Box sx={trialColumnsx}>
                <Typography variant="h6">Neutrals</Typography>
                {neutralTrials}
              </Box>
            </Box>
          </Grid> */}

          {/* <Grid>
            <Grid>
              <Box>
                <Stack>
                  <Box>
                  </Box>
                </Stack>
                <Stack>
                  <Paper>
                  </Paper>
                  <Paper>
                    <Stack>
                    </Stack>
                  </Paper>
                </Stack>
              </Box>
          </Grid>
         </Grid> */}
        </Box>
      </Paper>
    </Box>
  );
};

export default ConclusionScreen;
