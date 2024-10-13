'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import NewOverlay from './overlay';

const FindPromotion = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  // Function to toggle overlay visibility
  const showOverlay = (): void => setIsOverlayVisible(true);
  const closeOverlay = (): void => setIsOverlayVisible(false);

  return (
    <main className="bg-black min-h-screen">
      {/* Header */}
      <Header />

      {/* Promotion Cards */}
      <section className="md:p-6 p-2">
        {/* First Card */}
        <div className="bg-[#262626] rounded-lg p-4 mb-4 shadow-lg md:flex-row flex-col flex items-start">
          {/* Column 1: Picture + Content Container */}
          <div className="md:flex items-start w-full">
            {/* Icon Image */}
            <div className="flex justify-start mr-4">
              <Image
                src=""
                alt="niche-icon"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>

            {/* Content */}
            <div className="w-full">
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-400">NICHE</p>
                <h3 className="text-lg font-bold text-white">ENTERTAINMENT | MUSIC</h3>
              </div>
              <p className="text-sm text-gray-300">
                I am looking for influencers to get me a minimum of 100 interactions on their posts.
                Tags #music, #money, #funds
              </p>

              {/* Promotion Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="border border-gray-600 p-2 overflow-hidden">
                  <p className="text-sm font-semibold text-gray-400">PRICE POOL</p>
                  <p className="md:text-lg font-bold text-[#F49B0D]">50 USDC</p>
                </div>
                <div className="border border-gray-600 p-2 overflow-hidden">
                  <p className="text-sm font-semibold text-gray-400">NO. OF INFLUENCERS</p>
                  <p className="md:text-lg text-sm font-bold text-[#F49B0D]">4</p>
                </div>
                <div className="border border-gray-600 p-2 overflow-hidden">
                  <p className="text-sm font-semibold text-gray-400">DURATION</p>
                  <p className="md:text-lg text-sm font-bold text-[#F49B0D]">4 days</p>
                </div>
                <div className="border border-gray-600 p-2 overflow-hidden">
                  <p className="text-sm font-semibold text-gray-400">COUNTRY</p>
                  <p className="md:text-lg text-sm font-bold text-[#F49B0D]">NIGERIA</p>
                </div>
              </div>

              <p className="text-sm mt-4 text-gray-300">
                PROMOTION LINK:
                <Link href="/" className="text-[#F49B0D] ml-2">
                  http://ig.casme.jdjr...
                </Link>
              </p>
            </div>
          </div>

          {/* Column 2: Enter Contest Button */}
          <div className="md:w-1/6 flex mt-2 md:mt-0 md:justify-end">
            <button
              onClick={showOverlay} // Show overlay when clicked
              className="md:px-4 px-7 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-400 transition"
            >
              Enter contest
            </button>
          </div>
        </div>
      </section>

      {/* Overlay Component */}
      {isOverlayVisible && <NewOverlay closePopup={closeOverlay} />}
    </main>
  );
};

export default FindPromotion;
