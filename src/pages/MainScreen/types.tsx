import { TrialInnerData } from "../../components/AddTrialDialog/types";
import { Result } from "../../components/types";

export const MAX_ARENA_NAME_LENGTH = 32;

type uuid = string;
export type SubtrialData = Record<uuid, [Result, string, string]>;
export type TrialData = Record<uuid, TrialInnerData>;
export type ArenaData = Record<string, uuid[]>;
