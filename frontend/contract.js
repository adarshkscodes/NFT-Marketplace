// frontend/src/contract.js
import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "0x5b73c5498c1e3b4dba84de0f1833c4a029d90519";

export const CONTRACT_ABI = [
  {
    "type": "function",
    "name": "buyNFT",
    "inputs": [
      { "name": "nft", "type": "address", "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "listNFT",
    "inputs": [
      { "name": "nft", "type": "address", "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
      { "name": "price", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "listings",
    "inputs": [
      { "name": "", "type": "address", "internalType": "address" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      { "name": "seller", "type": "address", "internalType": "address" },
      { "name": "price", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  }
];
