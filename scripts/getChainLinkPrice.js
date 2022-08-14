const { ethers, network } = require("hardhat")
const { chainLinkOracles } = require("../helper-hardhat-config")

const GetChainLinkPrice = async (asset) => {
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
}

module.exports = { GetChainLinkPrice }
