import { ethers } from "hardhat";
import {
  EQ8_SBT,
  ExpPoints,
  ExpPoints__factory,
  OwnedUpgradeabilityProxy,
  OwnedUpgradeabilityProxy__factory,
  POAP_SBT,
  RepPoints,
  Resigtration,
  Resigtration__factory,
  SBT,
  SBT__factory,
} from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

describe("Register for Gitex", async () => {
  let registration: Resigtration;
  let register_proxy: OwnedUpgradeabilityProxy;
  let register: any;
  let REP_Points: RepPoints;
  let EQ8_SBT: EQ8_SBT;
  let POAP_SBT: POAP_SBT;
  let signers: SignerWithAddress[];
  let owner: SignerWithAddress;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    owner = signers[0];

    registration = await new Resigtration__factory(owner).deploy();
    sbt = await new SBT__factory(owner).deploy();
    exp = await new ExpPoints__factory(owner).deploy();
    register_proxy = await new OwnedUpgradeabilityProxy__factory(
      owner
    ).deploy();

    await register_proxy.upgradeTo(registration.address);
    register = registration.attach(register_proxy.address);
    await sbt.addMinter(register.address);
    await exp.addMinter(register.address);
    await register.initialize(sbt.address, exp.address, 10);
  });

  it("Registers the user and mints SBT and Exp Points", async () => {
    let _sbt: any = {
      SbtId: 0,
      SbtType: "Credential",
      EventName: "Gitex2022",
      IssueDate: "22/12/22",
      Issuer: "Bhavin",
      Receiver: signers[1].address,
      EXPTokens: Number((await register.expReward()) / 10 ** 18),
      Location: "Dubai",
    };
    await register.connect(signers[1]).register(_sbt, "Data");
    console.log(
      "Balance of user in sbts",
      await sbt.balanceOf(signers[1].address)
    );
    console.log(
      "Balance of user in EXP Points",
      await exp.balanceOf(signers[1].address)
    );
    console.log("SBT", await sbt.userSbtInfo(signers[1].address));
  });

  it("Changes the sbtContract Address", async () => {
    let sbt1 = await new SBT__factory(owner).deploy();
    console.log("Old address", await register.sbtContract());

    await register.connect(owner).setSBTcontract(sbt1.address);
    console.log("New address", await register.sbtContract());
  });

  it("Changes the EXP Point Address", async () => {
    let exp1 = await new ExpPoints__factory(owner).deploy();
    console.log("Old address", await register.expContract());

    await register.connect(owner).setEXPcontract(exp1.address);
    console.log("New address", await register.expContract());

    await sbt
      .connect(signers[1])
      .transferFrom(signers[1].address, signers[2].address, 1);
  });
});
