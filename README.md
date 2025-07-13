# 🛒 NFT Marketplace (Foundry + Solidity + Vite Frontend)

This project is a minimal yet fully functional **NFT Marketplace** built using **Foundry (Solidity)** for smart contracts and **React + Vite + Tailwind CSS** for the frontend. It allows users to:

✅ Mint NFTs (via a hardcoded ERC721 MockNFT)  
✅ List NFTs for sale  
✅ Buy NFTs with ETH  
✅ Cancel listed NFTs  
✅ Transfer ownership on successful purchase

---

## 🔧 Tech Stack

**Smart Contracts**
- Solidity ^0.8.24
- Foundry (Forge, Anvil, Cast)
- VM Cheatcodes (for testing)
- Hardcoded ERC721-compatible `MockNFT.sol` for demo purposes

**Frontend**
- React.js (via Vite)
- Tailwind CSS
- Wagmi + RainbowKit (wallet connection)
- Ethers.js

---

## 📁 Project Structure

nft-marketplace/
├── frontend/ # Vite + React + Tailwind frontend
│ ├── src/
│ │ ├── App.jsx # Main UI
│ │ ├── index.css
│ │ └── main.jsx
│ ├── contract.js # Contract ABI & address
│ └── ...
├── src/
│ ├── NFTMarketplace.sol # Marketplace contract (list, buy, cancel)
│ └── MockNFT.sol # Minimal ERC721 NFT
├── test/
│ └── NFTMarketplace.t.sol # Unit tests for core features
├── script/
│ └── Deploy.s.sol # Script for deployment
├── foundry.toml # Foundry config
└── README.md # You're reading it

yaml
Copy
Edit

---

## ⚙️ How to Run

### Backend (Foundry)

1. **Install Foundry**
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
Compile Contracts

bash
Copy
Edit
forge build
Run Tests

bash
Copy
Edit
forge test
Deploy Locally

bash
Copy
Edit
anvil
Then deploy using script or manually via frontend.

Frontend (Vite + React)
Install dependencies

bash
Copy
Edit
cd frontend
npm install
Start dev server

bash
Copy
Edit
npm run dev
Open browser
Go to: http://localhost:5173

📦 Contract Overview
NFTMarketplace.sol
Function	Description
listNFT()	List an NFT for sale
buyNFT()	Buy a listed NFT with ETH
cancelNFT()	Cancel a listed NFT
listings	Mapping from NFT address + tokenId to Listing

MockNFT.sol
Minimal ERC721 contract

Function: mint(uint tokenId, address to)

Used for testing and demo purposes only.

🧪 Tests (via Forge)
✔️ Lists an NFT
✔️ Transfers NFT and ETH on purchase
✔️ Cancels listing
✔️ Prevents unauthorized actions
✔️ Uses vm.deal() to simulate balances

🚀 Future Additions
Update price of listings

Withdraw seller earnings

Marketplace fees and royalties

Events + logs

Full OpenZeppelin ERC721 integration

Persistent storage via backend / IPFS

👨‍💻 Author
Adarsh Kumar
Blockchain Developer — Dubai / India
💼 Solidity | Smart Contracts | Crypto Trading
🔗 LinkedIn
📫 Email: adarshkscodes@gmail.com

📝 License
This project is for educational purposes.
SPDX-License-Identifier: UNLICENSED

---