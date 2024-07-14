'use client';

import React, { ReactNode } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '6ade5834c9a3026c8b07e18c5e65aa57';

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
};

// 3. Create a metadata object
const metadata = {
    name: 'Whippin-Musique',
    description: 'AppKit Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: '...',
  defaultChainId: 1
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true,
  enableOnramp: true
});

export function Web3Modal({ children }: { children: ReactNode }) {
  return children;
}
