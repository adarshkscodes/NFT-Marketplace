// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC721 {
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract NFTMarketplace {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    error NotOwner();
    error AlreadyListed();
    error PriceMustBeAboveZero();
    error NotListed();
    error NotSeller();
    error IncorrectPrice();

    function listNFT(address nft, uint256 tokenId, uint256 price) external {
        if (IERC721(nft).ownerOf(tokenId) != msg.sender) revert NotOwner();
        if (price == 0) revert PriceMustBeAboveZero();

        listings[nft][tokenId] = Listing(msg.sender, price);
    }

    function cancelList(address nft, uint256 tokenId) external {
        Listing memory listing = listings[nft][tokenId];
        if (listing.seller != msg.sender) revert NotSeller();
        delete listings[nft][tokenId];
    }

    function buyNFT(address nft, uint256 tokenId) external payable {
    Listing memory listing = listings[nft][tokenId];
    if (listing.seller == address(0)) revert NotListed();
    if (msg.value != listing.price) revert IncorrectPrice();

    delete listings[nft][tokenId];

    IERC721(nft).transferFrom(listing.seller, msg.sender, tokenId);

    // SAFER than `.transfer()` ✅
    (bool sent, ) = payable(listing.seller).call{value: msg.value}("");
    require(sent, "ETH transfer failed");
}

}
