import { useState } from 'react';
import { FactorData } from './Factor.tsx';
import Button from '@mui/material/Button';
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import FactorListDialog from './FactorListDialog.tsx';
import PresetContextMenu from './PresetContextMenu.tsx';

export type PresetData = Record<string, {factorData: FactorData, factorOrder: (keyof FactorData)[]}>;

interface Props {
    title: string,
    factorData: FactorData,
    factorOrder: (keyof FactorData)[],
    handleLoadPreset: React.MouseEventHandler<HTMLButtonElement>
}
export const Preset: React.FC<Props> = ({title, factorData, factorOrder, handleLoadPreset}) => {
  const [open, setOpen] = useState(false); //dialog pop up or not
  
  const handleOpenPresetDialog : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    handleLoadPreset(e);
    
  };

  const handleCloseFactorListDialog = () => { //Triggered by Dialog x
    setOpen(false);
  };

  const handleClickShowFactorList = () => {
      setOpen(true);  
  }

  return (
    <>
      <PresetContextMenu
        handleClickShowFactorList={handleClickShowFactorList}
      >
      <Button onClick={handleOpenPresetDialog}>{title}</Button>
      </PresetContextMenu>
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