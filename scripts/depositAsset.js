const { ethers, network } = require("hardhat")
const {
    aaveILendingPoolAddressesProvider,
    networkConfig,
    contractInterfaces,
    ETHER_AMOUNT,
} = require("../helper-hardhat-config")

const { GetLendingPool } = require("./getLendingPool")
const { approveErc20 } = require("../utils/approve")

/**
 * @dev Deposits collateral into Aave using Lending Pool Contract
 * @param asset asset that is being deposited as collateral eg. WETH, WBTC, USDC etc
 * @param amount amount deposited in ether terms
 * @param lendingPoolContract aave lending pool contract
 * @param signer signer who is sending funds to Aave deposit locker
 */

const DepositAsset = async (asset, amount, lendingPoolContract, signer) => {
    console.log(`Initiating deposit for ${asset} asset for ${amount} ether`)

    const chainId = network.config.chainId
    const assetAddress = networkConfig[chainId][asset]
    const etherAmount = amount.toString()

    console.log(`Getting asset contract for ${contractInterfaces[asset]} interface`)
    const assetContract = await ethers.getContractAt(
        contractInterfaces[asset],
        assetAddress,
        signer
    )

    console.log("asset contract initiated...")
    const assetBalanceBeforeDeposit = await assetContract.balanceOf(signer)
    console.log(
        `Asset balance in signer account pre-deposit is ${ethers.utils.formatEther(
            assetBalanceBeforeDeposit
        )}`
    )

    console.log("Seeking approval for lending pool contract to spend asset")
    await approveErc20(assetAddress, etherAmount, lendingPoolContract.address, signer)

    console.log(`sending asset address ${assetAddress}, signer ${signer}, amount ${etherAmount}`)
    console.log("getting deposit transaction response...")
    const depositTxResponse = await lendingPoolContract.deposit(
        assetAddress,
        ethers.utils.parseEther(etherAmount),
        signer,
        0
    )

    console.log("getting deposit transaction receipt...")
    const depositTxReceipt = await depositTxResponse.wait(1)

    console.log("deposit txn receipt hash", depositTxReceipt.transactionHash)

    const assetBalanceAfterDeposit = await assetContract.balanceOf(signer)
    console.log(
        `Asset balance in signer account post deposit is ${ethers.utils.formatEther(
            assetBalanceAfterDeposit
        )}`
    )
}

module.exports = { DepositAsset }
