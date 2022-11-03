// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./upgradeability/CustomOwnable.sol";
import "contracts/relayer/BasicMetaTransaction.sol";
import "./POAP_SBT.sol";
import "./REP_Points.sol";

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Registration is BasicMetaTransaction, Initializable, CustomOwnable {
    mapping(address => bool) public isPoaped;
    address public poap_sbt;
    // address public repContract;
    uint256 public repReward;
    uint256 public endtime;

    // bool isClaimActive;

    function initialize(
        address _poap_sbt,
        // address _repContract,
        uint256 _reward,
        uint256 _endtime
    ) public initializer {
        _setOwner(_msgSender());
        poap_sbt = _poap_sbt;
        // repContract = _repContract;
        repReward = _reward;
        endtime = _endtime;
    }

    function getPOAP(POAP_SBT.sbt memory _sbt) external {
        require(block.timestamp <= endtime, "Claim POAP period is over");
        address user = _msgSender();
        require(!isPoaped[user], "User has already minted POAP ");
        isPoaped[user] = true;
        _sbt.REPTokens = repReward;
        POAP_SBT(poap_sbt).mint(user, _sbt);
    }

    function setPOAP_SBTcontract(address _sbt) external onlyOwner {
        poap_sbt = _sbt;
    }

    function setRepReward(uint256 _reward) external onlyOwner {
        repReward = _reward;
    }

    function setEndTime(uint256 _endtime) external onlyOwner {
        endtime = _endtime;
    }

    function _msgSender()
        internal
        view
        override(BasicMetaTransaction)
        returns (address sender)
    {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            return msg.sender;
        }
    }
}
