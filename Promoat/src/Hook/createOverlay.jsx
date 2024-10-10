import { useState } from 'react';
import { ethers } from 'ethers';
import countries from '../country.json';

// Import functions from contract.js
import { createPromotion } from './contract'; 

const Overlay = ({ closePopup }) => {
  // Define the states for all form inputs
  const [selectedCountry, setSelectedCountry] = useState('');
  const [pricePool, setPricePool] = useState('');
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [influencers, setInfluencers] = useState('');
  const [totalAmount, setTotalAmount] = useState(0); // Total payment amount

  // Update the total amount dynamically when pricePool or influencers change
  const handleTotalAmountChange = (price, influencersCount) => {
    if (price && influencersCount) {
      const total = price * influencersCount;
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  };

  // Handle price pool change and update total
  const handlePricePoolChange = (event) => {
    const price = event.target.value;
    setPricePool(price);
    handleTotalAmountChange(price, influencers);
  };

  // Handle influencers change and update total
  const handleInfluencersChange = (event) => {
    const influencersCount = event.target.value;
    setInfluencers(influencersCount);
    handleTotalAmountChange(pricePool, influencersCount);
  };

  // Function to handle the country selection
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Function to handle form submission
  const handlePublishPromotion = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      // Connect to MetaMask using Ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []); // Request MetaMask accounts

      const signer = provider.getSigner(); // Get the signer (current user)
      const amountInWei = ethers.utils.parseUnits(pricePool, 18); // Convert price pool to wei
      const durationInSeconds = duration * 86400; // Convert duration to seconds

      // Call the contract's createPromotion function
      const tx = await createPromotion(signer, {
        amount: amountInWei,
        duration: durationInSeconds,
        link,
        description,
        influencers: parseInt(influencers),
        region: selectedCountry,
      });

      alert('Promotion created successfully!');
    } catch (error) {
      console.error('Error creating promotion:', error);
      alert('Failed to create promotion.');
    }
  };

  // Rendering the form and inputs
  return (
    <div
      className="fixed inset-0 backdrop-blur-xl bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closePopup} 
    >
      <div
        className="bg-black p-4 rounded-lg shadow-xl w-full sm:w-80 md:w-96 lg:w-1/3 max-w-md transform transition-all duration-500 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            type="button"
            onClick={closePopup}
            className="absolute top-0 right-0 text-xl text-white font-sm"
          >
            ×
          </button>

          <h2 className="text-lg font-semibold text-white">NEW PROMOTION</h2>
          <form className="mt-4" onSubmit={handlePublishPromotion}>
            {/* Price Pool and Duration */}
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm text-gray-700">Price Pool</label>
                <input
                  type="number"
                  placeholder="Price Pool"
                  value={pricePool}
                  onChange={handlePricePoolChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm text-gray-700">Duration (Days)</label>
                <input
                  type="number"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
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
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
              />
            </div>

            {/* Additional Description */}
            <div className="mt-3">
              <label className="block text-sm text-gray-700">Additional Description</label>
              <textarea
                placeholder="Add any additional notes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
              />
            </div>

            {/* Industry Niche */}
            <div className="mt-3">
              <label className="block text-sm text-gray-700">Industry Niche</label>
              <input
                type="text"
                placeholder="Industry Niche"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
              />
            </div>

            {/* Influencers and Region */}
            <div className="sm:flex gap-2 mt-3">
              <div className="sm:w-1/2">
                <label className="block text-sm text-gray-700">No. of Influencers</label>
                <input
                  type="number"
                  placeholder="Number"
                  value={influencers}
                  onChange={handleInfluencersChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
                />
              </div>

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
              You will pay <span className="font-bold text-[#F49B0D]">{totalAmount} USDC</span> to{' '}
              <span className="font-bold">{influencers} influencers</span>.
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
