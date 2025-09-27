import Button from "@mui/material/Button";
import { selectedSx } from "./types";

interface Props {
  title: string;
  handleClickTab: React.MouseEventHandler<HTMLButtonElement>;
  selected: boolean;
}
export const ArenaTab: React.FC<Props> = ({
  title,
  handleClickTab,
  selected,
}) => {
  return (
    <Button sx={selected ? selectedSx : {}} onClick={handleClickTab}>
      {title}
    </Button>
  );
};

export default ArenaTab;
