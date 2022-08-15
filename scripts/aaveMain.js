//const { convertEthToWeth, convertWethToEth } = require("./wETHInteraction")
const { developmentChains, ETHER_AMOUNT } = require("../helper-hardhat-config")
const { ConvertEthToWeth, convertWethToEth } = require("./wETHInteraction")
const { DepositAsset } = require("./depositAsset")
const { MonitorAaveParamaters } = require("./monitorAaveParameters")
const { getNamedAccounts, ethers } = require("hardhat")
const { GetLendingPool } = require("./getLendingPool")
const { GetChainLinkPrice } = require("./getChainLinkPrice")
const { BorrowAsset } = require("./borrowAsset")
const { RepayAsset } = require("./repayAsset")

const main = async () => {
    // STEP 0: Get the signer
    const { deployer } = await getNamedAccounts()

    // STEP 1: Convert Eth in Wallet to Weth
    console.log("STEP 1: Convert ETH in Wallet to Weth")
    await ConvertEthToWeth(ETHER_AMOUNT, deployer)

    // STEP 2: Get Lending Pool Contract from Aave
    // This contract has all crictical functionality including lending/borrowing/repay/ swap assets etc
    console.log("STEP 2: Get AAVE Lending Pool Contract")
    const lendingPoolContract = await GetLendingPool(deployer)

    // STEP 3: Use WETH to deposit into Aave
    console.log("STEP 3: Deposit WETH to AAVE")
    await DepositAsset("weth", ETHER_AMOUNT, lendingPoolContract, deployer)

    // STEP 4: Check Protocol parameters afer deposit
    console.log("STEP 4: Check AAVE dashboard after deposit")
    const { totalCollateralETH, availableBorrowsETH, totalDebtETH } = await MonitorAaveParamaters(
        lendingPoolContract,
        deployer
    )

    // STEP 5: Choose a borrowing asset and calculate amount of that asset that can be borrowed
    // We get the price of borrowing asset v/s ETH in Chain link
    // Since we already got availableBorrowETH limit above, we get available borrow limit in asset currency terms
    console.log("STEP 5: Check borrowing limit in DAI")
    const borrowAsset = "dai" // we choose dai for this, we can choose from list of borrowable assets in helper-hardhat-config.js
    const daiEthPriceWei = await GetChainLinkPrice(borrowAsset)

    const borrowPercent = 0.95
    const availableAssetToBorrow =
        ((availableBorrowsETH.toString() * 1) / daiEthPriceWei) * borrowPercent

    const borrowAmount = availableAssetToBorrow.toString()

    console.log(`Borrow limit in ${borrowAsset} is ${availableAssetToBorrow}`)
    console.log(
        `Borrowing ${borrowPercent * 100}% of ${borrowAsset} borrow limit = ${borrowAmount}`
    )

    // STEP 6: Now that we have borrow limit in asset we want to borrow, next step is to actually borrow
    console.log("STEP 6: Borrow DAI against deposited WETH collateral")
    await BorrowAsset(borrowAsset, lendingPoolContract, borrowAmount, deployer)

    // STEP 7: Check if borrowing is reflected in updated dashboard
    console.log("STEP 7: Check AAVE dashboard after borrowing")
    const { totalCollateralETHPost, availableBorrowsETHPost, totalDebtETHPost } =
        await MonitorAaveParamaters(lendingPoolContract, deployer)

    // STEP 8: Repay DAI back
    console.log("STEP 8: Repay DAI")
    await RepayAsset(borrowAsset, lendingPoolContract, borrowAmount, deployer)

    // STEP 9: Check if repayment is reflected in updated dashboard
    console.log("STEP 9: Check AAVE dashboard after repayment")
    const { totalCollateralETHPostRepay, availableBorrowsETHPostRepay, totalDebtETHPostRepay } =
        await MonitorAaveParamaters(lendingPoolContract, deployer)

    // STEP 10: Convert WETH tokens back to ETH
    console.log("STEP 10: Converting WETH tokens back to ETH")
    await convertWethToEth(totalCollateralETHPostRepay, deployer)
}

// main function does all operations
main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
