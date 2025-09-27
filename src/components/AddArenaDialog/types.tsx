import { FactorData } from "../types";

export type PresetData = Record<
  string,
  { factorData: FactorData; factorOrder: (keyof FactorData)[] }
>;
