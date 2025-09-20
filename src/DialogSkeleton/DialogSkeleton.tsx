import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface Props {
    children: React.ReactNode,
    open: boolean,
    onClose: React.MouseEventHandler<HTMLButtonElement>
}
const DialogSkeleton: React.FC<Props> = ({children, open, onClose}) => {
    
    return (
      <Dialog 
      open={open}>
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
            >
            <CloseIcon/>
        </IconButton>
        {children}
      </Dialog>
    );

}



export default DialogSkeleton;