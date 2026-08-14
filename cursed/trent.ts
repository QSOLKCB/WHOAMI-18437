export type ModelFamily =
  | "QSOL"
  | "Sonification"
  | "FormalMethods"
  | "DeterministicChaos"
  | "6502"
  | "COBOL"
  | "FORTRAN"
  | "Unknown";

export interface TrentFusionRuntime {
  identity: "Trent";
  provider: "SelfHostedBiologicalIntelligence";
  determinism: true;
  newRepoProbability: number;
  restMode: never;
}

export const runtime: TrentFusionRuntime = {
  identity: "Trent",
  provider: "SelfHostedBiologicalIntelligence",
  determinism: true,
  newRepoProbability: Infinity,
  restMode: undefined as never,
};
