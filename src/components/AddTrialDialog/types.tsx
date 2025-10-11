import { SubTrialData } from "../../pages/MainScreen/types";
import { FactorData } from "../types";

export const MAX_TRIAL_NAME_LENGTH = 64;

export interface TrialInnerData {
  trialTitle: string;
  successString: string;
  failureString: string;
  additionalNotesString: string;
  indivFactorData: FactorData;
  indivFactorOrder: (keyof FactorData)[];
  subTrialData: SubTrialData;
  subTrialOrder: (keyof SubTrialData)[];
}
