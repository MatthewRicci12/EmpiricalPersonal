import { useState } from 'react';
import Typography from '@mui/material/Typography';

export type FactorData = Record<string, number>;

interface Props {
    title: string,
    weight: number,
    selected?: boolean,
    handleClickFactor?: React.MouseEventHandler<HTMLDivElement>
}
export const LoadPresetDialog: React.FC<Props> = ({title, weight, selected, handleClickFactor}) => {
  return (
    <Typography onClick={handleClickFactor} sx={{ backgroundColor: selected ? 'cyan' : 'none' }}>{`${title}: ${weight}`}</Typography>
  );
}

export default LoadPresetDialog;