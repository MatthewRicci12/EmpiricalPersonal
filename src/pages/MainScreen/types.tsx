import { TrialInnerData } from "../../components/AddTrialDialog/types";
import { Result } from "../../components/types";

export const MAX_ARENA_NAME_LENGTH = 32;

export type SubTrialData = Record<string, [Result, string, string]>;
export type TrialData = Record<string, TrialInnerData>;
export type ArenaData = Record<string, TrialData>;
