const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CrossBorderPayment = await hre.ethers.getContractFactory("CrossBorderPayment");
  const crossBorderPayment = await CrossBorderPayment.deploy(process.env.INITIAL_EXCHANGE_RATE);

  await crossBorderPayment.deployed();

  console.log("CrossBorderPayment deployed to:", crossBorderPayment.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
