const { ethers, network } = require("hardhat")
const { chainLinkOracles } = require("../helper-hardhat-config")

const GetChainLinkPrice = async (asset) => {
    console.log(`Getting Chain Link Price for ${asset}`)
    try {
        const chainId = network.config.chainId
        const assetChainLinkAddress = chainLinkOracles[chainId][asset]
        console.log(`Chain link address for ${asset} is ${assetChainLinkAddress}`)

        const V3AggregatorContract = await ethers.getContractAt(
            "AggregatorV3Interface",
            assetChainLinkAddress
        )

        const assetPrice = (await V3AggregatorContract.latestRoundData())[1]
        console.log(`Chainlink price for ${asset} is ${ethers.utils.formatEther(assetPrice)}`)
        return assetPrice
    } catch (e) {
        console.log("Error detected in GetChainLinkPrice")
        console.error("e")
    }
}

module.exports = { GetChainLinkPrice }
