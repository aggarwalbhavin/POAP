import { ethers } from "hardhat";

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function main() {
  console.log("main");

  // We get the contract to deploy
  const owner = "0xAbFe96009c70C1fb1c28b1C2539cD230d83eE887"; //change this before deploying
  const Proxy = await ethers.getContractFactory("OwnedUpgradeabilityProxy");

  //POAPSBT
  const POAP_SBT = await ethers.getContractFactory("POAP_SBT");
  const poap_sbt = await POAP_SBT.deploy();
  await sleep(15000);
  console.log("poap sbt", poap_sbt.address);


  //Registration
  const Register = await ethers.getContractFactory("Registration");
  const register = await Register.deploy();
  await sleep(15000);
  console.log("Registration Impl", register.address);

  //Initialize the Contracts
  const registerProxy = await Proxy.deploy();
  await registerProxy.upgradeTo(register.address);
  await sleep(15000);

  console.log("Upgraded proxy to register", registerProxy.address);
  const regProxy = register.attach(registerProxy.address);

  await regProxy.initialize(
    poap_sbt.address,
    100,
    1668329380
  );
  await sleep(15000);
  console.log("Register initialized");

  //ADD minter in the token contracts

  // await repToken.addMinter(regProxy.address);
  // await sleep(15000);
  // console.log("Added register as minter in REP Points");

  await poap_sbt.addMinter(regProxy.address);
  await sleep(15000);
  console.log("Add register as minter in POAP SBT");

  // await eq8_sbt.addMinter(regProxy.address);
  // await sleep(15000);
  // console.log("Add register as minter in EQ8 SBT");

  const obj = {
    RegisterImpl: register.address,
    Register: regProxy.address,
    POAP_SBT: poap_sbt.address,
    // EQ8_SBT: eq8_sbt.address,
    // REPToken: repToken.address,
  };
  console.log(obj);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  

  //Testnet{
  //   RegisterImpl: '0x7f075a460d7087E59570508C386563ef43bDD610',
  //   Register: '0xF04eC155eE220008ECa09b71c8c13E6409D1199D',
  //   POAP_SBT: '0xC3c4Ea9278e11F51528bEdcb2AC1ec9199C053FF'
  // }