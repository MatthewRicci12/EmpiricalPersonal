import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

interface Props {
  handleCloseFactorDialog: () => void,
  handleAddFactor: (factorName: string, weight: number) => void,
  handleEditFactor: (factorName: string, weight: number) => void,
  edit: boolean,
  givenFactorName?: string
}
export const FactorDialog: React.FC<Props> = ({handleCloseFactorDialog, handleAddFactor, handleEditFactor, edit, givenFactorName=""}) => {
  const [factorName, setFactorName] = useState(givenFactorName); //Value of input which changes on screen
  const [sliderValueMacro, setSliderValueMacro] = useState(0); //Value of input which changes on screen
  const [sliderValueMicro, setSliderValueMicro] = useState(0); //Value of input which changes on screen

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    e.stopPropagation();
    setFactorName(e.target.value);
  }

  const handleSliderChangeMacro = (e: Event, newValue: number) => {
    e.stopPropagation();
    setSliderValueMacro(newValue);
  };

  const handleSliderChangeMicro = (e: Event, newValue: number) => {
    e.stopPropagation();
    setSliderValueMicro(newValue);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (factorName.length  === 0) return;

    const sliderValue = sliderValueMacro + sliderValueMicro >= 100 ? 100 : sliderValueMacro + sliderValueMicro;

    if (edit) {
      handleCloseFactorDialog();
      handleEditFactor(factorName, sliderValue);
    } else {
      handleCloseFactorDialog();
      handleAddFactor(factorName, sliderValue);
    }
    
  }


  return (
    <>
      <DialogTitle>{edit ? "Edit" : "Add"} Factor</DialogTitle>
      <Box
        sx={{
          height: '500px',
          width: '800px'
        }}>

          {edit ? 
          <></> 
          :
          <TextField id="outlined-basic" label="Factor Title" variant="outlined" value={factorName} onChange={handleInput}
          sx={{
            paddingBottom: '20px'
          }}>
          </TextField>}

            <Typography sx={{fontSize: '2em'}}>Factor Weight: {
            sliderValueMacro + sliderValueMicro >= 100 ? 100 : sliderValueMacro + sliderValueMicro
            }</Typography>

            <Typography>Macro-Slider: How much does this factor affect the results?</Typography>
            <Slider
            sx={{margin: '20px', width: '80%'}}
            defaultValue={0}
            valueLabelDisplay="on"
            shiftStep={10}
            step={10}
            marks
            min={0}
            max={100}
            onChange={handleSliderChangeMacro}
            >
            </Slider>

            <Typography>Micro-Slider: Fine-tune</Typography>
            <Slider
            sx={{margin: '20px', width: '80%'}}
            defaultValue={0}
            valueLabelDisplay="on"
            shiftStep={1}
            step={1}
            marks
            min={0}
            max={9}
            onChange={handleSliderChangeMicro}
            >
            </Slider>
            <br></br>
            <Button variant="contained" onClick={onButtonClick}>Submit</Button>
        </Box>
    </>
  );
}

export default FactorDialog;