import { network } from "hardhat";
const { ethers } = await network.connect();
import transferToken from "./transferToken.js"

async function main() {
    const initial = 1_000_000n * 10n ** 18n; // 1,000,000 MTK with 18 decimals
    const Token = await ethers.getContractFactory("IndianToken");
    const token = await Token.deploy(initial);
    await token.waitForDeployment();


    //should store this address
    console.log("IndianToken deployed to:", await token.getAddress());

    // the last address to which deployed
    // 0xAd875ABC59180FD557E24f7f365f798dB6363735
    transferToken(await token.getAddress());
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});



