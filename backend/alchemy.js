require('dotenv').config(); // To load .env variables
const { ethers } = require('ethers');
// Connect to the Ethereum network through Alchemy
// const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
apiKey =  "Dw1raQYKm52z67w0KVO5XxbMtyIsCJ3e"
network =  "sepolia"
const provider = new ethers.providers.AlchemyProvider(network, apiKey);
// Wallet and signer to send transactions
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Your contract ABI and address
const contractABI = 
  // Copy your contract ABI here
  [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0x9bf2cf6d0db469fa0575a309d3a1ba561dd74280';

// Create a contract instance
const moneyTransferContract = new ethers.Contract(contractAddress, contractABI, wallet);

// Example: Call the deposit function
async function deposit() {
  const tx = await moneyTransferContract.deposit({
    value: ethers.utils.parseEther('0.01'), // Amount to deposit
  });
  console.log('Transaction sent: ', tx.hash);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log('Transaction mined: ', receipt);
}

async function withdraw(amount, recipient) {
    const tx = await moneyTransferContract.withdraw(ethers.utils.parseEther(amount), recipient);
    console.log('Withdraw transaction sent: ', tx.hash);
  
    const receipt = await tx.wait();
    console.log('Withdraw transaction mined: ', receipt);
  }
  
  // Example: Get balance of the contract
  async function getBalance() {
    const balance = await moneyTransferContract.getBalance();
    console.log('Contract balance:', ethers.utils.formatEther(balance));
  }
  
  module.exports = { deposit, withdraw, getBalance };