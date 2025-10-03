import Box from "@mui/system/Box";
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
      <Box
        sx={{
          height: "500px",
          width: "500px",
        }}
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
      </Box>
    </>
  );
};

export default LoadPresetDialog;
