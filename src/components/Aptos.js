const { Provider, Network } = require("aptos");
const { useWallet } = require("@aptos-labs/wallet-adapter-react");
// Aptos provider setup (for interacting with Testnet)
const provider = new Provider(Network.TESTNET);
// Change this to be your module account address
const moduleAddress = "0x2e8fd46f04bef4c2a60f37805a55ee1f94b81d5a470d91e45a0f9a38115bc631";
// Deposit function
const deposit = async (account, signAndSubmitTransaction, amount) => {
  if (!account) return;
  const payload = {
    type: "entry_function_payload",
    function: `${moduleAddress}::MyCoin::deposit`, // Replace with your actual module name
    type_arguments: [],
    arguments: [amount.toString()],
  };
  try {
    const response = await signAndSubmitTransaction(payload);
    await provider.waitForTransaction(response.hash);
    alert("Deposit successful!");
  } catch (error) {
    console.error("Error during deposit:", error);
  }
};

// Withdraw function
const withdraw = async (account, signAndSubmitTransaction, amount, recipientAddress) => {
  if (!account) return;
  const payload = {
    type: "entry_function_payload",
    function: `${moduleAddress}::MyCoin::withdraw`, // Replace with your actual module name
    type_arguments: [],
    arguments: [amount.toString(), recipientAddress],
  };
  try {
    const response = await signAndSubmitTransaction(payload);
    await provider.waitForTransaction(response.hash);
    alert("Withdrawal successful!");
  } catch (error) {
    console.error("Error during withdrawal:", error);
  }
};

// Get balance function
const getBalance = async (account) => {
  if (!account) return 0;
  try {
    const resource = await provider.getAccountResource(
      account.address,
      `${moduleAddress}::MyCoin::ContractBalance` // Replace with your actual module name
    );
    return resource?.data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 0;
  }
};

// Export the functions
module.exports = {
  deposit,
  withdraw,
  getBalance,
}