import { useState } from 'react';
import Typography from '@mui/material/Typography';

export type FactorData = Record<string, number>;

interface Props {
    title: string,
    weight: number
}
export const LoadPresetDialog: React.FC<Props> = ({title, weight}) => {
  return (
    <Typography>{`${title}: ${weight}`}</Typography>
  );
}

export default LoadPresetDialog;