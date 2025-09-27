import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  weight: number;
  handleClickFactor: React.MouseEventHandler<HTMLDivElement>;
  handleClickWeight: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
}
export const LoadPresetDialog: React.FC<Props> = ({
  title,
  weight,
  handleClickFactor,
  handleClickWeight,
  selected,
}) => {
  return (
    <Typography
      onClick={handleClickFactor}
      sx={{ backgroundColor: selected ? "cyan" : "none" }}
    >
      {`${title}:`}
      <Button onClick={handleClickWeight}>{weight}</Button>
    </Typography>
  );
};

export default LoadPresetDialog;
