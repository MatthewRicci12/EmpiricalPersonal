import Button from "@mui/material/Button";
import { selectedSx } from "./types";

interface Props {
  title: string;
  handleClickArena: React.MouseEventHandler<HTMLButtonElement>;
  selected: boolean;
}
export const ArenaTab: React.FC<Props> = ({
  title,
  handleClickArena,
  selected,
}) => {
  return (
    <Button sx={selected ? selectedSx : {}} onClick={handleClickArena}>
      {title}
    </Button>
  );
};

export default ArenaTab;
