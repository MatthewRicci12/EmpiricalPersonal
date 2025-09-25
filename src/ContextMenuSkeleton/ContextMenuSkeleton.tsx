import { useState } from 'react';
import Menu from '@mui/material/Menu';

interface Props {
    children: React.ReactNode,
    menuItems: React.ReactNode[]
}
export const ContextMenuSkeleton: React.FC<Props> = ({children, menuItems}) => {
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

  const handleClose = () => {
    setContextMenu(null);
  };


  return (
    <div 
    onContextMenu={handleContextMenu} 
    style={{ 
      cursor: 'context-menu', 
      display: 'inline' }}>

        {children}

        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null ? 
              { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined}>
          {menuItems}
        </Menu>

    </div>
  );
}

export default ContextMenuSkeleton;