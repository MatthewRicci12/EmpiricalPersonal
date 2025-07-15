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

interface AddArenaDialogProps {
    open: boolean,
    onClose: () => void;
}
function AddArenaDialog({open, onClose}: AddArenaDialogProps) {
  const [value, setValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const addArenaFormSubmit = () => {
    console.log(value);
  }

  return (
    <Dialog 
    open={open}
    >
    <DialogTitle>Add New Arena</DialogTitle>
        <Box
        sx={{
            height: '500px',
            width: '500px'
        }}
        >
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
            <CloseIcon />
            </IconButton>
                <TextField id="outlined-basic" label="Arena Title" variant="outlined" value={value} onChange={handleInput} 
                sx={{
                    paddingBottom: '10px'
                }}/>
                <Typography sx={{
                    fontSize: "1.5em"
                }}>
                    Factors
                </Typography>
                <Button>Save Preset</Button><Button>Load Preset</Button><Button><AddIcon></AddIcon></Button><Button><RemoveIcon></RemoveIcon></Button>
                <Box sx={{
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: 'gray',
                    margin: '3px',
                    height: '300px'
                }}>500px
                    Stuff
                </Box>
                <Button variant="contained" onClick={addArenaFormSubmit}>Submit</Button>
        </Box>
    </Dialog>
  );
}

export default AddArenaDialog;