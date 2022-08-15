const { ethers } = require("hardhat")

/**
 *
 * @param {address} erc20Address erc20 token address
 * @param {string} amountToSpend amount in ether
 * @param {address} spenderAddress contract which is seeking permission to spend
 * @param {address} signer signer who has to approve
 */
const approveErc20 = async (erc20Address, amountToSpend, spenderAddress, signer) => {
    try {
        console.log("entering ERC 20 txn approval!")
        const erc20Contract = await ethers.getContractAt("IERC20", erc20Address, signer)

        const txResponse = await erc20Contract.approve(
            spenderAddress,
            ethers.utils.parseEther(amountToSpend)
        )
        await txResponse.wait(1)
        console.log("Transaction approved successfully!")
    } catch (e) {
        console.log("Error in approving ERC20 txn")
        console.error(e)
    }
}

module.exports = { approveErc20 }
