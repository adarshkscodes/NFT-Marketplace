// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error NotOwner();
error AlreadyListed();
error NotListed();
error IncorrectPrice();

contract NFTMarketplace {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    function listNFT(address nft, uint256 tokenId, uint256 price) external {
        IERC721 token = IERC721(nft);

        if (token.ownerOf(tokenId) != msg.sender) revert NotOwner();
        if (listings[nft][tokenId].seller != address(0)) revert AlreadyListed();

        listings[nft][tokenId] = Listing(msg.sender, price);
    }

    function buyNFT(address nft, uint256 tokenId) external payable {
        Listing memory listing = listings[nft][tokenId];
        if (listing.seller == address(0)) revert NotListed();
        if (msg.value != listing.price) revert IncorrectPrice();

        delete listings[nft][tokenId];

        IERC721(nft).transferFrom(listing.seller, msg.sender, tokenId);

        // SAFER than `.transfer()` ✅
        (bool sent,) = payable(listing.seller).call{value: msg.value}("");
        require(sent, "ETH transfer failed");
    }
}
