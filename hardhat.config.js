require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || ""
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || ""
const MAINNET_FORK_RPC_URL = process.env.MAINNET_FORK_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "0x"
const PRIVATE_KEY_3 = process.env.PRIVATE_KEY_3 || "0x"
const PRIVATE_KEY_4 = process.env.PRIVATE_KEY_4 || "0x"

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            forking: {
                url: MAINNET_FORK_RPC_URL,
            },
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        // kovan: {
        //     url: KOVAN_RPC_URL,
        //     accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //     //accounts: {
        //     //     mnemonic: MNEMONIC,
        //     // },
        //     saveDeployments: true,
        //     chainId: 42,
        // },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts:
                PRIVATE_KEY !== undefined
                    ? [PRIVATE_KEY, PRIVATE_KEY_2, PRIVATE_KEY_3, PRIVATE_KEY_4]
                    : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 4,
        },
        mainnet: {
            url: MAINNET_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 1,
        },
        // polygon: {
        //     url: POLYGON_MAINNET_RPC_URL,
        //     accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //     saveDeployments: true,
        //     chainId: 137,
        // },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            rinkeby: ETHERSCAN_API_KEY,
            // kovan: ETHERSCAN_API_KEY,
            // polygon: POLYGONSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    contractSizer: {
        runOnCompile: false,
        only: ["Raffle"],
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
            4: 0, //rinkeby
        },
        player: {
            default: 1,
            4: 1, //rinkeby
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.4.24",
            },
            {
                version: "0.4.19",
            },
            {
                version: "0.6.0",
            },
            {
                version: "0.6.12",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
}
