# 🧱 NFT Marketplace (Foundry + Solidity)

This project is a minimal **NFT Marketplace** built with [Foundry](https://book.getfoundry.sh/), allowing users to:

- ✅ Mint NFTs (via MockNFT)
- ✅ List NFTs for sale
- ✅ Buy NFTs with ETH
- ✅ Transfer ownership on successful purchase

It includes a complete test suite using Forge and is designed for learning, GitHub showcasing, and blockchain developer interviews.

---

## 🔧 Tech Stack

- **Solidity** `^0.8.24`
- **Foundry** (Forge, Anvil, Cast)
- **VM Cheatcodes** for test simulations
- **Hardcoded ERC721 NFT** for simplicity

---

## 📁 Project Structure

nft-marketplace/
├── src/
│ ├── NFTMarketplace.sol # Main marketplace logic
│ └── MockNFT.sol # Minimal ERC721 for testing
├── test/
│ └── NFTMarketplace.t.sol # Unit tests for listing & buying
├── script/ # (Optional) Scripts for deployment
├── foundry.toml # Foundry config
└── README.md


---

## ⚙️ How to Run

### 1. Install Foundry (if not already)

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup

📦 Contract Overview
NFTMarketplace.sol
listNFT(address nft, uint tokenId, uint price)

buyNFT(address nft, uint tokenId) (payable)

Maintains a mapping of listings by NFT address and tokenId

MockNFT.sol
ERC721-like mintable NFT with mint(uint tokenId, address to)

Used for testing only

🧪 Tests
✔️ Lists an NFT successfully

✔️ Transfers NFT and ETH on purchase

🔒 Checks ownership

💰 Uses vm.deal() to simulate account balances

🚀 Future Additions
Cancel listing

Update price

Withdraw earnings

Event logs

Real ERC721 (OpenZeppelin)

Frontend with Next.js or Vite

👨‍💻 Author
Adarsh Kumar
Blockchain Developer — Dubai / India
💼 Solidity | Smart Contracts | Crypto Trading
🔗 LinkedIn https://www.linkedin.com/in/adarshkscodes/
📫 Email: adarshkscodes@gmail.com

