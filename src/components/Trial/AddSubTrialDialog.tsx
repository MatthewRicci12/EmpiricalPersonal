import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styles } from "./styles";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { selectedEffect } from "./types";
import { Result } from "../types";

interface Props {
  trialKey: string;
  handleCloseAddSubTrialDialog: React.MouseEventHandler<HTMLButtonElement>;
  handleAddSubTrial: (
    trialKey: string,
    key: string,
    result: Result,
    date: string,
    data: string
  ) => void;
}
export const AddSubTrialDialog: React.FC<Props> = ({
  trialKey,
  handleCloseAddSubTrialDialog,
  handleAddSubTrial,
}) => {
  const [subtrialData, setSubtrialData] = useState("");
  const [subtrialDate, setSubtrialDate] = useState<Dayjs | null>(dayjs(""));
  const [selectedResult, setSelectedResult] = useState<Result>(Result.EMPTY);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSubtrialData(e.target.value);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    handleCloseAddSubTrialDialog(e);
    if (subtrialDate !== null && selectedResult !== Result.EMPTY) {
      handleAddSubTrial(
        trialKey,
        uuidv4(),
        selectedResult,
        subtrialDate!.format("MM/DD/YYYY"),
        subtrialData
      );
    }
  };

  // Subroutine
  const handleClickResult = (success: Result) => {
    setSelectedResult(success);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <Stack spacing={3} onKeyDown={handleKeyPress} sx={{ maxWidth: 520 }}>

      <Box>
        <Typography variant="h6" sx={{ mb: 1.25 }}>Result</Typography>
        <Stack direction="row" spacing={1.5}>
          <styles.SubTrialSuccess
            onClick={(e) => {
              e.stopPropagation();
              handleClickResult(Result.SUCCESS);
            }}
            sx={selectedResult === Result.SUCCESS ? selectedEffect : {}}
          >
            <CheckIcon />
          </styles.SubTrialSuccess>
          <styles.SubTrialFailure
            onClick={(e) => {
              e.stopPropagation();
              handleClickResult(Result.FAILURE);
            }}
            sx={selectedResult === Result.FAILURE ? selectedEffect : {}}
          >
            <CloseIcon />
          </styles.SubTrialFailure>
        </Stack>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={"Completion date"}
          value={subtrialDate}
          onChange={(newDate) => setSubtrialDate(newDate)}
        />
      </LocalizationProvider>

      <TextField
        id="outlined-basic"
        label="Evidence or data"
        multiline
        rows={5}
        value={subtrialData}
        onChange={handleInput}
      ></TextField>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} justifyContent="flex-end">
        <Button variant="outlined" onClick={handleCloseAddSubTrialDialog}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onButtonClick}>
          Save Outcome
        </Button>
      </Stack>
    </Stack>
  );
};

export default AddSubTrialDialog;
