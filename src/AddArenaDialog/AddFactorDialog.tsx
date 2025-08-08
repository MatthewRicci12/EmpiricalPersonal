import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

interface Props {
  handleCloseAddFactorDialog: () => void,
  handleAddFactor: (factorName: string, weight: number) => void
}
export const AddFactorDialog: React.FC<Props> = ({handleCloseAddFactorDialog, handleAddFactor}) => {
  const [factorName, setFactorName] = useState(""); //Value of input which changes on screen
  const [sliderValueMacro, setSliderValueMacro] = useState(0); //Value of input which changes on screen
  const [sliderValueMicro, setSliderValueMicro] = useState(0); //Value of input which changes on screen

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { //Reacts to you entering
    e.stopPropagation();
    setFactorName(e.target.value);
  }

  const macroValue = (value: number, index: number): string => {
    return "butt";
  }

  const microValue = (value: number, index: number): string => {
    return "butt";
  }

  const handleSliderChangeMacro = (e: Event, newValue: number) => {
    e.stopPropagation();
    setSliderValueMacro(newValue);
    console.log(`Macro: ${sliderValueMacro}`);
  };

  const handleSliderChangeMicro = (e: Event, newValue: number) => {
    e.stopPropagation();
    setSliderValueMicro(newValue);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    
    handleCloseAddFactorDialog();
    handleAddFactor(factorName, sliderValueMacro+sliderValueMicro);
  }


  return (
    <>
      <DialogTitle>Add Factor</DialogTitle>
      <Box
        sx={{
          height: '500px',
          width: '800px'
        }}>

          <TextField id="outlined-basic" label="Factor Title" variant="outlined" value={factorName} onChange={handleInput}
            sx={{
              paddingBottom: '20px'
            }}></TextField>

            <Typography sx={{fontSize: '2em'}}>Factor Weight: {
            sliderValueMacro + sliderValueMicro >= 100 ? 100 : sliderValueMacro + sliderValueMicro
            }</Typography>

            <Typography>Macro-Slider: How much does this factor affect the results?</Typography>
            <Slider
            sx={{margin: '20px', width: '80%'}}
            defaultValue={0}
            //getAriaValueText={macroValue}
            valueLabelDisplay="on"
            shiftStep={10}
            step={10}
            marks
            min={0}
            max={100}
            //value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChangeMacro}
            //aria-labelledby="input-slider"
            >
            </Slider>

            <Typography>Micro-Slider: Fine-tune</Typography>
            <Slider
            sx={{margin: '20px', width: '80%'}}
            defaultValue={0}
            //getAriaValueText={microValue}
            valueLabelDisplay="on"
            shiftStep={1}
            step={1}
            marks
            min={0}
            max={9}
            onChange={handleSliderChangeMicro}
            //aria-labelledby="input-slider"
            >
            </Slider>

            <Button variant="contained" onClick={onButtonClick}>Submit</Button>
        </Box>
    </>
  );
}

export default AddFactorDialog;