// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketplace is ERC721URIStorage {
    address payable public owner;

    constructor() ERC721("NFTMarketplace", "NFTM") {
        owner = payable(msg.sender);
    }

    uint256 private _tokenIds;

    struct ListedToken {
        uint256 tokenId;
        address payable owner;
    }

    event NFTMinted(uint256 tokenId, address indexed owner);

    mapping(uint256 => ListedToken) private idToListedToken;

    function NFTminter(
        string memory tokenUri,
        address payable _receiverAddr
    ) public {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _safeMint(_receiverAddr, newItemId);
        _setTokenURI(newItemId, tokenUri);

        idToListedToken[newItemId] = ListedToken(newItemId, _receiverAddr);

        emit NFTMinted(newItemId, _receiverAddr);
    }

    function getAllNFTs() public view returns (ListedToken[] memory) {
        ListedToken[] memory tokens = new ListedToken[](_tokenIds);

        for (uint256 i = 1; i <= _tokenIds; i++) {
            tokens[i - 1] = idToListedToken[i];
        }

        return tokens;
    }

    function getMyNFTs(
        address userAddr
    ) public view returns (ListedToken[] memory) {
        uint256 itemCount = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (idToListedToken[i].owner == userAddr) {
                itemCount++;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (idToListedToken[i].owner == userAddr) {
                items[currentIndex] = idToListedToken[i];
                currentIndex++;
            }
        }

        return items;
    }
}
