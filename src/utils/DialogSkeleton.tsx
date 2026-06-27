import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

interface Props {
    children: React.ReactNode,
    open: boolean,
    onClose: React.MouseEventHandler<HTMLButtonElement>
}
const DialogSkeleton: React.FC<Props> = ({children, open, onClose}) => {
    return (
      <Dialog 
      open={open}
      fullWidth
      maxWidth="md"
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            maxHeight: 'min(92vh, 960px)',
            overflow: 'hidden',
          },
        },
      }}>
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 2
              }}>
            <CloseIcon/>
        </IconButton>
        <Box
          className="soft-scrollbar"
          sx={{
            p: { xs: 3.5, md: 4.5 },
            pt: { xs: 5, md: 5.5 },
            maxHeight: 'min(92vh, 960px)',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </Box>
      </Dialog>
    );
}

export default DialogSkeleton;