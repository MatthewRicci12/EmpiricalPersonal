import Button from "@mui/material/Button";

const selectedSx = {
  backgroundColor: "blue",
  color: "white",
};

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
  // how 2 isDisplayed
  return (
    <Button sx={selected ? selectedSx : {}} onClick={handleClickTab}>
      {title}
    </Button>
  );
};

export default ArenaTab;
