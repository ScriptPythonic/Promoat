import React, { useState } from 'react';

function Home() {
  // State to handle the visibility of the popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
      <header className="flex justify-between items-center p-4 sm:p-6 md:p-8">
        {/* Company Name */}
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
          PROMO<span style={{ color: '#F49B0D' }}>A</span>T
        </div>

        {/* Sign In Button */}
        <button className="web3-btn px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-lg hover:bg-white hover:text-[#F49B0D] transition">
          Sign In
        </button>
      </header>

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
          <button className="web3-btn px-5 py-3 sm:px-6 sm:py-4 rounded-lg text-lg sm:text-xl font-bold w-full sm:w-auto">
            Find Promotion
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div
          className="fixed inset-0 backdrop-blur-xl bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup}
        >
          <div
            className="bg-black p-4 rounded-lg shadow-xl w-full sm:w-80 md:w-96 lg:w-1/3 max-w-md transform transition-all duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'popupAnim 0.5s ease-out' }}
          >
            <div className="relative">
              {/* Cancel Button at the top */}
              <button
                type="button"
                onClick={closePopup}
                className="absolute top-0 right-0 text-xl text-white font-sm"
              >
                ×
              </button>

              <h2 className="text-lg font-semibold text-white">NEW PROMOTION</h2>
              <form className="mt-4">
                {/* Price Pool and Duration (Flexed in a row) */}
                <div className="flex gap-2">
                  {/* Price Pool */}
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-700">Price Pool</label>
                    <input
                      type="number"
                      placeholder="Price Pool"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                    />
                  </div>

                  {/* Duration */}
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-700">Duration (Days)</label>
                    <input
                      type="number"
                      placeholder="Duration"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                    />
                  </div>
                </div>

                {/* Promotion Link */}
                <div className="mt-3">
                  <label className="block text-sm text-gray-700">Enter Promotion Link</label>
                  <input
                    type="url"
                    placeholder="Promotion Link"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                  />
                </div>

                {/* Additional Description */}
                <div className="mt-3">
                  <label className="block text-sm text-gray-700">Additional Description</label>
                  <textarea
                    placeholder="Add any additional notes"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                  />
                </div>

                {/* Industry Niche */}
                <div className="mt-3">
                  <label className="block text-sm text-gray-700">Industry Niche</label>
                  <input
                    type="text"
                    placeholder="Industry Niche"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                  />
                </div>

                {/* Number of Influencers and Region (Flexed in a row) */}
                <div className="sm:flex gap-2 mt-3">
                  {/* Number of Influencers */}
                  <div className="sm:w-1/2">
                    <label className="block text-sm text-gray-700">No. of Influencers</label>
                    <input
                      type="number"
                      placeholder="Number"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                    />
                  </div>

                  {/* Region */}
                  <div className="sm:w-1/2">
                    <label className="block text-sm text-gray-700">Region</label>
                    <input
                      type="text"
                      placeholder="Region"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                    />
                  </div>
                </div>

                {/* Payment Note */}
                <p className="mt-4 text-white text-sm">
                  You will pay <span className="font-bold text-[#F49B0D]">50 USDC</span> to <span className="font-bold">4 influencers</span>.
                </p>

                {/* Publish Promotion Button */}
                <div className="mt-4 flex justify-center items-center">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#F49B0D] text-white hover:bg-[#d87c06] transition text-sm"
                  >
                    Publish Promotion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
