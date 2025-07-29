
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import styles from './Trial.module.css'


const ButtonStyle = {
  borderRadius: '10px',
  border: 'none',
  disabled: 'true',
  marginBottom: '5px'
};

const TrialSuccess = styled('button')({
  ...ButtonStyle,
  backgroundColor: '#228b22'
});

const TrialFailure = styled('button')({
  ...ButtonStyle,
  backgroundColor: '#ca1515'
});

const imgSx = {
  height: '50px',
  width: '50px',
  color: 'white'
};


//QUESTION: Is this where these styles should go? Or global?
// If a style is used globally, I like having a src/styles/ folder for that.
// If a style is used in only one component, I usually put that component into it's own folder like here
// and store it in a neighboring styles.module.css file 
// (note: .module.css files need to be imported in the tsx, but they will not have colliding selector names if you use the same one in multiple files)
// I've used tailwind and the sx type of styling, but the ways I ended up using that always felt like css except with worse IDE support, so I just generally write standard CSS now

interface Props {
  trialTitle: string,
  selected: boolean,
  handleClickTrial: (title: string) => void,
}
const Trial: React.FC<Props> = ({ trialTitle, selected, handleClickTrial }) => {

  return (
    <Stack direction="row" sx={{ backgroundColor: selected ? 'cyan' : 'none' }} onClick={() => handleClickTrial(trialTitle)}>
      <TrialSuccess>
        <CheckIcon sx={imgSx} />
      </TrialSuccess>
      <Typography className={styles.trialTitleStyle}>
        {trialTitle}
      </Typography>
      <Typography className={styles.skepTextStyle}>
        hello
      </Typography>
    </Stack>
  );
}

export default Trial;