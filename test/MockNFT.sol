// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockNFT {
    mapping(uint256 => address) public owners;

    function mint(uint256 tokenId, address to) public {
        owners[tokenId] = to;
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return owners[tokenId];
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        require(owners[tokenId] == from, "Not owner");
        owners[tokenId] = to;
    }

    receive() external payable {}
}
