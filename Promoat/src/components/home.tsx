'use client';
import React, { useState } from 'react'; 
import Link from 'next/link'; 
import Overlay from './createOverlay'; 
import Header from './header';
import { useAccount } from 'wagmi';  // Assuming wagmi for wallet connection

const Homes: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { isConnected } = useAccount();  // Get the connection status

  // Function to open the popup
  const openPopup = () => {
    setIsPopupVisible(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <main className="bg-home bg-black h-screen">
      {/* Header */}
      <Header account={null} isConnected={false} />

      {/* Main Content */}
      <div className="text-center text-white px-4 sm:px-8 md:px-12 mt-16 sm:mt-20 md:mt-24">
        {/* Bold Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Promote your event, page and do
          <span className="block mt-4 lg:mt-0 lg:inline-block">
            more with top influencers onchain
          </span>
        </h1>

        {/* Semi-bold Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-4 sm:mt-6 md:mt-8">
          Get access to influencers around the world
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          {/* Create Promotion Button */}
          <button
            className="web3-btn px-5 py-3 sm:px-6 sm:py-4 rounded-lg text-lg sm:text-xl font-bold w-full sm:w-auto"
            onClick={openPopup}
          >
            Create Promotion
          </button>

          {/* Find Promotion Button */}
          <Link href="/promotions">
            <button className="web3-btn px-5 py-3 sm:px-6 sm:py-4 rounded-lg text-lg sm:text-xl font-bold w-full sm:w-auto">
              Find Promotion
            </button>
          </Link>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupVisible && <Overlay closePopup={closePopup} isSignedIn={isConnected} />}
    </main>
  );
};

export default Homes;
