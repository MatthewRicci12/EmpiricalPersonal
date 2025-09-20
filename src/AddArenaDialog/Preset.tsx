import { useState } from 'react';
import { FactorData } from './Factor.tsx';
import Button from '@mui/material/Button';
import DialogSkeleton from '../DialogSkeleton/DialogSkeleton.tsx';
import FactorListDialog from './FactorListDialog.tsx';
import PresetContextMenu from './PresetContextMenu.tsx';
import ContextMenuSkeleton from '../ContextMenuSkeleton/ContextMenuSkeleton.tsx';
import MenuItem from '@mui/material/MenuItem';

export type PresetData = Record<string, {factorData: FactorData, factorOrder: (keyof FactorData)[]}>;

interface Props {
    title: string,
    factorData: FactorData,
    factorOrder: (keyof FactorData)[],
    handleLoadPreset: React.MouseEventHandler<HTMLButtonElement>,
    handleDeletePreset: React.MouseEventHandler<HTMLLIElement>
}
export const Preset: React.FC<Props> = ({title, factorData, factorOrder, handleLoadPreset, handleDeletePreset}) => {
  const [open, setOpen] = useState(false); //dialog pop up or not
  
  const handleOpenPresetDialog : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    handleLoadPreset(e);
    
  };

  const handleCloseFactorListDialog: React.MouseEventHandler<HTMLButtonElement> = (e) => { //Triggered by Dialog x
    e.stopPropagation();
    setOpen(false);
  };

  const handleClickShowFactorList: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
    setOpen(true);  
  }

  return (
    <>
      <ContextMenuSkeleton
      menuItems={[        
        <MenuItem onClick={handleDeletePreset}>Delete Preset</MenuItem>,
        <MenuItem onClick={handleClickShowFactorList}>Show Factor List</MenuItem>
      ]}>
        <Button onClick={handleOpenPresetDialog}>{title}</Button>
      </ContextMenuSkeleton>



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