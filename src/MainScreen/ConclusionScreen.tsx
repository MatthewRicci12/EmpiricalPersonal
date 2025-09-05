import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    handleClickBackButton: () => void
}
const ConclusionScreen: React.FC<Props> = ({handleClickBackButton}) => {
  
  
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
    </Box>
    </>
  );
}


export default ConclusionScreen;