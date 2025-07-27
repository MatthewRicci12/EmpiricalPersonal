import Button from "@mui/material/Button";

interface ArenaTabProps {
  title: string,
  handleClickTab: React.MouseEventHandler<HTMLButtonElement>,
  selected: boolean
}

export const ArenaTab: React.FC<ArenaTabProps> = ({title, handleClickTab, selected}) => { // how 2 isDisplayed

  const selectedSx = {
    backgroundColor: 'blue',
    color: 'white'
  };

  return (
      <Button
      sx={selected ? selectedSx : {}}
      onClick={handleClickTab}
      >
        {title}
      </Button>
  );
}
