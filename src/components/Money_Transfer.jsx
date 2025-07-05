// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';

// // Replace this with your actual contract ABI and address
// const contractABI = [
// 	{
// 		"inputs": [],
// 		"name": "deposit",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "sender",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Deposit",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address payable",
// 				"name": "recipient",
// 				"type": "address"
// 			}
// 		],
// 		"name": "withdraw",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "recipient",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Withdrawal",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getBalance",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ];
// const contractAddress = '0x9bf2cf6d0db469fa0575a309d3a1ba561dd74280';  // Replace with your deployed contract address

// const MoneyTransfer = () => {
//     const [account, setAccount] = useState(null);
//     const [amount, setAmount] = useState('');
//     const [recipient, setRecipient] = useState('');
//     const [balance, setBalance] = useState(0);
    
//     // Connect to MetaMask
//     const connectMetaMask = async () => {
//         if (window.ethereum) {
//             try {
//                 await window.ethereum.request({ method: 'eth_requestAccounts' });
//                 const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider
//                 const signer = await provider.getSigner();
//                 const userAddress = await signer.getAddress();
//                 setAccount(userAddress);
//             } catch (error) {
//                 console.error("Error connecting to MetaMask:", error);
//             }
//         } else {
//             alert('MetaMask is not installed.');
//         }
//     };

//     // Deposit Ether into the contract
//     const deposit = async () => {
//         if (account && amount && window.ethereum) {
//             try {
//                 const provider = new ethers.BrowserProvider(window.ethereum);
//                 const signer = await provider.getSigner();
//                 const contract = new ethers.Contract(contractAddress, contractABI, signer);

//                 const tx = await contract.deposit({
//                     value: ethers.parseEther(amount) // Use ethers.parseEther instead
//                 });
//                 console.log("Deposit transaction sent:", tx);
//                 await tx.wait();  // Wait for transaction to be mined

//                 fetchBalance();  // Fetch updated contract balance after deposit
//             } catch (error) {
//                 console.error("Error making deposit:", error);
//             }
//         }
//     };

//     // Withdraw Ether to a specified recipient
//     const withdraw = async () => {
//         if (account && recipient && amount && window.ethereum) {
//             try {
//                 const provider = new ethers.BrowserProvider(window.ethereum);
//                 const signer = await provider.getSigner();
//                 const contract = new ethers.Contract(contractAddress, contractABI, signer);

//                 const tx = await contract.withdraw(ethers.parseEther(amount), recipient);
//                 console.log("Withdrawal transaction sent:", tx);
//                 await tx.wait();  // Wait for transaction to be mined

//                 fetchBalance();  // Fetch updated contract balance after withdrawal
//             } catch (error) {
//                 console.error("Error withdrawing funds:", error);
//             }
//         }
//     };

//     // Fetch the contract balance
//     const fetchBalance = async () => {
//         if (window.ethereum) {
//             try {
//                 const provider = new ethers.BrowserProvider(window.ethereum);
//                 const contract = new ethers.Contract(contractAddress, contractABI, provider);
//                 const balance = await contract.getBalance();
//                 setBalance(ethers.formatEther(balance));  // Convert from Wei to Ether
//             } catch (error) {
//                 console.error("Error fetching balance:", error);
//             }
//         }
//     };

//     useEffect(() => {
//         if (account) {
//             fetchBalance(); // Fetch balance whenever the account changes
//         }
//     }, [account]);

//     return (
//         <div>
//             {!account ? (
//                 <button onClick={connectMetaMask}>Connect to MetaMask</button>
//             ) : (
//                 <div>
//                     <p>Connected Account: {account}</p>
//                     <p>Contract Balance: {balance} ETH</p>

//                     <input 
//                         type="text" 
//                         placeholder="Amount to Deposit (ETH)" 
//                         value={amount} 
//                         onChange={(e) => setAmount(e.target.value)} 
//                     />
//                     <button onClick={deposit}>Deposit</button>

//                     <input 
//                         type="text" 
//                         placeholder="Recipient Address" 
//                         value={recipient} 
//                         onChange={(e) => setRecipient(e.target.value)} 
//                     />
//                     <input 
//                         type="text" 
//                         placeholder="Amount to Withdraw (ETH)" 
//                         value={amount} 
//                         onChange={(e) => setAmount(e.target.value)} 
//                     />
//                     <button onClick={withdraw}>Withdraw</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MoneyTransfer;
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Replace this with your actual contract ABI and address
const contractABI = [
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
const contractAddress = '0x9bf2cf6d0db469fa0575a309d3a1ba561dd74280';  // Replace with your deployed contract address

const useMoneyTransfer = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(0);
    
    // Connect to MetaMask
    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress();
                setAccount(userAddress);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert('MetaMask is not installed.');
        }
    };

    // Deposit Ether into the contract
    const deposit = async (amount) => {
        if (account && amount && window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                const tx = await contract.deposit({
                    value: ethers.parseEther(amount)
                });
                console.log("Deposit transaction sent:", tx);
                await tx.wait();  // Wait for transaction to be mined

                fetchBalance();  // Fetch updated contract balance after deposit
            } catch (error) {
                console.error("Error making deposit:", error);
            }
        }
    };

    // Withdraw Ether to a specified recipient
    const withdraw = async (amount, recipient) => {
        if (account && recipient && amount && window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                const tx = await contract.withdraw(ethers.parseEther(amount), recipient);
                console.log("Withdrawal transaction sent:", tx);
                await tx.wait();  // Wait for transaction to be mined

                fetchBalance();  // Fetch updated contract balance after withdrawal
            } catch (error) {
                console.error("Error withdrawing funds:", error);
            }
        }
    };

    // Fetch the contract balance
    const fetchBalance = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, contractABI, provider);
                const balance = await contract.getBalance();
                setBalance(ethers.formatEther(balance));  // Convert from Wei to Ether
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        }
    };

    useEffect(() => {
        if (account) {
            fetchBalance(); // Fetch balance whenever the account changes
        }
    }, [account]);

    return {
        account,
        balance,
        connectMetaMask,
        deposit,
        withdraw,
        fetchBalance
    };
};

export default useMoneyTransfer;
