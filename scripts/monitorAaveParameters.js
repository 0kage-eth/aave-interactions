const { ethers } = require("hardhat")

/**
 * @dev Returns dashboard parameters including collateral, debt, loan-to-value and health factor
 * @param {Contract} lendingPoolContract Aave lending pool contract
 * @param {address} signer Contract deployer
 * @returns
 */
const MonitorAaveParamaters = async (lendingPoolContract, signer) => {
    try {
        const {
            totalCollateralETH,
            totalDebtETH,
            availableBorrowsETH,
            currentLiquidationThreshold,
            ltv,
            healthFactor,
        } = await lendingPoolContract.getUserAccountData(signer)

        console.log(`**** Getting AAVE STATS for address# ${signer} ****`)
        console.log("Total Collateral in ETH", ethers.utils.formatEther(totalCollateralETH))
        console.log("Total Debt in ETH", ethers.utils.formatEther(totalDebtETH))
        console.log("Available borrow in ETH", ethers.utils.formatEther(availableBorrowsETH))
        console.log("Current Liquidation Threshold", currentLiquidationThreshold.toString())
        console.log("Loan to Value", ltv.toString())
        console.log("Health Factor", healthFactor.toString())

        return { totalCollateralETH, availableBorrowsETH, totalDebtETH }
    } catch (e) {
        console.log("Error detected in Monitor Aave Parameters")
        console.error("e")
    }
}

module.exports = { MonitorAaveParamaters }
