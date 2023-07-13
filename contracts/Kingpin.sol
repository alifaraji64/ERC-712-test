// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KingPinNFT is ERC721, Ownable {
    mapping(address => bool) private _airdropEligibility;

    event AirdropEligibilityUpdated(address owner, bool eligibility);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to, uint256 tokenId, string memory data) external payable{
        require(msg.value == 1 ether, "Invalid amount of Ether sent");
        _safeMint(to, tokenId, bytes(data));
        _airdropEligibility[to] = true;
    }

    function transfer(address from, address to, uint256 tokenId) external{
        _transfer(from, to, tokenId);
    }

    function updateAirdropEligibility(address owner, bool eligibility) external onlyOwner {
        require(_airdropEligibility[owner], "Token does not exist");
        _airdropEligibility[owner] = eligibility;
        emit AirdropEligibilityUpdated(owner, eligibility);
    }

    function airdrop(address[] calldata recipients, uint256[] calldata tokenIds) external onlyOwner {
        require(recipients.length == tokenIds.length, "Invalid input lengths");

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 tokenId = tokenIds[i];
            address recipient = recipients[i];

            require(_airdropEligibility[recipient], "recepient not eligible for airdrop");
            _safeMint(recipient, tokenId, bytes('some random data'));
            _airdropEligibility[recipient] = false;
        }
    }
}