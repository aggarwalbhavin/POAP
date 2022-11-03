const hre = require("hardhat");
function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("Start");
  let obj: any = {
    RegisterImpl: "0x7f075a460d7087E59570508C386563ef43bDD610",
    Register: "0xF04eC155eE220008ECa09b71c8c13E6409D1199D",
    POAP_SBT: "0xC3c4Ea9278e11F51528bEdcb2AC1ec9199C053FF",
  };
  await hre.run("verify:verify", {
    address: obj.Register,
    constructorArguments: [],
    contract:
      "contracts/upgradeability/OwnedUpgradeabilityProxy.sol:OwnedUpgradeabilityProxy",
  });

  await hre.run("verify:verify", {
    address: obj.POAP_SBT,
    constructorArguments: [],
    contract: "contracts/POAP_SBT.sol:POAP_SBT",
  });

  // await hre.run("verify:verify", {
  //   address: obj.EQ8_SBT,
  //   constructorArguments: [],
  //   contract: "contracts/EQ8_SBT.sol:EQ8_SBT",
  // });

  // await hre.run("verify:verify", {
  //   address: obj.REPToken,
  //   constructorArguments: [],
  //   contract: "contracts/REP_Points.sol:RepPoints",
  // });

  await hre.run("verify:verify", {
    address: obj.RegisterImpl,
    constructorArguments: [],
    contract: "contracts/Registration.sol:Registration",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
