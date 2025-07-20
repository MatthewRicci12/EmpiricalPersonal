import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


interface DynamicTextFieldProps {

}
function DynamicTextField() {
}

interface DialogSkeletonProps {
    children: React.ReactNode,
    open: boolean,
    onClose: () => void;
}
function DialogSkeleton(props: DialogSkeletonProps) {
    
    return (
      <Dialog 
      open={props.open}>
        <IconButton
            aria-label="close"
            onClick={props.onClose}
            sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
            >
            <CloseIcon/>
        </IconButton>
        {props.children}
      </Dialog>
    );

}



export default DialogSkeleton;