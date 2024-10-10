import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const BASE_PRIVATE_KEY = vars.get("LISK_PRIVATE_KEY");

export default {
  solidity: "0.8.27",
  networks: {
    // for testnet
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: [BASE_PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "base-sepolia": "123",
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
};
