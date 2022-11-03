//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SoulBoundToken_conf is ERC721 {
    address public owner;
    struct sbt {
        string Category;
        string Issuer;
        string Title;
        string Type;
    }

    sbt _sbt;
    uint256 public SBT_ID = 1;
    mapping(uint256 => sbt) public info;
    mapping(address => uint256[]) public userInfo;
    event SBT_mint(address minter, address receiver, uint256 SBT_ID);

    constructor() ERC721("SoulBound Token", "SBT") {
        owner = msg.sender;
    }

    function mint(address[] memory _to) external {
        require(msg.sender == owner, "Not owner");

        address[] memory users = _to;
        uint256 length = users.length;
        _sbt.Category = "Credential SBT";
        _sbt.Issuer = "Madras DAO";
        _sbt.Title = "THE QUACKENING @GOA";
        _sbt.Type = "POAP";

        for (uint256 i = 0; i < length; i++) {
            _mint(users[i], SBT_ID);
            // _setTokenURI(SBT_ID, URI);
            userInfo[users[i]].push(SBT_ID);
            info[SBT_ID] = _sbt;
            emit SBT_mint(owner, users[i], SBT_ID);
            SBT_ID++;
        }
    }

    function burn(uint256 _sbtId) external {
        require(msg.sender == owner, "Not Owner");
        _burn(_sbtId);
    }

    function _transfer(
        address from,
        address to,
        uint256 _sbtId
    ) internal override {
        require(false, "NON-transferable");
        super._transfer(from, to, _sbtId);
    }
}
