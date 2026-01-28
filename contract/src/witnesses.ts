// Witness definitions for TieredTokenGated contract
// This file connects private user data to the circuits

import { Ledger } from "./managed/TieredTokenGated/contract/index.cjs";
import { WitnessContext } from "@midnight-ntwrk/compact-runtime";

// =====================
// Private State Definition
// =====================
export type TieredTokenPrivateState = {
  readonly tokenBalance: bigint;  // Use bigint for Uint<222>
  readonly membershipTier: number; // 0=BRONZE, 1=SILVER, 2=GOLD
};

export const createTieredTokenPrivateState = (
  tokenBalance: bigint,
  membershipTier: number
): TieredTokenPrivateState => ({
  tokenBalance,
  membershipTier
});

// =====================
// Witness Functions
// =====================
export const witnesses = {
  // Provides user's token balance to circuits
  privateBalance: ({
    privateState,
  }: WitnessContext<Ledger, TieredTokenPrivateState>): [
    TieredTokenPrivateState,
    bigint,
  ] => {
    // Return [newPrivateState, valueForCircuit]
    // Since balance doesn't change in this circuit, return same state
    return [privateState, privateState.tokenBalance];
  },

  // Provides user's membership tier to circuits
  privateTier: ({
    privateState,
  }: WitnessContext<Ledger, TieredTokenPrivateState>): [
    TieredTokenPrivateState,
    number,
  ] => {
    // Return [newPrivateState, valueForCircuit]
    return [privateState, privateState.membershipTier];
  },
};
