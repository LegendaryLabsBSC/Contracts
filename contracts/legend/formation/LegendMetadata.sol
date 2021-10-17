// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILegendMetadata {
    struct LegendMetadata {
        uint256 id;
        string season;
        string prefix;
        string postfix;
        uint256[2] parents;
        uint256 birthDay;
        uint256 blendingCost;
        uint256 totalOffspring;
        uint256 blendingInstancesUsed;
        address payable legendCreator;
        bool isLegendary; // Legendary concept will need to be reevaluated
        bool isHatched; // could be mapping
        bool isDestroyed; // token burnt permanently
    }
}
