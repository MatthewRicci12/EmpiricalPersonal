import Menu from "@mui/material/Menu";
import { cloneElement } from "react";

interface Props {
  children: React.ReactNode;
  menuItems: React.ReactNode[];
  leftClick: boolean;
  contextMenu: {
    mouseX: number;
    mouseY: number;
  } | null;
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      mouseX: number;
      mouseY: number;
    } | null>
  >;
}
export const ContextMenuSkeleton: React.FC<Props> = ({
  children,
  menuItems,
  leftClick,
  contextMenu,
  setContextMenu,
}) => {
  menuItems = menuItems.map((item: React.ReactNode): React.ReactNode => {
    return cloneElement(item as React.ReactElement, {
      onClick: (e: React.MouseEvent<HTMLLIElement>) => {
        if (item && (item as React.ReactElement).props.onClick) {
          (item as React.ReactElement).props.onClick(e);
        }
        setContextMenu(null);
      },
    });
  });

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
          null
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

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setContextMenu(null);
  };

  return (
    <div
      {...(!leftClick
        ? { onContextMenu: handleContextMenu }
        : { onClick: handleContextMenu })}
      style={{
        cursor: "context-menu",
        display: "inline",
      }}
    >
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
        {menuItems}
      </Menu>
    </div>
  );
};

export default ContextMenuSkeleton;
