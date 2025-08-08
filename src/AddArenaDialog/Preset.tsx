import { useState } from 'react';
import { FactorData } from './Factor.tsx';
import Button from '@mui/material/Button';
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import FactorListDialog from './FactorListDialog.tsx';

export type PresetData = Record<string, FactorData>
interface Props {
    title: string
}
export const Preset: React.FC<Props> = ({title}) => {
  const [open, setOpen] = useState(false); //dialog pop up or not
  const [factorData, setFactorData] = useState({});
  const [factorOrder, setFactorOrder] = useState([]);
  
  const handleOpenPresetDialog = () => { //Triggered by add Tab button
    setOpen(true);
  };

  const handleCloseFactorListDialog = () => { //Triggered by Dialog x
    setOpen(false);
  };

  return (
  <>
    <Button onClick={handleOpenPresetDialog}>{title}</Button>
    <DialogSkeleton
    open={open}
    onClose={handleCloseFactorListDialog}
    >
      <FactorListDialog
      factorData={factorData}
      factorOrder={factorOrder}
      ></FactorListDialog>
    </DialogSkeleton>
  </>
  );
}

export default Preset;