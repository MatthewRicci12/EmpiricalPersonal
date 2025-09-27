import { SubTrialData } from "../../pages/MainScreen/MainScreen";

export const MAX_TRIAL_NAME_LENGTH = 64;

export interface TrialInnerData {
  trialTitle: string;
  successString: string;
  failureString: string;
  additionalNotesString: string;
  subTrialData: SubTrialData;
  subTrialOrder: (keyof SubTrialData)[];
}
