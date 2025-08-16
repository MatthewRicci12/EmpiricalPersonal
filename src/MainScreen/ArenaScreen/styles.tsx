import { styled } from '@mui/system';

export const skepTextStyle = {
    fontSize: '2em',
    color: '#7a84f5',
    fontFamily: 'Red Hat Display'
}

export const trialTitleStyle = {
    fontSize: '2em',
    color: '#000000',
    fontFamily: 'Red Hat Display',
    marginRight: '20px',
    marginLeft: '10px'
}

export const ButtonStyle = {
  borderRadius: '10px',
  border: 'none',
  disabled: 'true',
  marginBottom: '5px'
};

export const TrialSuccess = styled('button')({
  ...ButtonStyle,
  backgroundColor: '#228b22'
});

export const TrialFailure = styled('button')({
  ...ButtonStyle,
  backgroundColor: '#ca1515'
});

export const imgSx = {
  height: '50px',
  width: '50px',
  color: 'white'
};

export * as styles from './styles';
