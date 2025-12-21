import { network } from "hardhat";
const { ethers } = await network.connect();

async function main() {
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const nftmarketplace = await NFTMarketplace.deploy();

  await nftmarketplace.waitForDeployment();

  console.log("Library deployed to:", await nftmarketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// Library deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
// 0xa1D73dEDfB9Ad68D3B6Ffdf225c8c60Fb208C539