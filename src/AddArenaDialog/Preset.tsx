import Button from '@mui/material/Button';
import ContextMenuSkeleton from '../ContextMenuSkeleton/ContextMenuSkeleton.tsx';
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import FactorListDialog from './FactorListDialog.tsx';
import MenuItem from '@mui/material/MenuItem';
import { FactorData } from './Factor.tsx';
import { useState } from 'react';

export type PresetData = Record<string, {factorData: FactorData, factorOrder: (keyof FactorData)[]}>;

interface Props {
    title: string,
    factorData: FactorData,
    factorOrder: (keyof FactorData)[],
    handleClickPreset: React.MouseEventHandler<HTMLButtonElement>,
    handleDeletePreset: React.MouseEventHandler<HTMLLIElement>
}
export const Preset: React.FC<Props> = ({title, factorData, factorOrder, handleClickPreset, handleDeletePreset}) => {
  const [open, setOpen] = useState(false);
  
  const handleOpenPresetDialog : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    handleClickPreset(e);
  };

  const handleCloseFactorListDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => { //Triggered by Dialog x
    e.stopPropagation();
    setOpen(false);
  };

  const handleClickShowFactorList: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
    setOpen(true);  
  };

  return (
    <>
      <ContextMenuSkeleton
      menuItems={[        
        <MenuItem onClick={handleDeletePreset}>Delete Preset</MenuItem>,
        <MenuItem onClick={handleClickShowFactorList}>Show Factor List</MenuItem>]}>
        <Button onClick={handleOpenPresetDialog}>{title}</Button>
      </ContextMenuSkeleton>

      <DialogSkeleton
      open={open}
      onClose={handleCloseFactorListDialog}>
        <FactorListDialog
        factorData={factorData}
        factorOrder={factorOrder}>
        </FactorListDialog>
      </DialogSkeleton>
    </>
  );
}

export default Preset;