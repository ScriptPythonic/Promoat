import { ethers } from "ethers"

export const contractABI =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_usdcAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			}
		],
		"name": "AddressEmptyCode",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressInsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "AlreadyInContest",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "FailedInnerCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InsufficientInfluencers",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidDuration",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MaxInfluencersReached",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NoParticipants",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PromotionNotFound",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PromotionOngoing",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "RewardNotDisbursed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "RewardsClaimed",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TaskAlreadyCompleted",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Unauthorized",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ZeroAmount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "promotionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "contester",
				"type": "address"
			}
		],
		"name": "ContestEntered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "PromotionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "promotionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "PromotionDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "promotionId",
				"type": "uint256"
			}
		],
		"name": "RewardDisbursed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "promotionId",
				"type": "uint256"
			}
		],
		"name": "TaskCompleted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allPromotions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "link",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "numberOfInfluencers",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "rewardClaimed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "taskCompleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_promotionId",
				"type": "uint256"
			}
		],
		"name": "completeTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contestCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "link",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "numberOfInfluencers",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "promotionId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "contester",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "promotionLink",
						"type": "string"
					}
				],
				"internalType": "struct Promoat.Contest[]",
				"name": "contests",
				"type": "tuple[]"
			}
		],
		"name": "createPromotion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_promotionId",
				"type": "uint256"
			}
		],
		"name": "deletePromotion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_promotionId",
				"type": "uint256"
			}
		],
		"name": "disburseReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "promotionId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			}
		],
		"name": "enterContest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPromotions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "link",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "numberOfInfluencers",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "promotionId",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "contester",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "notes",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "promotionLink",
								"type": "string"
							}
						],
						"internalType": "struct Promoat.Contest[]",
						"name": "contest",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "rewardClaimed",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "taskCompleted",
						"type": "bool"
					}
				],
				"internalType": "struct Promoat.Promotion[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "promotionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "promotions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "link",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "numberOfInfluencers",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "rewardClaimed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "taskCompleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdcAddress",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const contractAddress = '0xYourContractAddress';

// Function to get a contract instance
export const getContractInstance = async (signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};

// Function to create a promotion
export const createPromotion = async (signer, { amount, duration, link, description, influencers, region }) => {
  const contract = await getContractInstance(signer);
  const tx = await contract.createPromotion(amount, duration, link, description, influencers, region);
  await tx.wait(); // Wait for the transaction to be mined
  return tx; // Return the transaction data
};
