import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum MembershipTier { BRONZE = 0, SILVER = 1, GOLD = 2 }

export type Witnesses<T> = {
  privateBalance(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
  privateTier(context: __compactRuntime.WitnessContext<Ledger, T>): [T, MembershipTier];
}

export type ImpureCircuits<T> = {
  verifyTierWithWitness(context: __compactRuntime.CircuitContext<T>,
                        requestedTier_0: MembershipTier): __compactRuntime.CircuitResults<T, boolean>;
  verifyTier(context: __compactRuntime.CircuitContext<T>,
             memberAddress_0: { is_left: boolean,
                                left: { bytes: Uint8Array },
                                right: { bytes: Uint8Array }
                              },
             requestedTier_0: MembershipTier): __compactRuntime.CircuitResults<T, boolean>;
  verifyTokenAccess(context: __compactRuntime.CircuitContext<T>,
                    userAddress_0: { is_left: boolean,
                                     left: { bytes: Uint8Array },
                                     right: { bytes: Uint8Array }
                                   },
                    requiredTokens_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  isBronzeMember(context: __compactRuntime.CircuitContext<T>,
                 address_0: { is_left: boolean,
                              left: { bytes: Uint8Array },
                              right: { bytes: Uint8Array }
                            }): __compactRuntime.CircuitResults<T, boolean>;
  isSilverMember(context: __compactRuntime.CircuitContext<T>,
                 address_0: { is_left: boolean,
                              left: { bytes: Uint8Array },
                              right: { bytes: Uint8Array }
                            }): __compactRuntime.CircuitResults<T, boolean>;
  isGoldMember(context: __compactRuntime.CircuitContext<T>,
               address_0: { is_left: boolean,
                            left: { bytes: Uint8Array },
                            right: { bytes: Uint8Array }
                          }): __compactRuntime.CircuitResults<T, boolean>;
  checkPrivateBalance(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, bigint>;
  checkPrivateTier(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, MembershipTier>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  verifyTierWithWitness(context: __compactRuntime.CircuitContext<T>,
                        requestedTier_0: MembershipTier): __compactRuntime.CircuitResults<T, boolean>;
  verifyTier(context: __compactRuntime.CircuitContext<T>,
             memberAddress_0: { is_left: boolean,
                                left: { bytes: Uint8Array },
                                right: { bytes: Uint8Array }
                              },
             requestedTier_0: MembershipTier): __compactRuntime.CircuitResults<T, boolean>;
  verifyTokenAccess(context: __compactRuntime.CircuitContext<T>,
                    userAddress_0: { is_left: boolean,
                                     left: { bytes: Uint8Array },
                                     right: { bytes: Uint8Array }
                                   },
                    requiredTokens_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  isBronzeMember(context: __compactRuntime.CircuitContext<T>,
                 address_0: { is_left: boolean,
                              left: { bytes: Uint8Array },
                              right: { bytes: Uint8Array }
                            }): __compactRuntime.CircuitResults<T, boolean>;
  isSilverMember(context: __compactRuntime.CircuitContext<T>,
                 address_0: { is_left: boolean,
                              left: { bytes: Uint8Array },
                              right: { bytes: Uint8Array }
                            }): __compactRuntime.CircuitResults<T, boolean>;
  isGoldMember(context: __compactRuntime.CircuitContext<T>,
               address_0: { is_left: boolean,
                            left: { bytes: Uint8Array },
                            right: { bytes: Uint8Array }
                          }): __compactRuntime.CircuitResults<T, boolean>;
  checkPrivateBalance(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, bigint>;
  checkPrivateTier(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, MembershipTier>;
}

export type Ledger = {
  memberBalances: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: { is_left: boolean,
                    left: { bytes: Uint8Array },
                    right: { bytes: Uint8Array }
                  }): boolean;
    lookup(key_0: { is_left: boolean,
                    left: { bytes: Uint8Array },
                    right: { bytes: Uint8Array }
                  }): bigint;
    [Symbol.iterator](): Iterator<[{ is_left: boolean, left: { bytes: Uint8Array }, right: { bytes: Uint8Array } }, bigint]>
  };
  tokenBalances: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: { is_left: boolean,
                    left: { bytes: Uint8Array },
                    right: { bytes: Uint8Array }
                  }): boolean;
    lookup(key_0: { is_left: boolean,
                    left: { bytes: Uint8Array },
                    right: { bytes: Uint8Array }
                  }): bigint;
    [Symbol.iterator](): Iterator<[{ is_left: boolean, left: { bytes: Uint8Array }, right: { bytes: Uint8Array } }, bigint]>
  };
  accessCommitments: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: { is_left: boolean,
                    left: { bytes: Uint8Array },
                    right: { bytes: Uint8Array }
                  }): boolean;
    lookup(key_0: { is_left: boolean,
                    left: { bytes: Uint8Array },
                    right: { bytes: Uint8Array }
                  }): Uint8Array;
    [Symbol.iterator](): Iterator<[{ is_left: boolean, left: { bytes: Uint8Array }, right: { bytes: Uint8Array } }, Uint8Array]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
