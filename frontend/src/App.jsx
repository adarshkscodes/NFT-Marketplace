// src/App.jsx
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useWriteContract } from "wagmi";
import { parseEther } from "viem";

/* ─────────────────── Contract Constants ─────────────────── */
const CONTRACT_ADDRESS = "0x5b73c5498c1e3b4dba84de0f1833c4a029d90519";

const CONTRACT_ABI = [
  {
    name: "listNFT",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "nft", type: "address" },
      { name: "tokenId", type: "uint256" },
      { name: "price", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "buyNFT",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "nft", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "cancelList",          // 👈 NEW
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "nft", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
];

/* ───────────────────── Main Component ───────────────────── */
export default function App() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();

  /* ---------- List NFT state ---------- */
  const [nftAddr, setNftAddr] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [priceEth, setPriceEth] = useState("");

  /* ---------- Buy NFT state ---------- */
  const [buyNftAddr, setBuyNftAddr] = useState("");
  const [buyTokenId, setBuyTokenId] = useState("");
  const [buyPriceEth, setBuyPriceEth] = useState("");

  /* ---------- Cancel NFT state ---------- */
  const [cancelNftAddr, setCancelNftAddr] = useState("");
  const [cancelTokenId, setCancelTokenId] = useState("");

  /* ---------- UI state ---------- */
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  /* ──────────── List NFT ──────────── */
  async function handleList() {
    if (!nftAddr || !tokenId || !priceEth) {
      return alert("All fields required.");
    }
    try {
      setLoading(true);
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "listNFT",
        args: [nftAddr, BigInt(tokenId), parseEther(priceEth)],
      });
      setTxHash(hash);
      alert("NFT Listed! 🎉");
    } catch (err) {
      alert(err?.shortMessage || "List failed");
    } finally {
      setLoading(false);
    }
  }

  /* ──────────── Buy NFT ──────────── */
  async function handleBuy() {
    if (!buyNftAddr || !buyTokenId || !buyPriceEth) {
      return alert("All fields required.");
    }
    try {
      setLoading(true);
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "buyNFT",
        args: [buyNftAddr, BigInt(buyTokenId)],
        value: parseEther(buyPriceEth),
      });
      setTxHash(hash);
      alert("NFT Purchased! ✅");
    } catch (err) {
      alert(err?.shortMessage || "Buy failed");
    } finally {
      setLoading(false);
    }
  }

  /* ─────────── Cancel Listing ─────────── */
  async function handleCancel() {
    if (!cancelNftAddr || !cancelTokenId) {
      return alert("Both fields required.");
    }
    try {
      setLoading(true);
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "cancelList",
        args: [cancelNftAddr, BigInt(cancelTokenId)],
      });
      setTxHash(hash);
      alert("Listing cancelled 🗑️");
    } catch (err) {
      alert(err?.shortMessage || "Cancel failed");
    } finally {
      setLoading(false);
    }
  }

  /* ────────────────────────── JSX ───────────────────────── */
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">NFT Marketplace</h1>

        {/* Wallet Connect */}
        <div className="flex justify-center">
          <ConnectButton />
        </div>

        {/* Wallet Info */}
        {isConnected && (
          <div className="text-sm text-center text-gray-600 break-all">
            Connected:&nbsp;
            <span className="font-mono">{address}</span>
            <button
              onClick={disconnect}
              className="block mx-auto mt-2 text-red-500 underline"
            >
              Disconnect
            </button>
          </div>
        )}

        {/* List NFT Form */}
        <div className="border-t pt-6 space-y-3">
          <h2 className="font-semibold text-lg">List NFT</h2>
          <input
            placeholder="NFT Address"
            value={nftAddr}
            onChange={(e) => setNftAddr(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            placeholder="Price in ETH"
            value={priceEth}
            onChange={(e) => setPriceEth(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button
            onClick={handleList}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Listing…" : "List NFT"}
          </button>
        </div>

        {/* Buy NFT Form */}
        <div className="border-t pt-6 space-y-3">
          <h2 className="font-semibold text-lg">Buy NFT</h2>
          <input
            placeholder="NFT Address"
            value={buyNftAddr}
            onChange={(e) => setBuyNftAddr(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            placeholder="Token ID"
            value={buyTokenId}
            onChange={(e) => setBuyTokenId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            placeholder="Price in ETH"
            value={buyPriceEth}
            onChange={(e) => setBuyPriceEth(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button
            onClick={handleBuy}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Buying…" : "Buy NFT"}
          </button>
        </div>

        {/* Cancel Listing Form */}
        <div className="border-t pt-6 space-y-3">
          <h2 className="font-semibold text-lg">Cancel Listing</h2>
          <input
            placeholder="NFT Address"
            value={cancelNftAddr}
            onChange={(e) => setCancelNftAddr(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            placeholder="Token ID"
            value={cancelTokenId}
            onChange={(e) => setCancelTokenId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button
            onClick={handleCancel}
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            {loading ? "Cancelling…" : "Cancel Listing"}
          </button>
        </div>

        {/* Tx Hash */}
        {txHash && (
          <div className="text-xs text-center text-gray-500 break-all">
            Tx Hash:&nbsp;{txHash}
          </div>
        )}
      </div>
    </main>
  );
}
