// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/NFTMarketplace.sol";
import "./MockNFT.sol";

contract NFTMarketplaceTest is Test {
    NFTMarketplace public marketplace;
    MockNFT public nft;

    address seller = address(1);
    address buyer = address(2);

    function setUp() public {
        marketplace = new NFTMarketplace();
        nft = new MockNFT();

        vm.deal(seller, 10 ether);
        vm.deal(buyer, 10 ether);
    }

    function testListNFTCorrectly() public {
        uint256 tokenId = 1;
        nft.mint(tokenId, seller);

        vm.startPrank(seller);
        marketplace.listNFT(address(nft), tokenId, 1 ether);
        vm.stopPrank();

        (address listedSeller, uint256 price) = marketplace.listings(address(nft), tokenId);
        assertEq(listedSeller, seller);
        assertEq(price, 1 ether);
    }

    function testShouldBuyNFTCorrectly() public {
        uint256 tokenId = 2;
        nft.mint(tokenId, seller);

        vm.startPrank(seller);
        marketplace.listNFT(address(nft), tokenId, 1 ether);
        vm.stopPrank();

        vm.startPrank(buyer);
        marketplace.buyNFT{value: 1 ether}(address(nft), tokenId);
        vm.stopPrank();

        assertEq(nft.ownerOf(tokenId), buyer);
    }
}
