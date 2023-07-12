// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KingPinNFT is ERC721, Ownable {
    mapping(uint256 => bool) private _airdropEligibility;

    event AirdropEligibilityUpdated(uint256 indexed tokenId, bool eligibility);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to, uint256 tokenId) external onlyOwner {
        _mint(to, tokenId);
        _airdropEligibility[tokenId] = true;
    }

    function updateAirdropEligibility(uint256 tokenId, bool eligibility) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _airdropEligibility[tokenId] = eligibility;
        emit AirdropEligibilityUpdated(tokenId, eligibility);
    }

    function airdrop(address[] calldata recipients, uint256[] calldata tokenIds) external onlyOwner {
        require(recipients.length == tokenIds.length, "Invalid input lengths");

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 tokenId = tokenIds[i];
            require(_exists(tokenId), "Token does not exist");
            require(_airdropEligibility[tokenId], "Token not eligible for airdrop");

            _safeTransfer(owner(), recipients[i], tokenId, "");
            _airdropEligibility[tokenId] = false;
        }
    }
}