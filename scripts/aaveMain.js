//const { convertEthToWeth, convertWethToEth } = require("./wETHInteraction")
const { developmentChains, ETHER_AMOUNT } = require("../helper-hardhat-config")
const { ConvertEthToWeth } = require("./wETHInteraction")
const { DepositAsset } = require("./depositAsset")
const { MonitorAaveParamaters } = require("./monitorAaveParameters")
const { getNamedAccounts, ethers } = require("hardhat")
const { GetLendingPool } = require("./getLendingPool")
const { GetChainLinkPrice } = require("./getChainLinkPrice")
const { BorrowAsset } = require("./borrowAsset")

const main = async () => {
    // STEP 0: Get the signer
    const { deployer } = await getNamedAccounts()

    // STEP 1: Convert Eth in Wallet to Weth
    await ConvertEthToWeth(ETHER_AMOUNT, deployer)

    // STEP 2: Get Lending Pool Contract from Aave
    // This contract has all crictical functionality including lending/borrowing/repay/ swap assets etc
    const lendingPoolContract = await GetLendingPool(deployer)

    // STEP 3: Use WETH to deposit into Aave
    await DepositAsset("weth", ETHER_AMOUNT, lendingPoolContract, deployer)

    // STEP 4: Check Protocol parameters afer deposit
    const { totalCollateralETH, availableBorrowsETH, totalDebtETH } = await MonitorAaveParamaters(
        lendingPoolContract,
        deployer
    )

    // STEP 5: Choose a borrowing asset and calculate amount of that asset that can be borrowed
    // We get the price of borrowing asset v/s ETH in Chain link
    // Since we already got availableBorrowETH limit above, we get available borrow limit in asset currency terms

    const borrowAsset = "dai" // we choose dai for this, we can choose from list of borrowable assets in helper-hardhat-config.js
    const daiEthPriceWei = await GetChainLinkPrice(borrowAsset)

    const availableAssetToBorrow = ((availableBorrowsETH.toString() * 1) / daiEthPriceWei) * 0.95

    console.log(`Borrow limit in ${borrowAsset} is ${availableAssetToBorrow}`)

    // STEP 6: Now that we have borrow limit in asset we want to borrow, next step is to actually borrow
    await BorrowAsset(borrowAsset, lendingPoolContract, availableAssetToBorrow.toString(), deployer)

    // STEP 7: Check if borrowing is reflexted in updated dashboard
}

// main function does all operations
main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
