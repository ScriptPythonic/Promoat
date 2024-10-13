'use client'; // Required for components with interactivity

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import WalletWrapper from './walletWrapper';

interface HeaderProps {
  account: string | null;
  isConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ account, isConnected }) => {
  return (
    <header className="flex justify-between items-center p-4 sm:p-6">
      {/* Company Logo with Link to Homepage */}
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
        <Link href="/">
          PROMO<span style={{ color: '#F49B0D' }}>A</span>T
        </Link>
      </div>

      {/* Wallet Address and Log Out / Sign In */}
      <div className="flex gap-0 flex-row items-center">
        {isConnected ? (
          <div className="flex items-center md:space-x-4 bg-gray-800 rounded-2xl pr-1 py-1">
            {/* Wallet Address */}
            <div className="md:px-4 px-5 py-2 text-white text-sm font-medium">
              {account?.substring(0, 6)}...{account?.substring(account?.length - 4)}
            </div>

            {/* Log Out Button */}
            <button
              onClick={() => console.log('Log out clicked')} // Replace with real disconnect logic
              className="px-4 py-2 rounded-3xl bg-[#F49B0D] text-white hover:bg-[#d87c06] transition hidden md:block"
            >
              Log Out
            </button>
          </div>
        ) : (
          <WalletWrapper
              className="min-w-[90px]  bg-gray-900 hover:gray-300"
              text="Log in"
              withWalletAggregator={true}
            />
        )}

        {/* User Avatar */}
        <div className="ml-4">
          <Image
            src='' // Placeholder image
            alt="User Avatar"
            width={56}
            height={56}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
