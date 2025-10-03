import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styles } from "./styles";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { selectedEffect } from "./types";
import { Result } from "../types";

interface Props {
  trialTitle: string;
  handleCloseAddSubTrialDialog: React.MouseEventHandler<HTMLButtonElement>;
  handleAddSubTrial: (
    trialTitle: string,
    key: string,
    result: Result,
    date: string,
    data: string
  ) => void;
}
export const AddSubTrialDialog: React.FC<Props> = ({
  trialTitle,
  handleCloseAddSubTrialDialog,
  handleAddSubTrial,
}) => {
  const [subTrialData, setSubTrialData] = useState("");
  const [subTrialDate, setSubTrialDate] = useState<Dayjs | null>(dayjs(""));
  const [selectedResult, setSelectedResult] = useState<Result>(Result.EMPTY);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSubTrialData(e.target.value);
  };

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    handleCloseAddSubTrialDialog(e);
    if (subTrialDate !== null) {
      handleAddSubTrial(
        trialTitle,
        uuidv4(),
        selectedResult,
        subTrialDate!.format("MM/DD/YYYY"),
        subTrialData
      );
    }
  };

  // Subroutine
  const handleClickResult = (success: Result) => {
    setSelectedResult(success);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("You pressed Enter!");
      e.preventDefault();
      onButtonClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <Box
      sx={{
        height: "500px",
        width: "500px",
      }}
      onKeyDown={handleKeyPress}
    >
      <Typography display="inline">Result: </Typography>
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

      <br />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={"Pick date"}
          value={subTrialDate}
          onChange={(newDate) => setSubTrialDate(newDate)}
        />
      </LocalizationProvider>

      <br />

      <TextField
        id="outlined-basic"
        label="Data"
        variant="outlined"
        value={subTrialData}
        onChange={handleInput}
        sx={{
          paddingBottom: "20px",
        }}
      ></TextField>

      <br />

      <Button variant="contained" onClick={onButtonClick}>
        Submit
      </Button>
    </Box>
  );
};

export default AddSubTrialDialog;
