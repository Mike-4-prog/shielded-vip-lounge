# 🛡️ Shielded VIP Lounge  
**Privacy-Preserving VIP Access Using Midnight Network Zero-Knowledge Proofs**

Shielded VIP Lounge is a decentralized application (dApp) that allows users to verify VIP status using **zero-knowledge proofs (ZKPs)** without revealing their identity.  
Built on the **Midnight Network**, it enables secure membership verification, token-gated access, and privacy-preserving interactions.

---

## 🚀 Features

### 🔒 Privacy-Preserving Verification
Users generate ZK proofs locally to prove VIP membership **without exposing identities or wallet details**.

### 🪪 Membership Token (VIP Pass)
A custom smart contract (`VipPassToken`) issues non-transferable VIP passes used to verify membership tiers.

### 🧠 Zero-Knowledge Circuits
Custom circuits (created using Midnight’s compact syntax) allow:
- Membership verification  
- Tier validation  
- Proof generation on the client

### 🌐 Frontend (Vite + React)
A simple and interactive UI where users:
- Connect wallet  
- Generate ZK proofs  
- Access exclusive VIP content  

### 🧩 Modular Architecture
Clear separation of concerns:  
`contracts/` → smart contracts  
`contracts/circuits/` → ZK circuits  
`frontend/` → UI + Midnight client

---

## 📂 Project Structure
```text
shielded-vip-lounge/
│
├── contracts/
│ ├── VipPassToken.compact # Main membership token contract
│ └── circuits/
│ └── membership_proof.compact # Zero-knowledge circuit
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── components/
│ │ │ ├── VIPTiers.jsx
│ │ │ ├── VipLounge.jsx
│ │ │ └── VerificationError.jsx
│ │ └── utils/
│ │ └── MidnightClient.js # Midnight JS SDK integration
│ ├── index.html
│ ├── main.jsx
│ └── vite.config.js
│
├── LICENSE
└── README.md
```

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Mike-4-prog/shielded-vip-lounge.git
cd shielded-vip-lounge
```
### 3. Install frontend dependencies**
```bash
cd frontend
npm install
```
### 3. Run the Frontend

```bash
npm run dev
```
### 4. Install Midnight JS SDK
```bash
npm install midnight-js
```
## 🧾 Smart Contract Overview
### VipPassToken.compact

- A non-transferable membership token contract:

- Mints “VIP Pass” tokens

- Assigns tiers (Gold, Silver, Bronze)

- Locks tokens to prevent transfers

- Exposes membership verification interface for ZK circuits
### membership_proof.compact

Zero-knowledge circuit for:

- Proving token ownership

- Validating tier

- Generating proofs without leaking wallet address
## 🖥️ Frontend Overview
Built With:

- React

- Vite

- Midnight JS SDK

 Lightweight component structure
Key UI Components:

- VIPTiers.jsx → Displays tiers

- VipLounge.jsx → Exclusive content area

- VerificationError.jsx → Error handling

Midnight Client

`frontend/src/utils/MidnightClient.js` manages:

- Proof generation

- Contract interactions

- Circuit execution
## 🧪 Development Notes

To avoid committing `node_modules`, make sure `.gitignore` includes:
```bash
frontend/node_modules/
```
To format the compact contracts, run:
```bash
midnight-compact fmt contracts/VipPassToken.compact
```
## 📜 License

This project is licensed under the MIT License.


