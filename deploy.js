const { ethers } = require("hardhat");

async function main() {
    try {
        // Get the deployer account
        const [deployer] = await ethers.getSigners();
        console.log("Deploying contracts with account:", deployer.address);

        // Convert initial supply (1 million tokens with 18 decimals)
        const initialSupply = ethers.parseUnits("1000000", 18);

        // Deploy contract
        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy(initialSupply);
        
        // Wait for deployment confirmation
        await token.waitForDeployment();
        const tokenAddress = await token.getAddress();
        
        console.log("\nDeployment successful!");
        console.log("Token address:", tokenAddress);
        console.log("Total supply:", (await token.totalSupply()).toString());

        // Verify contract
        console.log("\nVerifying contract...");
        await hre.run("verify:verify", {
            address: tokenAddress,
            constructorArguments: [initialSupply],
            network: "myQuickNode"
        });
        console.log("✅ Contract verified successfully!");
    } catch (error) {
        console.error("\n❌ Deployment failed:", error.message);
        process.exit(1);
    }
}

main();