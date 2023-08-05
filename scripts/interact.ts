import { ethers } from "hardhat";
require('dotenv').config();

async function main() {
  const [deployer] = await ethers.getSigners();

  const contractAddress = "CONTRACT_ADDRESS"; // Replace with the deployed contract address
  const contract = await ethers.getContractAt("CrossBorderPayment", contractAddress);

  // Interact with the contract here, for example:
  const recipientAddress = "RECIPIENT_ADDRESS"; // Replace with the recipient's address
  const amountUSD = 100; // Replace with the desired payment amount in USD

  const exchangeRate = parseFloat(process.env.INITIAL_EXCHANGE_RATE || '0');
  const amountETH = amountUSD * exchangeRate;

  const tx = await contract.sendPayment(recipientAddress, amountUSD, { value: ethers.utils.parseEther(amountETH.toString()) });
  await tx.wait();

  console.log(`${amountUSD} USD payment sent to ${recipientAddress}`);
  console.log("Check your transaction on BBN Testnet:", `http://testnet.bharatblockchain.io/address/${contractAddress}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
