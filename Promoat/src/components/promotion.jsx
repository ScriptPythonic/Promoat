import { useState } from 'react';
import { Link } from 'react-router-dom';
import Overlay from '../Hook/contest';

function FindPromotion() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Function to toggle overlay visibility
  const showOverlay = () => setIsOverlayVisible(true);
  const closeOverlay = () => setIsOverlayVisible(false);

  return (
    <main className="bg-black min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        {/* Company Logo with Link to Homepage */}
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
          <Link to="/">
            PROMO<span style={{ color: '#F49B0D' }}>A</span>T
          </Link>
        </div>

        {/* Wallet Address and Logout */}
        <div className="flex gap-0 flex-row items-center">
          <div className="flex items-center md:space-x-4 bg-gray-800 rounded-2xl pr-1 py-1">
            {/* Wallet Address */}
            <div className="md:px-4 px-5 py-2 text-white text-sm font-medium">
              EQj..x5
            </div>

            {/* Log Out Button */}
            <button className="px-4 py-2 rounded-3xl bg-[#F49B0D] text-white hover:bg-[#d87c06] transition hidden md:block">
              Log Out
            </button>
          </div>

          {/* User Avatar */}
          <div className="ml-4">
            <img
              src="https://img.icons8.com/color/60/lion.png"
              alt="User Avatar"
              className="w-14 h-14 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Promotion Cards */}
      <section className="md:p-6 p-2">
        {/* First Card */}
        <div className="bg-[#262626] rounded-lg p-4 mb-4 shadow-lg md:flex-row flex-col flex items-start">
          {/* Column 1: Picture + Content Container */}
          <div className="md:flex items-start w-full">
            {/* Icon Image */}
            <div className="flex justify-start mr-4">
              <img
                src="https://img.icons8.com/color/60/lion.png"
                alt="niche-icon"
                className="rounded-full w-15 h-15"
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
                <a href="#" className="text-[#F49B0D] ml-2">http://ig.casme.jdjr...</a>
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
      {isOverlayVisible && <Overlay closePopup={closeOverlay} />}
    </main>
  );
}

export default FindPromotion;
