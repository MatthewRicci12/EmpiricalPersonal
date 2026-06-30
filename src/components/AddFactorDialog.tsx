import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useState } from "react";

interface Props {
  handleCloseFactorDialog: React.MouseEventHandler<HTMLButtonElement>;
  handleAddFactor: (factorName: string, weight: number) => void;
  handleEditFactor: (factorName: string, weight: number) => void;
  edit: boolean;
  givenFactorName?: string;
}
export const AddFactorDialog: React.FC<Props> = ({
  handleCloseFactorDialog,
  handleAddFactor,
  handleEditFactor,
  edit,
  givenFactorName = "",
}) => {
  const [factorName, setFactorName] = useState(givenFactorName);
  const [sliderValueMacro, setSliderValueMacro] = useState(0);
  const [sliderValueMicro, setSliderValueMicro] = useState(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Reacts to you entering
    e.stopPropagation();
    setFactorName(e.target.value);
  };

  const handleSliderChangeMacro = (e: Event, newValue: number) => {
    e.stopPropagation();
    setSliderValueMacro(newValue);
  };

  const handleSliderChangeMicro = (e: Event, newValue: number) => {
    e.stopPropagation();
    setSliderValueMicro(newValue);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (factorName.length === 0) return;

    const sliderValue =
      sliderValueMacro + sliderValueMicro >= 100
        ? 100
        : sliderValueMacro + sliderValueMicro;

    if (edit) {
      handleCloseFactorDialog(e);
      handleEditFactor(factorName, sliderValue);
    } else {
      handleCloseFactorDialog(e);
      handleAddFactor(factorName, sliderValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <>
      <DialogTitle sx={{ p: 0, mb: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h4">{edit ? "Edit" : "Add"} Factor</Typography>
        </Stack>
      </DialogTitle>
      <Box
        sx={{
          maxWidth: "800px",
        }}
        onKeyDown={handleKeyPress}
      >
        {edit ? (
          <></>
        ) : (
          <TextField
            id="outlined-basic"
            label="Factor Title"
            variant="outlined"
            value={factorName}
            onChange={handleInput}
            sx={{ mb: 3 }}
          ></TextField>
        )}

        <Paper
          elevation={0}
          sx={{
            p: 2.9,
            mb: 3,
          }}
        >
          <Typography variant="h3">
            {sliderValueMacro + sliderValueMicro >= 100
              ? 100
              : sliderValueMacro + sliderValueMicro}
          </Typography>
        </Paper>

        <Stack spacing={2.25}>
          <Paper elevation={0} sx={{ p: 2.8 }}>
            <Typography variant="h6" sx={{ mb: 0.75 }}>
              Macro Weight
            </Typography>
            <Slider
              sx={{ mt: 4, width: "100%" }}
              defaultValue={0}
              valueLabelDisplay="on"
              shiftStep={10}
              step={10}
              marks
              min={0}
              max={100}
              onChange={handleSliderChangeMacro}
            ></Slider>
          </Paper>

          <Paper elevation={0} sx={{ p: 2.8 }}>
            <Typography variant="h6" sx={{ mb: 0.75 }}>
              Precision Tuning
            </Typography>
            <Typography variant="body2">
              Nudge the score with a smaller adjustment when the factor needs finer calibration.
            </Typography>
            <Slider
              sx={{ mt: 4, width: "100%" }}
              defaultValue={0}
              valueLabelDisplay="on"
              shiftStep={1}
              step={1}
              marks
              min={0}
              max={9}
              onChange={handleSliderChangeMicro}
            ></Slider>
          </Paper>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleCloseFactorDialog}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onButtonClick} disabled={factorName.trim().length === 0}>
              {edit ? 'Save Factor' : 'Add Factor'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default AddFactorDialog;
