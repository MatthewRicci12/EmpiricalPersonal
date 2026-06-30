import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";

interface Props {
  handleCloseSavePresetDialog: () => void;
  handleSavePreset: (presetName: string) => void;
}
export const SavePresetDialog: React.FC<Props> = ({
  handleCloseSavePresetDialog,
  handleSavePreset,
}) => {
  const [presetName, setPresetName] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setPresetName(e.target.value);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (presetName.length === 0) return;

    handleCloseSavePresetDialog();
    handleSavePreset(presetName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <>
      <DialogTitle>Save Preset</DialogTitle>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        
        <TextField
          id="outlined-basic"
          label="Preset Name"
          variant="outlined"
          value={presetName}
          onChange={handleInput}
          sx={{
            paddingBottom: "10px",
          }}
        ></TextField>

        <Button variant="contained" onClick={onButtonClick}>
          Submit
        </Button>
    </Stack>
    </>
  );
};

export default SavePresetDialog;
