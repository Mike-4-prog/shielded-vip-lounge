# Shielded VIP Lounge - Tiered Token Gated Contract

A privacy-preserving smart contract for gating access based on token balances and membership tiers, built with Midnight Network's zero-knowledge technology.

## 🏗️ Project Overview

The Shielded VIP Lounge contract implements a privacy-preserving access control system using zero-knowledge proofs. It verifies user eligibility based on token holdings and membership tiers without revealing sensitive user data.

## 📊 Contract Status

- **✅ Contract Compiled**: 8 ZK circuits implemented
- **✅ Witness Functions**: 2 private witness functions ready
- **✅ Verification**: Contract structure verified and ready
- **⏳ Deployment**: Awaiting Midnight SDK for blockchain deployment

## 🔧 Contract Architecture

### Core Circuits
1. **verifyTierWithWitness** - Private tier verification with witness inputs
2. **verifyTier** - Public tier verification using on-chain data
3. **verifyTokenAccess** - Token balance verification for access control
4. **isBronzeMember** / **isSilverMember** / **isGoldMember** - Tier-specific checks
5. **checkPrivateBalance** / **checkPrivateTier** - Witness-based private data verification

### Privacy Features
- **Zero-Knowledge Proofs**: User data remains private
- **Witness Functions**: `privateBalance()` and `privateTier()` provide private inputs
- **Tiered Access**: BRONZE, SILVER, GOLD membership levels
- **Token Gating**: Access control based on token balances

## 📁 Project Structure
```text
shielded-vip-lounge/
├── clean-deployment-project/ # Main deployment workspace
│ ├── contract-build/ # Compiled contract
│ ├── deploy.js # Deployment script
│ ├── deploy-verify.js # Contract verification
│ ├── test-contract.mjs # Contract testing
│ ├── docker-compose.yml # DevNet configuration
│ ├── Makefile # DevNet commands
│ └── package.json # Dependencies
├── contract/ # Source code
│ ├── build/ # Compiled output
│ ├── contracts/ # Contract sources
│ └── src/ # TypeScript source files
├── frontend/ # Web interface (optional)
└── scripts/ # Utility scripts
```

## 🚀 Quick Start

### 1. Verify Contract
```bash
cd clean-deployment-project
node deploy-verify.js
2. Test Contract Loading
bash
node test-contract.mjs
3. Development Network
bash
# Start local DevNet (when Midnight SDK available)
make devnet

# Check status
make status

# View logs
make logs

# Clean up
make clean
4. Deployment
bash
# Deploy to DevNet (when Midnight SDK available)
node deploy.js
🔌 Prerequisites
For full deployment capability, access to Midnight Network's development tools is required:

Midnight SDK: For wallet creation and contract deployment

Compact Runtime: Required by compiled contracts

DevNet: Local development network

🛠️ Development
Contract Compilation
bash
cd contract
# Use Midnight Compact compiler for contract compilation
Verification
bash
cd clean-deployment-project
node deploy-verify.js  # Verifies contract structure and readiness
Testing
bash
node test-contract.mjs  # Tests contract loading and basic functionality
🎯 Key Features
Privacy-First Design: All user verification happens with zero-knowledge proofs

Flexible Tier System: Three membership levels with configurable requirements

Token-Based Access: Gated access controlled by token balances

Witness Support: Private data inputs from user devices

Complete Circuit Suite: 8 specialized circuits for different verification scenarios

📋 Deployment Notes
Current Status: Contract is compiled and verified

Blockchain Ready: Structure is complete for Midnight Network deployment

Dependencies: Requires Midnight SDK for actual blockchain deployment

Network Support: Configured for Midnight DevNet deployment

📄 License
MIT License - See LICENSE file for details.

🤝 Support & Deployment
For deployment assistance and Midnight Network access:

Contact Midnight Network team for SDK access

Reference contract ID: TieredTokenGated

Circuit count: 8 ZK circuits

Witness functions: 2 (privateBalance, privateTier)

Project organized and ready for Midnight Network deployment
