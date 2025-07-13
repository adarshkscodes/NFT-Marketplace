// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/NFTMarketplace.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        new NFTMarketplace(); // modify if your constructor needs args
        vm.stopBroadcast();
    }
}
