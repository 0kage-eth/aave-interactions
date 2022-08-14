const { networkConfig } = require("../helper-hardhat-config")
const { network, ethers } = require("hardhat")

/**
 *
 * @param {string} asset borrowing asset - dai/usdc/usdt/busd etc
 * @param {contract} lendingPoolContract aave lending pool contract
 * @param {string} amountInEth amount of asset in ether
 * @param {address} signer txn originator (deployer)
 *
 */
const BorrowAsset = async (asset, lendingPoolContract, amountInEth, signer) => {
    console.log(`Initiating borrow request for ${asset} for ${amountInEth} (ethers)`)
    const chainId = network.config.chainId
    const assetTokenAddress = networkConfig[chainId][asset]

    const amountInWei = ethers.utils.formatUnits(amountInEth)
    const borrowTx = await lendingPoolContract.borrow(assetTokenAddress, amountInWei, 1, 0, signer)

    const borrowTxReceipt = await borrowTx.wait(1)

    console.log(`Borrow transaction receipt is ${borrowTxReceipt.transactionHash}`)
    console.log(`Borrowing of ${asset} for ${amountInEth} (ethers) completed successfully`)
}

module.exports = { BorrowAsset }
