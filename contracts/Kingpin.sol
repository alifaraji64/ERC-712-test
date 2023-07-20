// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract KingPinNFT is ERC721, Ownable {
    uint256 public NFTCount = 0;
    mapping(address => bool) private _airdropEligibility;
    struct Token{
        uint256 id;
        string data;
    }
    mapping(address => Token[]) private ownedTokens;
    event AirdropEligibilityUpdated(address owner, bool eligibility);

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function addToOwnedTokensMapping(address to, string memory data) internal{
        ownedTokens[to].push(Token(NFTCount,data));
    }


    function mint(address to, string memory data) external payable {
        require(msg.value == 0.5 ether, "Invalid amount of Ether sent");
        NFTCount++;
        _safeMint(to, NFTCount);
        addToOwnedTokensMapping(to, data);
        _airdropEligibility[to] = true;
    }

    function transferFrom(address from, address to, uint256 tokenId) public  override{
        if (balanceOf(from) == 1) {
            _airdropEligibility[from] = false;
        }
        _airdropEligibility[to] = true;
        super.transferFrom(from, to, tokenId);
    }

    function getEligibility(address adrs) public view returns (bool) {
        return _airdropEligibility[adrs];
    }

    function airdrop(address[] calldata recipients, string[] memory data) external onlyOwner {
        require(recipients.length > 0, "recipients is empty");
        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            require(
                _airdropEligibility[recipient],
                "recepient not eligible for airdrop"
            );
            NFTCount++;
            _safeMint(recipient, NFTCount);
            addToOwnedTokensMapping(recipient, data[i]);
            _airdropEligibility[recipient] = false;
        }
    }

    function getOwnedNFTs(address owner) external view returns (Token[] memory) {
        return ownedTokens[owner];
    }
}
