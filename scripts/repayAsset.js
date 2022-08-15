const { approveErc20 } = require("../utils/approve")
const { networkConfig } = require("../helper-hardhat-config")
const { ethers, network } = require("hardhat")

/**
 *
 * @param {string} asset Name of asset borrowed (usdc/dai/usdt etc)
 * @param {contract} lendingPoolContract aave lending pool contract
 * @param {string} amount amount to be repaid in ethers
 * @param {address} signer deployer address
 */
const RepayAsset = async (asset, lendingPoolContract, amount, signer) => {
    console.log(`Initiating repayment of ${amount} ${asset}`)

    try {
        // get dai token address
        const chainId = network.config.chainId
        const assetTokenAddress = networkConfig[chainId][asset]

        // First approve the contract to access asset in wallet
        await approveErc20(assetTokenAddress, amount, lendingPoolContract.address, signer)

        const repayTxResponse = await lendingPoolContract.repay(
            assetTokenAddress,
            ethers.utils.parseEther(amount),
            1,
            signer
        )
        const repayTxReceipt = await repayTxResponse.wait(1)

        console.log(`repay tx receipt is ${repayTxReceipt.transactionHash}`)
        console.log(`repayment of ${amount} ${asset} successfuly completed`)
    } catch (e) {
        console.log("Error detected in Repay Asset")
        console.error("e")
    }
}

module.exports = { RepayAsset }
