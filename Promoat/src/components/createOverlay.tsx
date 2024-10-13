'use client';

import { useState, useCallback } from 'react';
import { Transaction, TransactionButton, TransactionStatus, TransactionStatusLabel, TransactionStatusAction } from '@coinbase/onchainkit/transaction';
import type { TransactionError, TransactionResponse } from '@coinbase/onchainkit/transaction';
import { useAccount } from 'wagmi';
import { BASE_SEPOLIA_CHAIN_ID, mintContractAddress, ABI } from '@/constant'; // Update paths if necessary
import countries from './country.json';

interface OverlayProps {
  closePopup: () => void;
  isSignedIn: boolean; // Prop to check if the user is signed in
}

const Overlay: React.FC<OverlayProps> = ({ closePopup, isSignedIn }) => {
  const { address } = useAccount();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [pricePool, setPricePool] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [influencers, setInfluencers] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [transactionSuccessful, setTransactionSuccessful] = useState<boolean>(false);

  console.log(address)

  // Handle total amount calculation based on price pool and number of influencers
  const handleTotalAmountChange = (price: string, influencersCount: string) => {
    const priceNumber = parseFloat(price);
    const influencersNumber = parseInt(influencersCount, 10);
    if (priceNumber && influencersNumber) {
      const total = priceNumber * influencersNumber;
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  };

  const handlePricePoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value;
    setPricePool(price);
    handleTotalAmountChange(price, influencers);
  };

  const handleInfluencersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const influencersCount = event.target.value;
    setInfluencers(influencersCount);
    handleTotalAmountChange(pricePool, influencersCount);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handlePublishPromotion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the user is signed in
    if (!isSignedIn) {
      alert('Please sign in to publish a promotion.');
      return;
    }

    // Handle the publishing logic with transaction once the user confirms
    alert('Promotion created successfully!');
  };

  const handleTransactionError = (err: TransactionError) => {
    console.error('Transaction error:', err);
    setTransactionSuccessful(false);  // Set to false if transaction fails
  };

  const handleTransactionSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful:', response);
    alert('Transaction was successful!');
    setTransactionSuccessful(true);  // Set to true if transaction succeeds
  };

  const handleClosePopup = useCallback(() => {
    if (transactionSuccessful) {
      // Only clear the form if the transaction is successful
      closePopup();
    } else {
      // If transaction is not successful, retain the state
      closePopup();
    }
  }, [transactionSuccessful, closePopup]);

  // Transaction parameters
  const contracts = [
    {
      address: mintContractAddress,
      abi: ABI,
      functionName: 'publishPromotion',
      args: [address],
    },
  ];

  return (
    <div
      className="fixed inset-0 backdrop-blur-xl bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClosePopup}
    >
      <div
        className="bg-black p-4 rounded-lg shadow-xl w-full sm:w-80 md:w-96 lg:w-1/3 max-w-md transform transition-all duration-500 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            type="button"
            onClick={handleClosePopup}
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
                  <option value="">Select Country</option>
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
              <Transaction
                contracts={contracts}
                chainId={BASE_SEPOLIA_CHAIN_ID}
                onError={handleTransactionError}
                onSuccess={handleTransactionSuccess}
              >
                <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
                <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
                </TransactionStatus>
              </Transaction>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
