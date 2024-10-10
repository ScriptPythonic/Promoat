import { Link } from 'react-router-dom';
import useMetaMask from '../Contract/connect'; 

function Header() {
  const { account, isConnected, connectMetaMask, disconnectMetaMask } = useMetaMask();

  return (
    <header className="flex justify-between items-center p-4 sm:p-6">
      {/* Company Logo with Link to Homepage */}
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
        <Link to="/">
          PROMO<span style={{ color: '#F49B0D' }}>A</span>T
        </Link>
      </div>

      {/* Wallet Address and Logout */}
      <div className="flex gap-0 flex-row items-center">
        {isConnected ? (
          <div className="flex items-center md:space-x-4 bg-gray-800 rounded-2xl pr-1 py-1">
            {/* Wallet Address */}
            <div className="md:px-4 px-5 py-2 text-white text-sm font-medium">
              {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </div>

            {/* Log Out Button */}
            <button
              onClick={disconnectMetaMask} // Call the disconnect function to log out
              className="px-4 py-2 rounded-3xl bg-[#F49B0D] text-white hover:bg-[#d87c06] transition hidden md:block"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={connectMetaMask} // Trigger MetaMask connection
            className="px-4 py-2 rounded-3xl bg-[#F49B0D] text-white hover:bg-[#d87c06] transition"
          >
            Sign In
          </button>
        )}

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
  );
}

export default Header;
