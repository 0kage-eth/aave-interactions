const { ethers, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

/**
 * @dev Method converts Eth to Weth, a ERC20 token with a 1:1 parity with Ether. Method calls the WETH contract on Mainnet & exchanges Eth for Weth
 * @param amount amount in Ether
 * @param signer user who sends Ether to Weth contract
 */

const ConvertEthToWeth = async (amount, signer) => {
    console.log(`Entering convertEthtoWeth to convert ${amount} ether....`)

    try {
        const chainId = network.config.chainId
        const wethAddress = networkConfig[chainId]["weth"]
        const wethContract = await ethers.getContractAt("IWeth", wethAddress, signer)

        console.log("Got the weth contract. Here are details..")

        const contractName = await wethContract.name()
        const totalSupply = await wethContract.totalSupply()
        const symbol = await wethContract.symbol()

        console.log(
            `Contract name: ${contractName}, total supply: ${ethers.utils.formatUnits(
                totalSupply,
                "ether"
            )}, symbol: ${symbol}`
        )

        const txResponse = await wethContract.deposit({
            value: ethers.utils.parseEther(amount.toString()),
        })
        const txReceipt = await txResponse.wait(1)
        console.log("Txn receipt received. Hash#", txReceipt.transactionHash)

        const wethBalance = await wethContract.balanceOf(signer)
        console.log(`Balance in WETH is ${ethers.utils.formatUnits(wethBalance, "ether")}`)

        console.log("Exiting WETH conversion call....")
    } catch (e) {
        console.log("Error detected in ETH->WETH conversion call..")
        console.error(e)
    }
}

const convertWethToEth = async () => {
    console.log("convert weth to eth")
}

module.exports = { ConvertEthToWeth, convertWethToEth }
