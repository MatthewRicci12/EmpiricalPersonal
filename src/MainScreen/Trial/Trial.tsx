
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
//import styles from './Trial.module.css'
import * as styles from './styles.tsx'

interface Props {
  trialTitle: string,
  selected: boolean,
  handleClickTrial: (title: string) => void,
}
const Trial: React.FC<Props> = ({ trialTitle, selected, handleClickTrial }) => {

  return (
    <Stack direction="row" sx={{ backgroundColor: selected ? 'cyan' : 'none' }} onClick={() => handleClickTrial(trialTitle)}>
      <styles.TrialSuccess>
        <CheckIcon sx={styles.imgSx} />
      </styles.TrialSuccess>
      <Typography sx={styles.trialTitleStyle}>
        {trialTitle}
      </Typography>
      <Typography sx={styles.skepTextStyle}>
        hello
      </Typography>
    </Stack>
  );
}

export default Trial;