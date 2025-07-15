import Box from '@mui/system/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

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