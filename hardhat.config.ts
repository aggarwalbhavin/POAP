import { task } from "hardhat/config";
// import "@nomiclabs/hardhat-waffle";
import "@nomicfoundation/hardhat-chai-matchers";

// import "hardhat-typechain";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
require("hardhat-contract-sizer");
import * as dotenv from "dotenv";

dotenv.config();
const MUMBAI_TESTNET_PRIVATE_KEY = process.env.MUMBAI_TESTNET_PRIVATE_KEY;
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default {
  // contractSizer: {
  //   alphaSort: true,
  //   disambiguatePaths: false,
  //   runOnCompile: true,
  //   strict: true,
  // },
  networks: {
    hardhat: {
      gas: 100000000,
      gasPrice: 8750000000,
      blockGasLimit: 200000000,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    matic: {
      url: "https://matic-testnet-archive-rpc.bwarelabs.com",
      // url: "https://rpc-mumbai.maticvigil.com",
      // url:"https://polygon-mumbai.g.alchemy.com/v2/ZpZtmCwBmB-PGVS5d9u78XaH3UYTEBgM",
      accounts: [`0x${MUMBAI_TESTNET_PRIVATE_KEY}`],
    },
    matic_mainnet: {
      url: "https://polygon-rpc.com",
      accounts: [`0x${MUMBAI_TESTNET_PRIVATE_KEY}`],
      gasLimit: 3 * 10 ** 6,
    },
    bsc_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [`0x${MUMBAI_TESTNET_PRIVATE_KEY}`],
      chainId: 97,
      gasPrice: 20000000000,
    },
    bsc_mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: [`0x${MUMBAI_TESTNET_PRIVATE_KEY}`],
      chainId: 56,
    },
    moonbase: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [`0x${MUMBAI_TESTNET_PRIVATE_KEY}`],
      chainId: 1287,
    },

    moonbeam: {
      url: "https://rpc.api.moonbeam.network",
      accounts: [`0x${MUMBAI_TESTNET_PRIVATE_KEY}`],
      chainId: 1284,
    },
    // rinkeby: {
    //   url: `${process.env.ALCHEMY_API_KEY}`,
    //   accounts: [`0x${MUMBAI_TESTNET_PRIVATE_KEY}`]
    // }
    // testnet: {
    //   url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //   chainId: 97,
    //   gasPrice: 20000000000,
    //   accounts: {
    //     mnemonic: process.env.TESTNET_MNEMONIC,
    //   },
    // },
  },
  etherscan: {
    apiKey: "252SIUVDFK8QQVFR29KQNZZ6I6R4J3F4ZF",
    // "FNMGWH7UKQMD917I8ER98XTZYN9YH9ZYHY",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },

  gasReporter: {
    enabled: false,
  },
};
