import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface NewOverlayProps {
  closePopup: () => void;
  isConnected: boolean;
  walletAddress: string | null; // Add wallet address prop
}

const NewOverlay: React.FC<NewOverlayProps> = ({ closePopup, isConnected, walletAddress }) => {
  const [address, setAddress] = useState<string>('');
  const [promotionLink, setPromotionLink] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Automatically set wallet address if the user is connected
  useEffect(() => {
    if (isConnected && walletAddress) {
      setAddress(walletAddress);
    } else {
      setAddress(''); // Clear address if not connected
    }
  }, [isConnected, walletAddress]);

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!isConnected) {
      setAddress(event.target.value); // Allow input only if not connected
    }
  };

  const handlePromotionLinkChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPromotionLink(event.target.value);
  };

  const handleAdditionalNotesChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setAdditionalNotes(event.target.value);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      address,
      promotionLink,
      additionalNotes,
    });
  };

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

          <h2 className="text-lg font-semibold text-white">ENTER CONTEST</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            {/* Address */}
            <div className="mt-3">
              <label className="block text-sm text-gray-700">Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={handleAddressChange}
                disabled={isConnected} // Disable input if connected
                className={`w-full p-2 mt-1 border ${isConnected ? 'bg-gray-800' : 'bg-gray-600'} border-gray-300 rounded-sm text-sm text-white`}
              />
              {isConnected && <p className="text-xs text-gray-500 mt-1">Wallet address is auto-filled because your wallet is connected.</p>}
            </div>

            {/* Promotion Link */}
            <div className="mt-3">
              <label className="block text-sm text-gray-700">Enter Promoted Link</label>
              <input
                type="url"
                placeholder="Enter Promotion Link"
                value={promotionLink}
                onChange={handlePromotionLinkChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
              />
            </div>

            {/* Additional Notes */}
            <div className="mt-3">
              <label className="block text-sm text-gray-700">Additional Notes</label>
              <textarea
                placeholder="Add any additional notes"
                value={additionalNotes}
                onChange={handleAdditionalNotesChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-sm text-sm bg-gray-600"
              />
            </div>

            {/* Payment Info */}
            <p className="mt-4 text-white text-sm">
              You will receive <span className="font-bold text-[#F49B0D]">50 USDC</span> when the task is completed.
            </p>

            <hr className='bg-white mt-4' />

            {/* Buttons */}
            <div className="mt-4 flex justify-between items-center">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#F49B0D] text-white hover:bg-[#d87c06] transition text-sm"
              >
                Submit Now
              </button>
              <button
                type="button"
                onClick={closePopup}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition text-sm"
              >
                Submit Later
              </button>
            </div>
          </form>

          {/* Additional Text */}
          <p className="mt-4 text-white text-sm">
            Contest owner will be aware of your entry, however, you should submit your entry in less than 4 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewOverlay;
