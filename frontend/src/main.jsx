// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* ───────── wagmi / RainbowKit ───────── */
import { WagmiConfig, createConfig, http } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";

import {
  RainbowKitProvider,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

/* ───────── TanStack Query (required by wagmi v2) ───────── */
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

/* ───────── 1. Chains & transports ───────── */
const chains = [sepolia, hardhat];
const transports = {
  [sepolia.id]: http(),           // ← use custom RPC URL if desired
  [hardhat.id]: http(),           // ← defaults to localhost:8545 if running Hardhat
};

/* ───────── 2. Wallet connectors ───────── */
const { connectors } = getDefaultWallets({
  appName: "NFT Marketplace",
  projectId: "f1d753043a6016339d817e6da3f3dc1d", // 🔑 replace with a real ID from cloud.walletconnect.com
  chains,
});

/* ───────── 3. wagmi config ───────── */
const wagmiConfig = createConfig({
  chains,
  connectors,
  transports,
  ssr: false,
});

/* ───────── 4. QueryClient for React‑Query ───────── */
const queryClient = new QueryClient();

/* ───────── 5. Render React tree ───────── */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
