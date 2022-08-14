const { ethers } = require("hardhat")

networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
        weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // mainnet weth address
    },

    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("1"), // 1 ETH for testing
        callbackGasLimit: "500000", // 500,000 gas
        weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // mainnet weth address
        dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        busd: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    },
    4: {
        name: "rinkeby",
        subscriptionId: "6926",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("0.1"), // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        weth: "0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15",
        dai: "0x0165b733e860b1674541BB7409f8a4743A564157",
        usdc: "0x12EAd556Db639b9345Cd59e43B4E6C7cb580Bf88",
        usdt: "0xa1Cba00d6e99f52B8cb5f867a6f2db0F3ad62276",
        busd: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    },
    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
        weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // mainnet weth address
        dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        busd: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const aaveILendingPoolAddressesProvider = "0xb53c1a33016b2dc2ff3653530bff1848a515c8c5"
const ETHER_AMOUNT = 0.02

const contractInterfaces = {
    weth: "IWeth",
}

const chainLinkOracles = {
    1: {
        dai: "0x773616E4d11A78F511299002da57A0a94577F1f4",
        frax: "0xB9E1E3A9feFf48998E45Fa90847ed4D467E8BcfD",
        usdc: "0x986b5E1e1755e3C2440e960477f25201B0a8bbD4",
        busd: "0x614715d2Af89E6EC99A233818275142cE88d1Cfd",
        usdt: "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46",
        sUSD: "0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757",
    },
    31337: {
        dai: "0x773616E4d11A78F511299002da57A0a94577F1f4",
        frax: "0xB9E1E3A9feFf48998E45Fa90847ed4D467E8BcfD",
        usdc: "0x986b5E1e1755e3C2440e960477f25201B0a8bbD4",
        busd: "0x614715d2Af89E6EC99A233818275142cE88d1Cfd",
        usdt: "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46",
        sUSD: "0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757",
    }, // when running mainnet-fork, we need oracles on mainnet, eventhough chain ID = 31337

    4: {
        dai: "0x74825DbC8BF76CC4e9494d0ecB210f676Efa001D",
        usdc: "0xdCA36F27cbC4E38aE16C4E9f99D39b42337F6dcf",
    },
}

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    aaveILendingPoolAddressesProvider,
    chainLinkOracles,
    ETHER_AMOUNT,
    contractInterfaces,
}
