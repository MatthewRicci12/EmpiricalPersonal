import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Props {
    children: React.ReactNode,
    presetTitle: string,
    handleClickShowFactorList: () => void,
    handleDeletePreset: (presetToBeDeleted: string) => void
}
export const PresetContextMenu: React.FC<Props> = ({children, presetTitle, handleClickShowFactorList, handleDeletePreset}) => {
 const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );

    // Prevent text selection lost after opening the context menu on Safari and Firefox
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      setTimeout(() => {
        selection.addRange(range);
      });
    }
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setContextMenu(null);
  };


  const handleClickDeletePreset: React.MouseEventHandler<HTMLLIElement> = (e) => {
    handleDeletePreset(presetTitle);
  }

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      {children}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClickDeletePreset}>Delete Preset</MenuItem>
        <MenuItem onClick={handleClickShowFactorList}>Show Factor List</MenuItem>
      </Menu>
    </div>
  );
}

export default PresetContextMenu