import { SubtrialData } from "../../pages/MainScreen/types";
import { FactorData } from "../types";

export const MAX_TRIAL_NAME_LENGTH = 64;

type uuid = string;
export interface TrialInnerData {
  trialTitle: string;
  successString: string;
  failureString: string;
  additionalNotesString: string;
  indivFactorData: FactorData;
  indivFactorOrder: (keyof FactorData)[];
  subtrialData: uuid[];
}
