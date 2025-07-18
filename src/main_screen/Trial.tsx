
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

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

  const trialTitleStyle = {
    fontSize: '2em',
    color: '#000000',
    fontFamily: 'Red Hat Display',
    marginRight: '20px',
    marginLeft: '10px'
  };

  const skepTextStyle = {
    fontSize: '2em',
    color: '#7a84f5',
    fontFamily: 'Red Hat Display'
  };

//QUESTION: Is this where these styles should go? Or global?
interface TrialProps {
    trialTitle: string
}
function Trial({trialTitle}: TrialProps) {


  //TODO: Is a stack of a stack really the best way to do this?
  return (
      <Stack direction="row">
      <TrialSuccess><CheckIcon sx={imgSx}></CheckIcon></TrialSuccess> <Typography sx={trialTitleStyle}>{trialTitle}</Typography><Typography sx={skepTextStyle}>hello</Typography>
      </Stack>
  );
}

export default Trial;