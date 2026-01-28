'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

var MembershipTier;
(function (MembershipTier) {
  MembershipTier[MembershipTier['BRONZE'] = 0] = 'BRONZE';
  MembershipTier[MembershipTier['SILVER'] = 1] = 'SILVER';
  MembershipTier[MembershipTier['GOLD'] = 2] = 'GOLD';
})(MembershipTier = exports.MembershipTier || (exports.MembershipTier = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(6739986666787659948666753771754907668409286105635143120275902562303n, 28);

const _descriptor_1 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_2 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_3 = new __compactRuntime.CompactTypeBytes(32);

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_3.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.bytes);
  }
}

const _descriptor_4 = new _ZswapCoinPublicKey_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_3.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.bytes);
  }
}

const _descriptor_5 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_4.fromValue(value_0),
      right: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_4.toValue(value_0.left).concat(_descriptor_5.toValue(value_0.right)));
  }
}

const _descriptor_6 = new _Either_0();

const _descriptor_7 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_9 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.privateBalance) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named privateBalance');
    }
    if (typeof(witnesses_0.privateTier) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named privateTier');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      verifyTierWithWitness: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`verifyTierWithWitness: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const requestedTier_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyTierWithWitness',
                                      'argument 1 (as invoked from Typescript)',
                                      'TieredTokenGated.compact line 58 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(requestedTier_0) === 'number' && requestedTier_0 >= 0 && requestedTier_0 <= 2)) {
          __compactRuntime.type_error('verifyTierWithWitness',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'TieredTokenGated.compact line 58 char 1',
                                      'Enum<MembershipTier, BRONZE, SILVER, GOLD>',
                                      requestedTier_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(requestedTier_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyTierWithWitness_0(context,
                                                       partialProofData,
                                                       requestedTier_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      verifyTier: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`verifyTier: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const memberAddress_0 = args_1[1];
        const requestedTier_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyTier',
                                      'argument 1 (as invoked from Typescript)',
                                      'TieredTokenGated.compact line 74 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(memberAddress_0) === 'object' && typeof(memberAddress_0.is_left) === 'boolean' && typeof(memberAddress_0.left) === 'object' && memberAddress_0.left.bytes.buffer instanceof ArrayBuffer && memberAddress_0.left.bytes.BYTES_PER_ELEMENT === 1 && memberAddress_0.left.bytes.length === 32 && typeof(memberAddress_0.right) === 'object' && memberAddress_0.right.bytes.buffer instanceof ArrayBuffer && memberAddress_0.right.bytes.BYTES_PER_ELEMENT === 1 && memberAddress_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('verifyTier',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'TieredTokenGated.compact line 74 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      memberAddress_0)
        }
        if (!(typeof(requestedTier_0) === 'number' && requestedTier_0 >= 0 && requestedTier_0 <= 2)) {
          __compactRuntime.type_error('verifyTier',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'TieredTokenGated.compact line 74 char 1',
                                      'Enum<MembershipTier, BRONZE, SILVER, GOLD>',
                                      requestedTier_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(memberAddress_0).concat(_descriptor_1.toValue(requestedTier_0)),
            alignment: _descriptor_6.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyTier_0(context,
                                            partialProofData,
                                            memberAddress_0,
                                            requestedTier_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      verifyTokenAccess: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`verifyTokenAccess: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const userAddress_0 = args_1[1];
        const requiredTokens_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyTokenAccess',
                                      'argument 1 (as invoked from Typescript)',
                                      'TieredTokenGated.compact line 91 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(userAddress_0) === 'object' && typeof(userAddress_0.is_left) === 'boolean' && typeof(userAddress_0.left) === 'object' && userAddress_0.left.bytes.buffer instanceof ArrayBuffer && userAddress_0.left.bytes.BYTES_PER_ELEMENT === 1 && userAddress_0.left.bytes.length === 32 && typeof(userAddress_0.right) === 'object' && userAddress_0.right.bytes.buffer instanceof ArrayBuffer && userAddress_0.right.bytes.BYTES_PER_ELEMENT === 1 && userAddress_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('verifyTokenAccess',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'TieredTokenGated.compact line 91 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      userAddress_0)
        }
        if (!(typeof(requiredTokens_0) === 'bigint' && requiredTokens_0 >= 0n && requiredTokens_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyTokenAccess',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'TieredTokenGated.compact line 91 char 1',
                                      'Uint<0..18446744073709551615>',
                                      requiredTokens_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(userAddress_0).concat(_descriptor_7.toValue(requiredTokens_0)),
            alignment: _descriptor_6.alignment().concat(_descriptor_7.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyTokenAccess_0(context,
                                                   partialProofData,
                                                   userAddress_0,
                                                   requiredTokens_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      isBronzeMember: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`isBronzeMember: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const address_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('isBronzeMember',
                                      'argument 1 (as invoked from Typescript)',
                                      'TieredTokenGated.compact line 106 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(address_0) === 'object' && typeof(address_0.is_left) === 'boolean' && typeof(address_0.left) === 'object' && address_0.left.bytes.buffer instanceof ArrayBuffer && address_0.left.bytes.BYTES_PER_ELEMENT === 1 && address_0.left.bytes.length === 32 && typeof(address_0.right) === 'object' && address_0.right.bytes.buffer instanceof ArrayBuffer && address_0.right.bytes.BYTES_PER_ELEMENT === 1 && address_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('isBronzeMember',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'TieredTokenGated.compact line 106 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      address_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(address_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isBronzeMember_0(context,
                                                partialProofData,
                                                address_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      isSilverMember: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`isSilverMember: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const address_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('isSilverMember',
                                      'argument 1 (as invoked from Typescript)',
                                      'TieredTokenGated.compact line 111 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(address_0) === 'object' && typeof(address_0.is_left) === 'boolean' && typeof(address_0.left) === 'object' && address_0.left.bytes.buffer instanceof ArrayBuffer && address_0.left.bytes.BYTES_PER_ELEMENT === 1 && address_0.left.bytes.length === 32 && typeof(address_0.right) === 'object' && address_0.right.bytes.buffer instanceof ArrayBuffer && address_0.right.bytes.BYTES_PER_ELEMENT === 1 && address_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('isSilverMember',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'TieredTokenGated.compact line 111 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      address_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(address_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isSilverMember_0(context,
                                                partialProofData,
                                                address_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      isGoldMember: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`isGoldMember: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const address_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('isGoldMember',
                                      'argument 1 (as invoked from Typescript)',
                                      'TieredTokenGated.compact line 116 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(address_0) === 'object' && typeof(address_0.is_left) === 'boolean' && typeof(address_0.left) === 'object' && address_0.left.bytes.buffer instanceof ArrayBuffer && address_0.left.bytes.BYTES_PER_ELEMENT === 1 && address_0.left.bytes.length === 32 && typeof(address_0.right) === 'object' && address_0.right.bytes.buffer instanceof ArrayBuffer && address_0.right.bytes.BYTES_PER_ELEMENT === 1 && address_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('isGoldMember',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'TieredTokenGated.compact line 116 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      address_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(address_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isGoldMember_0(context,
                                              partialProofData,
                                              address_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      checkPrivateBalance: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`checkPrivateBalance: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('checkPrivateBalance',
                                      'argument 1 (as invoked from Typescript)',
                                      'TieredTokenGated.compact line 122 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._checkPrivateBalance_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      checkPrivateTier: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`checkPrivateTier: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('checkPrivateTier',
                                      'argument 1 (as invoked from Typescript)',
                                      'TieredTokenGated.compact line 126 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._checkPrivateTier_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      verifyTierWithWitness: this.circuits.verifyTierWithWitness,
      verifyTier: this.circuits.verifyTier,
      verifyTokenAccess: this.circuits.verifyTokenAccess,
      isBronzeMember: this.circuits.isBronzeMember,
      isSilverMember: this.circuits.isSilverMember,
      isGoldMember: this.circuits.isGoldMember,
      checkPrivateBalance: this.circuits.checkPrivateBalance,
      checkPrivateTier: this.circuits.checkPrivateTier
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('verifyTierWithWitness', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyTier', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyTokenAccess', new __compactRuntime.ContractOperation());
    state_0.setOperation('isBronzeMember', new __compactRuntime.ContractOperation());
    state_0.setOperation('isSilverMember', new __compactRuntime.ContractOperation());
    state_0.setOperation('isGoldMember', new __compactRuntime.ContractOperation());
    state_0.setOperation('checkPrivateBalance', new __compactRuntime.ContractOperation());
    state_0.setOperation('checkPrivateTier', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(1n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(2n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _privateBalance_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.privateBalance(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 6739986666787659948666753771754907668409286105635143120275902562303n)) {
      __compactRuntime.type_error('privateBalance',
                                  'return value',
                                  'TieredTokenGated.compact line 16 char 1',
                                  'Uint<0..6739986666787659948666753771754907668409286105635143120275902562303>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _privateTier_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.privateTier(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'number' && result_0 >= 0 && result_0 <= 2)) {
      __compactRuntime.type_error('privateTier',
                                  'return value',
                                  'TieredTokenGated.compact line 17 char 1',
                                  'Enum<MembershipTier, BRONZE, SILVER, GOLD>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _getMemberBalance_0(context, partialProofData, address_0) {
    if (_descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(address_0),
                                                                                                        alignment: _descriptor_6.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value))
    {
      return _descriptor_7.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_8.toValue(0n),
                                                                                 alignment: _descriptor_8.alignment() } }] } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_6.toValue(address_0),
                                                                                 alignment: _descriptor_6.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    } else {
      return 0n;
    }
  }
  _getTokenBalance_0(context, partialProofData, address_0) {
    if (_descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_8.toValue(1n),
                                                                            alignment: _descriptor_8.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(address_0),
                                                                                                        alignment: _descriptor_6.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value))
    {
      return _descriptor_7.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_8.toValue(1n),
                                                                                 alignment: _descriptor_8.alignment() } }] } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_6.toValue(address_0),
                                                                                 alignment: _descriptor_6.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    } else {
      return 0n;
    }
  }
  _hasValidCommitment_0(context, partialProofData, address_0) {
    return _descriptor_2.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_8.toValue(2n),
                                                                               alignment: _descriptor_8.alignment() } }] } },
                                                    { push: { storage: false,
                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(address_0),
                                                                                                           alignment: _descriptor_6.alignment() }).encode() } },
                                                    'member',
                                                    { popeq: { cached: true,
                                                               result: undefined } }]).value);
  }
  _verifyTierWithWitness_0(context, partialProofData, requestedTier_0) {
    const privateUserTier_0 = this._privateTier_0(context, partialProofData);
    if (privateUserTier_0 === 0) {
      return this._privateBalance_0(context, partialProofData) >= 100n;
    } else {
      if (privateUserTier_0 === 1) {
        return this._privateBalance_0(context, partialProofData) >= 500n;
      } else {
        if (privateUserTier_0 === 2) {
          return this._privateBalance_0(context, partialProofData) >= 1000n;
        } else {
          return false;
        }
      }
    }
  }
  _verifyTier_0(context, partialProofData, memberAddress_0, requestedTier_0) {
    const balance_0 = this._getMemberBalance_0(context,
                                               partialProofData,
                                               memberAddress_0);
    if (requestedTier_0 === 0) {
      return balance_0 >= 1n;
    } else {
      if (requestedTier_0 === 1) {
        return balance_0 >= 3n;
      } else {
        if (requestedTier_0 === 2) {
          return balance_0 >= 5n;
        } else {
          return false;
        }
      }
    }
  }
  _verifyTokenAccess_0(context,
                       partialProofData,
                       userAddress_0,
                       requiredTokens_0)
  {
    const tokenBalance_0 = this._getTokenBalance_0(context,
                                                   partialProofData,
                                                   userAddress_0);
    const hasCommitment_0 = this._hasValidCommitment_0(context,
                                                       partialProofData,
                                                       userAddress_0);
    if (tokenBalance_0 < requiredTokens_0) {
      return false;
    } else {
      return hasCommitment_0;
    }
  }
  _isBronzeMember_0(context, partialProofData, address_0) {
    return this._getMemberBalance_0(context, partialProofData, address_0) >= 1n;
  }
  _isSilverMember_0(context, partialProofData, address_0) {
    return this._getMemberBalance_0(context, partialProofData, address_0) >= 3n;
  }
  _isGoldMember_0(context, partialProofData, address_0) {
    return this._getMemberBalance_0(context, partialProofData, address_0) >= 5n;
  }
  _checkPrivateBalance_0(context, partialProofData) {
    return this._privateBalance_0(context, partialProofData);
  }
  _checkPrivateTier_0(context, partialProofData) {
    return this._privateTier_0(context, partialProofData);
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    memberBalances: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                                                               alignment: _descriptor_7.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'TieredTokenGated.compact line 22 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(key_0),
                                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'TieredTokenGated.compact line 22 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      key_0)
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_6.toValue(key_0),
                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_6.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    tokenBalances: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(1n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                                                               alignment: _descriptor_7.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(1n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'TieredTokenGated.compact line 24 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(1n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(key_0),
                                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'TieredTokenGated.compact line 24 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      key_0)
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(1n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_6.toValue(key_0),
                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_6.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    accessCommitments: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(2n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                                                               alignment: _descriptor_7.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(2n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'TieredTokenGated.compact line 26 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(2n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(key_0),
                                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'TieredTokenGated.compact line 26 char 1',
                                      'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                      key_0)
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(2n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_6.toValue(key_0),
                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_6.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  privateBalance: (...args) => undefined, privateTier: (...args) => undefined
});
const pureCircuits = {};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
