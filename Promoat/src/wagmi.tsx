'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  rainbowWallet,
  trustWallet,
  braveWallet,
  ledgerWallet,
  injectedWallet,
  walletConnectWallet,
  argentWallet,
  zerionWallet,
  okxWallet,
  safeWallet,
  omniWallet,
  xdefiWallet,
  tahoWallet,
  binanceWallet,
  bitgetWallet,
} from '@rainbow-me/rainbowkit/wallets'; // Import more wallets
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName:'Recommended Wallet',
          wallets:[
            coinbaseWallet,      // Coinbase Wallet
          ],
        },
        {
          groupName: 'Popular Wallets',
          wallets: [
            metaMaskWallet,      // MetaMask
            rainbowWallet,       // Rainbow Wallet
            trustWallet,         // Trust Wallet
            braveWallet,         // Brave Wallet
            ledgerWallet,        // Ledger Wallet
            walletConnectWallet, // WalletConnect
          ],
        },
        {
          groupName: 'Other Wallets',
          wallets: [
            injectedWallet,     // Injected Wallet (Browser Wallets)
            argentWallet,       // Argent Wallet
            zerionWallet,       // Zerion Wallet
            okxWallet,          // OKX Wallet
            safeWallet,         // Safe Wallet (Gnosis Safe)
            omniWallet,         // Omni Wallet
            xdefiWallet,        // XDEFI Wallet
            tahoWallet,         // Taho Wallet (Formerly Tally)
            binanceWallet,
            bitgetWallet
          ],
        },
      ],
      {
        appName: 'onchainkit', // Your app's name
        projectId, // WalletConnect project ID
      },
    );

    const wagmiConfig = createConfig({
      chains: [base, baseSepolia], // Chains to support
      multiInjectedProviderDiscovery: false, // Disable injected provider discovery
      connectors, // Set up connectors
      ssr: true, // Enable SSR for wagmi
      transports: {
        [base.id]: http(),         // HTTP transport for base chain
        [baseSepolia.id]: http(),  // HTTP transport for baseSepolia chain
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
