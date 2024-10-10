import { useState, useEffect } from 'react';

function useMetaMask() {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  // Check if MetaMask is installed
  const checkMetaMaskInstallation = () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed.');
      return false;
    }
    return true;
  };

  // Connect to MetaMask and get the user's account
  const connectMetaMask = async () => {
    if (!checkMetaMaskInstallation()) return;

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]); // Set the first account as the connected account
      setIsConnected(true);
    } catch (error) {
      console.error('MetaMask connection error:', error);
      setError('Failed to connect MetaMask.');
    }
  };

  // Disconnect from MetaMask and reset the account state
  const disconnectMetaMask = () => {
    setAccount(null);
    setIsConnected(false);
  };

  // Automatically check if MetaMask is connected when the component mounts
  useEffect(() => {
    if (checkMetaMaskInstallation()) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      }).catch((err) => {
        console.error('Error fetching accounts:', err);
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setIsConnected(false);
        } else {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      });
    }
  }, []);

  return { account, isConnected, error, connectMetaMask, disconnectMetaMask };
}

export default useMetaMask;
