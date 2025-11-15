import React, { createContext, useState, useContext, useCallback } from "react";

interface DirtyStateContextType {
  isDirty: boolean;
  setDirty: (value: boolean) => void;
}
const DirtyStateContext = createContext<DirtyStateContextType | undefined>(
  undefined
);

interface DirtyStateProviderProps {
  children: React.ReactNode;
}

export const DirtyStateProvider = ({ children }: DirtyStateProviderProps) => {
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const setDirty = (value: boolean) => {
    setIsDirty(value);
  };

  const value = { isDirty, setDirty };

  return (
    <DirtyStateContext.Provider value={value}>
      {children}
    </DirtyStateContext.Provider>
  );
};

export const useDirtyState = (): DirtyStateContextType => {
  const context = useContext(DirtyStateContext);
  if (context === undefined) {
    throw new Error("useDirtyState must be used within a DirtyStateProvider");
  }
  return context;
};

export default DirtyStateContext;
