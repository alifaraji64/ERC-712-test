// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KingPinNFT is ERC721, Ownable {
    uint256 public NFTCount = 0;
    mapping(address => bool) private _airdropEligibility;

    event AirdropEligibilityUpdated(address owner, bool eligibility);

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function mint(address to, string memory data) external payable {
        require(msg.value == 0.5 ether, "Invalid amount of Ether sent");
        NFTCount++;
        _safeMint(to, NFTCount, bytes(data));
        _airdropEligibility[to] = true;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        if(balanceOf(from)==1){
            _airdropEligibility[from] = false;
        }
        _airdropEligibility[to] = true;
        super.transferFrom(from, to, tokenId);
    }

    function getEligibility(address adrs)public view returns(bool){
        return _airdropEligibility[adrs];
    }

    function airdrop(address[] calldata recipients) external onlyOwner {
        require(recipients.length > 0, "recipients is empty");
        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            require(_airdropEligibility[recipient], "recepient not eligible for airdrop");
            NFTCount++;
            _safeMint(recipient, NFTCount, bytes("some random data"));
            _airdropEligibility[recipient] = false;
        }
    }
}
