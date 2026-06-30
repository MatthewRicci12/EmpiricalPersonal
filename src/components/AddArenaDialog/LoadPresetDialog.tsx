import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import Preset from "./Preset.tsx";
import { FactorData } from "../types.tsx";
import { PresetData } from "./types.tsx";

interface Props {
  handleClosePresetDialog: React.MouseEventHandler<HTMLButtonElement>;
  presetData: PresetData;
  presetOrder: (keyof PresetData)[];
  handleLoadPreset: (
    factorData: FactorData,
    factorOrder: (keyof FactorData)[]
  ) => void;
  handleDeletePreset: (
    presetToBeDeleted: string
  ) => React.MouseEventHandler<HTMLLIElement>;
}
export const LoadPresetDialog: React.FC<Props> = ({
  handleClosePresetDialog,
  presetData,
  presetOrder,
  handleLoadPreset,
  handleDeletePreset,
}) => {
  const handleClickPreset =
    (
      factorData: FactorData,
      factorOrder: (keyof FactorData)[]
    ): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      //Triggered by clicking a tab
      handleClosePresetDialog(e);
      handleLoadPreset(factorData, factorOrder);
    };

  return (
    <>
      <DialogTitle>Presets</DialogTitle>
      <Stack direction="column" spacing={1} sx={{ mb: 2 }}
      >
      {presetOrder.map((presetTitle, index) => (
        <Preset
          title={presetTitle}
          factorData={presetData[presetTitle].factorData}
          factorOrder={presetData[presetTitle].factorOrder}
          handleClickPreset={handleClickPreset(
            presetData[presetTitle].factorData,
            presetData[presetTitle].factorOrder
          )}
          handleDeletePreset={handleDeletePreset(presetTitle)}
          key={`${presetTitle}-${index}`}
        />
      ))}        
      </Stack>
    </>
  );
};

export default LoadPresetDialog;
