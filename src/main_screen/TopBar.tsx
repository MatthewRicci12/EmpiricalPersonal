
import Stack from '@mui/material/Stack';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


interface TopBarProps {

}
export function TopBar({}: TopBarProps) {

  return(
    <Stack
    direction="row"
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
        <h6>+ Add Trial</h6>
      </Container>

      <Container>
        <h6>Settings</h6>
      </Container>

    </Stack>
  );
}


export default TopBar;