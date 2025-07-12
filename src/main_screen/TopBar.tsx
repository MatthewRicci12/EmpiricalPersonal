
import Stack from '@mui/material/Stack';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

interface TopBarProps {
  addTrialHandler: () => void
}
export function TopBar({addTrialHandler} : TopBarProps) {

  return(
    <Stack
    direction="row"
    alignItems="center"
    >
      <Container>
        <Button>
          <AddIcon
            sx={{
            }}>
          </AddIcon>
        </Button>
      </Container>

      <Container>
        <Button onClick={addTrialHandler}>
        <AddIcon></AddIcon>
        </Button>
        Add Trial
      </Container>

      <Container>
        <Typography align="right">Settings</Typography>
      </Container>

    </Stack>
  );
}


export default TopBar;