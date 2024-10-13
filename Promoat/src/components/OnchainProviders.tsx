'use client';
import { useState } from 'react'; // Import useState hook for state management
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { NEXT_PUBLIC_CDP_API_KEY } from '../config';
import { useWagmiConfig } from '../wagmi';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function OnchainProviders({ children }: Props) {
  const wagmiConfig = useWagmiConfig();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // RainbowKit theme selection (dark or light)
  const selectedTheme = darkTheme();  

  // Toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={NEXT_PUBLIC_CDP_API_KEY} chain={base}>
          <RainbowKitProvider theme={selectedTheme} modalStyles={{ padding: '1rem', borderRadius: '8px' }}>
            <div className="relative min-h-screen flex flex-col items-center justify-center">
              {/* Conditionally render the overlay only when it's open */}
              {isModalOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                  {/* Modal box */}
                  <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-xl font-semibold mb-4 text-center">Connect Your Wallet</h2>
                    <button
                      onClick={toggleModal} // Close the modal when clicked
                      className="w-full py-3 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none transition"
                    >
                      Connect
                    </button>
                    <button
                      onClick={toggleModal} // Close the modal when clicked
                      className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
                    >
                      X
                    </button>
                  </div>
                </div>
              )}

              {/* Rest of the content (children) */}
              {children}
            </div>
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
