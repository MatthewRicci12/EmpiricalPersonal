import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export type FactorData = Record<string, number>;

interface Props {
    title: string,
    weight: number,
    selected?: boolean,
    handleClickFactor: React.MouseEventHandler<HTMLDivElement>,
    handleClickWeight: React.MouseEventHandler<HTMLButtonElement>
}
export const LoadPresetDialog: React.FC<Props> = ({title, weight, selected, handleClickFactor, handleClickWeight}) => {
  return (
    <Typography onClick={handleClickFactor} sx={{ backgroundColor: selected ? 'cyan' : 'none' }}>
    {`${title}:`} 
    <Button 
    onClick={handleClickWeight}>
    {weight}
    </Button>
    </Typography>
    
  );
}

export default LoadPresetDialog;