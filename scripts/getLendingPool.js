const { ethers, network } = require("hardhat")
const {
    aaveILendingPoolAddressesProvider,
    networkConfig,
    contractInterfaces,
    ETHER_AMOUNT,
} = require("../helper-hardhat-config")

/**
 * @dev Method gets a lending pool contract from lendingpoolAddressesProvider contract of Aave v2.0
 * For more on this, refer to dev docs@ https://docs.aave.com/developers/v/2.0/the-core-protocol/lendingpool/ilendingpool
 * @param {address} signer Deployer of transaction
 * @returns lending pool contract that is connected to signer
 */
const GetLendingPool = async (signer) => {
    console.log("Entered GetLendingPool method to fetch lending pool contract on Aave")

    try {
        // get the lendingPoolAddressProvider contract
        console.log("Getting Lending Pool Addresses Provider")

        // LendingPoolAddressProvider gives us the latest address on which lendingPool contract is deployed
        const lendingPoolAddressProvider = await ethers.getContractAt(
            "ILendingPoolAddressesProvider",
            aaveILendingPoolAddressesProvider,
            signer
        )

        // call getLendingPool() to get the lendingPoolContract
        // contract address can change from time-to-time - getLendingPool() refers to the correct address
        console.log("Getting Lending Pool from LendingPoolAddressProvider")
        const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()

        const lendingPoolContract = await ethers.getContractAt(
            "ILendingPool",
            lendingPoolAddress,
            signer
        )

        console.log("Lending Pool contract successfully initiated...")

        return lendingPoolContract
    } catch (e) {
        console.log("Error detected in GetLendingPool contract")
        console.error("e")
    }
}

module.exports = { GetLendingPool }
