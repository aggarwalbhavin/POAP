import { ethers } from "hardhat";

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function main() {
  console.log("main");

  // We get the contract to deploy
  const owner = "0xAbFe96009c70C1fb1c28b1C2539cD230d83eE887"; //change this before deploying

  // //SBT
  // const SBT = await ethers.getContractFactory("SBT");
  // const sbt = await SBT.attach("0x23f2B216b738E542FE7C3B6e23d6C29f5f4cB6b6");
  // await sleep(6000);
  // console.log("sbt", sbt.address);

  //Registration
  const Register = await ethers.getContractFactory("Resigtration");
  const registration = await Register.attach(
    "0x039ef05A644105B58e0563ea49687e5030c2fDf0"
  );

  await sleep(6000);
  let sbt: any = {
    SbtId: 0,
    SbtType: "Credential",
    EventName: "Gitex2022",
    IssueDate: "22.01.22",
    Issuer: "Bhavin",
    Receiver: "0xAbFe96009c70C1fb1c28b1C2539cD230d83eE887",
    EXPTokens: 20,
    Location: "Dubai",
  };

  await registration.register(sbt, "sadasda");
  await sleep(6000);
  console.log("Registered");
  // //ExpPoints
  // const ExpPoints = await ethers.getContractFactory("ExpPoints");
  // const EXP = await ExpPoints.attach(
  //   "0x5301307d0D992A4dd672f76e7651C61BFf5310FD"
  // );
  // await EXP.addMinter(regProxy.address);
  // await sleep(6000);
  // console.log("Added register as minter in ExpPoints");

  // await sbt.addMinter(regProxy.address);
  // await sleep(6000);
  // console.log("Add register as minter in SBT");

  // const obj = {
  //   RegisterImpl: register.address,
  //   Register: regProxy.address,
  //   SBT: sbt.address,
  //   EXP: "0x5301307d0D992A4dd672f76e7651C61BFf5310FD",
  // };
  // console.log(obj);
  // return obj;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// {
//   RegisterImpl: '0xcC9De031DFa975F61d7f0040F1eb46fD4feeFEF3',
//   Register: '0x039ef05A644105B58e0563ea49687e5030c2fDf0',
//   SBT: '0x23f2B216b738E542FE7C3B6e23d6C29f5f4cB6b6',
//   EXP: '0x727D74225D2683Ef3de3245d532CCe3e76557Ef7'
// }
