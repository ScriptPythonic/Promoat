import { useState, useEffect } from 'react';
import countries from '../country.json';

const Overlay = ({ closePopup }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [animationClass, setAnimationClass] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
 

 ; 

  return (
    <div
      className="fixed inset-0 backdrop-blur-xl bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closePopup} // Close popup when clicked outside
    >
      <div
            className="bg-black p-4 rounded-lg shadow-xl w-full sm:w-80 md:w-96 lg:w-1/3 max-w-md transform transition-all duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'popupAnim 0.5s ease-out' }}
          >
        <div className="relative">
          {/* Close Button */}
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
                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                >
                  <option value="" className="bg-[#2D2D2D]">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Note */}
            <p className="mt-4 text-white text-sm">
              You will pay <span className="font-bold text-[#F49B0D]">50 USDC</span> to{' '}
              <span className="font-bold">4 influencers</span>.
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
  );
};

export default Overlay;
