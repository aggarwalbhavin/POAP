// const hre = require("hardhat");
// function sleep(ms: any) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function main() {
//   console.log("Start");
//   let obj: any = {
//     RegisterImpl: "0x8c446EdC2Bd086b8e3126BDa06038F3932f38742",
//     Register: "0x515f1888E7FDfC71A89d734009B98535B7E89f0F",
//     POAP_SBT: "0xEE7291158C0ac5C40fbE7924fa33bC12aAbBEa77",
//     EQ8_SBT: "0x552e75D59958abaD6b579851D5B0f3F5D2b8824F",
//     REPToken: "0x89E9649b965a3401Be741472892FeE7501cAD338",
//     BABToken: "0x1a22A6616e04Ac43A76Bf55fb29DAE8A5B8DE300",
//   };
//   // await hre.run("verify:verify", {
//   //   address: obj.Register,
//   //   constructorArguments: [],
//   //   contract:
//   //     "contracts/upgradeability/OwnedUpgradeabilityProxy.sol:OwnedUpgradeabilityProxy",
//   // });

//   // await hre.run("verify:verify", {
//   //   address: obj.BABToken,
//   //   constructorArguments: [],
//   //   contract: "contracts/BABT.sol:SBT",
//   // });

//   // await hre.run("verify:verify", {
//   //   address: obj.POAP_SBT,
//   //   constructorArguments: [],
//   //   contract: "contracts/POAP_SBT.sol:POAP_SBT",
//   // });

//   await hre.run("verify:verify", {
//     address: obj.EQ8_SBT,
//     constructorArguments: [],
//     contract: "contracts/EQ8_SBT.sol:EQ8_SBT",
//   });

//   // await hre.run("verify:verify", {
//   //   address: obj.REPToken,
//   //   constructorArguments: [],
//   //   contract: "contracts/REP_Points.sol:RepPoints",
//   // });

//   // await hre.run("verify:verify", {
//   //   address: obj.RegisterImpl,
//   //   constructorArguments: [],
//   //   contract: "contracts/Registration.sol:Registration",
//   // });
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
