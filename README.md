# 🛒 NFT Marketplace (Foundry + Vite + Solidity)

This is a minimal, full-stack **NFT Marketplace** project built using **Solidity**, **Foundry**, and a modern **React (Vite)** frontend. It allows users to:

✅ List NFTs for sale  
✅ Buy NFTs with ETH  
✅ Cancel NFT listings  
✅ Transfer ownership on purchase

It includes a clean test suite using **Forge**, is fully frontend-integrated with **RainbowKit + Wagmi**, and is built to showcase real-world smart contract interaction.

---

## 🔧 Tech Stack

### Backend
- **Solidity** `^0.8.24`
- **Foundry** (`Forge`, `Anvil`, `Cast`)
- **Hardcoded ERC721-like mock NFT** for simplicity
- **Unit tests with cheatcodes**

### Frontend
- **React** with **Vite**
- **Tailwind CSS**
- **RainbowKit** + **Wagmi** + **Ethers.js**
- Supports wallet connection, listing NFTs, buying, canceling

---

## 📁 Project Structure

nft-marketplace/
├── src/
│ └── NFTMarketplace.sol # Marketplace smart contract
├── test/
│ └── NFTMarketplace.t.sol # Full test suite using Forge
├── script/
│ └── Deploy.s.sol # Deployment script
├── frontend/
│ ├── src/
│ │ ├── App.jsx # React UI (List, Buy, Cancel)
│ │ ├── main.jsx, index.css # App bootstrap & styles
│ └── package.json, tailwind.config.js, ...
├── foundry.toml
└── README.md


---

## 🚀 Features

### ✅ Core Smart Contract Functions

#### `listNFT(address nft, uint tokenId, uint price)`
- Lists an NFT on the marketplace
- Must be owner of token
- Must not already be listed

#### `buyNFT(address nft, uint tokenId)`
- Transfers NFT to buyer
- Transfers ETH to seller

#### `cancelListing(address nft, uint tokenId)`
- Cancels an active listing
- Only callable by the original seller

---

## 🧪 Tests (Forge)

- ✅ Lists an NFT successfully
- ✅ Transfers NFT & ETH correctly on purchase
- ✅ Prevents buying with incorrect price
- ✅ Allows only seller to cancel
- ✅ Reverts unauthorized actions
- ✅ Simulates ownership, ETH balances, reverts

Run with:
```bash
forge test

🌐 Frontend Usage

cd frontend
npm install
npm run dev

Connect your wallet with RainbowKit

List NFTs with contract address, tokenId, and price

Buy NFTs with ETH (uses native value)

Cancel listings if you are the seller

⚙️ Deploy & Run

1. Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

2. Compile & Test
forge build
forge test

3. Start Frontend
cd frontend
npm run dev


👨‍💻 Author
Adarsh Kumar
Blockchain Developer — Dubai / India
💼 Solidity | Smart Contracts | DApps | Crypto Trading
🔗 LinkedIn
📧 adarshkscodes@gmail.com

📌 License
SPDX-License-Identifier: UNLICENSED
This project is intended for educational and portfolio purposes only.


---