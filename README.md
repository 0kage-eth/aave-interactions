# Interacting with AAVE
## Setup

***

## Tasks

### Summary
In this project, I interact with AAVE v2 to do the following:

- Convert ETH to WETH
- Post wETH Collateral on Aave
- Borrow DAI against wETH Collateral
- Repay DAI Borrowing
- Release wETH Collateral

### Details
**Task 1 - Convert ETH to WETH by interacting with wETH contract**̌

[wETHInteraction.js](./scripts/wETHInteraction.js) has logic that converts ETH to WETH. WETH is a ERC20 token representation of ETH that is accepted as collateral on Aave.

**Task 2 - Deposit WETH on AAVE as collateral**

I've broken this task into 3-sub tasks
    - 2a. Get Lending Pool Contract of AAVE
    - 2b. Give approval to lending pool contract to use funds in our wallet
    - 2c. Deposit funds into Aave Lending Pool

*2a. Get Lending Pool Contract of AAVE*

[getLendingPool.js](./scripts/getLendingPool.js) interacts with Aave contracts and gets the LendingPool contract. This is the core contract of Aave for lending, borrowing, repaying etc.

*2b. Give approval to lending pool contract*

[approve.js](./utils/approve.js) contains a generic ERC20 approval logic that permits other contracts to access funds from wallet

*2c. Deposit funds into Aave lending pool*

[depositAsset.js](./scripts/depositAsset.js) deposits asset (dai/usdc/usdt etc) as collateral into AAVE lending pool

**Task 3 - Monitor risk parameters & interest**

AAVE publishes key platform metrics such as
    - Total Collateral (in Eth)
    - Total Borrowed (in Eth)
    - Health Factor
    - Available to borrow (in Eth)
    - Current Liquidation Threshold
    - Loan to Value (LTV)

[monitorAaveParameters.js](./scripts/monitorAaveParameters.js) gives us an output of all Aave metrics. Use this to check whether all metrics are properly updated after every action (eg. deposit, borrow, repay etc)

**Task 4 - Borrow DAI against collateral**

Once asset is posted as collateral, we can borrow against this asset. 

In this example, I borrowed DAI - there is provision to add more assets. In the [helper-hardhat-config.js](./helper-hardhat-config.js), make sure you have the asset token address added to `networkconfig` if using a new asset

Before borrowing, we need to know conversion rate of ETH-DAI. To do this, we use ChainLink [AggregatorV3Interface.sol](./contracts/interfaces/AggregatorV3Interface.sol) interface. Logic for getting latest price is in [getChainLinkPrice.js](./scripts/getChainLinkPrice.js)

[borrowAsset.js](./scripts/borrowAsset.js) has the logic to borrow an asset from AAVE using collateral deposited above


**Task 5 - Repay DAI Borrowing**

Once DAI is borrowed, you can repay that DAI by using [repayAsset.js](./scripts/repayAsset.js).

**Task 6 - Release wETH collateral**

Once WETH is released, we can re-convert WETH back to ETH. Logic for this is in [wETHInteraction.js](./scripts/wETHInteraction.js).

***


