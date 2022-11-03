// import { ethers } from "hardhat";

// function sleep(ms: any) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// export default async function main() {
//   console.log("main");

//   // We get the contract to deploy
//   const owner = "0xAbFe96009c70C1fb1c28b1C2539cD230d83eE887"; //change this before deploying
//   const Proxy = await ethers.getContractFactory("OwnedUpgradeabilityProxy");

//   //BABToken
//   const BABToken = await ethers.getContractFactory("SBT");
//   const babToken = await BABToken.deploy();
//   await sleep(6000);
//   console.log("BaBtoken", babToken.address);

//   //POAPSBT
//   const POAP_SBT = await ethers.getContractFactory("POAP_SBT");
//   const poap_sbt = await POAP_SBT.deploy();
//   await sleep(6000);
//   console.log("poap sbt", poap_sbt.address);

//   //EQ8SBT
//   const EQ8_SBT = await ethers.getContractFactory("EQ8_SBT");
//   const eq8_sbt = await EQ8_SBT.deploy();
//   await sleep(6000);
//   console.log("eq8 sbt", eq8_sbt.address);

//   //REPToken
//   const REPToken = await ethers.getContractFactory("RepPoints");
//   const repToken = await REPToken.deploy();
//   await sleep(6000);
//   console.log("REP Token", repToken.address);

//   //Registration
//   const Register = await ethers.getContractFactory("Registration");
//   const register = await Register.deploy();
//   await sleep(6000);
//   console.log("Registration Impl", register.address);

//   //Initialize the Contracts
//   const registerProxy = await Proxy.deploy();
//   await registerProxy.upgradeTo(register.address);
//   await sleep(6000);

//   console.log("Upgraded proxy to register", registerProxy.address);
//   const regProxy = register.attach(registerProxy.address);
//   await regProxy.initialize(
//     poap_sbt.address,
//     eq8_sbt.address,
//     babToken.address,
//     repToken.address,
//     100,
//     1665365400
//   );
//   await sleep(6000);
//   console.log("Register initialized");

//   //BABT
//   await babToken.initialize("Binance Account Bound Token", "BABT", owner);
//   await sleep(6000);
//   console.log("BABT initialized");

//   //ADD minter in the token contracts

//   await repToken.addMinter(regProxy.address);
//   await sleep(6000);
//   console.log("Added register as minter in REP Points");

//   await poap_sbt.addMinter(regProxy.address);
//   await sleep(6000);
//   console.log("Add register as minter in POAP SBT");

//   await eq8_sbt.addMinter(regProxy.address);
//   await sleep(6000);
//   console.log("Add register as minter in EQ8 SBT");

//   const obj = {
//     RegisterImpl: register.address,
//     Register: regProxy.address,
//     POAP_SBT: poap_sbt.address,
//     EQ8_SBT: eq8_sbt.address,
//     REPToken: repToken.address,
//     BABToken: babToken.address,
//   };
//   console.log(obj);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

// // {
// //   RegisterImpl: '0x8c446EdC2Bd086b8e3126BDa06038F3932f38742',
// //   Register: '0x515f1888E7FDfC71A89d734009B98535B7E89f0F',
// //   POAP_SBT: '0xEE7291158C0ac5C40fbE7924fa33bC12aAbBEa77',
// //   EQ8_SBT: '0x552e75D59958abaD6b579851D5B0f3F5D2b8824F',
// //   REPToken: '0x89E9649b965a3401Be741472892FeE7501cAD338',
// //   BABToken: '0x1a22A6616e04Ac43A76Bf55fb29DAE8A5B8DE300'
// // }
