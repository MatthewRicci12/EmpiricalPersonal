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

  const groups = [
    {
      title: "Successes",
      items: successTrials,
      empty: "No successful trials yet.",
      renderIcon: () => (
        <styles.TrialSuccess>
          <CheckIcon sx={styles.imgSx} />
        </styles.TrialSuccess>
      ),
    },
    {
      title: "Failures",
      items: failureTrials,
      empty: "No failed trials recorded.",
      renderIcon: () => (
        <styles.TrialFailure>
          <CloseIcon sx={styles.imgSx} />
        </styles.TrialFailure>
      ),
    },
    {
      title: "Neutrals",
      items: neutralTrials,
      empty: "No neutral trials at the moment.",
      renderIcon: () => (
        <styles.TrialNeutral>
          <RemoveIcon sx={styles.imgSx} />
        </styles.TrialNeutral>
      ),
    },
  ];

  const totalTrials = successTrials.length + failureTrials.length + neutralTrials.length;

  return (
    <Box>
      <Paper>
        <Box>
          <IconButton
          aria-label="close"
          onClick={handleClickBackButton}
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            border: '1px solid rgba(22,48,41,0.08)',
            backgroundColor: 'rgba(255,255,255,0.8)',
          })}>
          <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography variant="h4" gutterBottom align="center">
            Conclusions for Arena x
            </Typography>
          </Box>
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


      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid key={group.title} size={{ xs: 12, md: 4 }}>
            <Box sx={trialColumnsx}>
              <Stack direction="row" spacing={1.25} alignItems="center">
                {group.renderIcon()}
                <Box>
                  <Typography variant="h6">{group.title}</Typography>
                </Box>
              </Stack>

              <Stack spacing={1.2} sx={{ mt: 2, maxHeight: '52vh', overflowY: 'auto', pr: 0.5 }}>
                {group.items.length === 0 ? (
                  <Paper elevation={0} sx={{ p: 2, borderRadius: '20px'}}>
                    <Typography>{group.empty}</Typography>
                  </Paper>
                ) : group.items.map((trialTitle) => (
                  <Paper elevation={0} sx={{ p: 1.6, borderRadius: '20px', border: '1px solid rgba(22,48,41,0.06)', backgroundColor: 'rgba(255,255,255,0.76)' }}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      {group.renderIcon()}
                      <Typography sx={styles.trialTitleStyle}>{trialTitle}</Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      </Paper>
    </Box>
  );
};

export default ConclusionScreen;
