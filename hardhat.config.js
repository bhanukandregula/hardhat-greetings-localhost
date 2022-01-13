const { normalizeSpdxLicenceIdentifiers } = require("@ethereum-waffle/compiler");

require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  // added this paths to connect to react artifacts whien we will generate while compiling react project
  paths: {
    artifacts: './src/artifacts'
  },
  //hardhat configuration setup of our local network
  // we will be using our local hardnetwork
  // we can alsways switch to another local netwrok if in case needed
  networks:{
    hardhat:{
      chainId: 1337
    }
  }
};
