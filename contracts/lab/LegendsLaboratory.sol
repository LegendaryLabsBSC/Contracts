// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../legend/LegendsNFT.sol";
import "../token/LegendToken.sol";
import "../rejuvenation/LegendRejuvenation.sol";
import "../marketplace/LegendsMarketplace.sol";
import "../matching/LegendsMatchingBoard.sol";
import "./TicketMachine.sol";

/**
 *
 */
contract LegendsLaboratory is Ownable, TicketMachine {
    LegendsNFT public legendsNFT = new LegendsNFT();
    LegendToken public legendToken = new LegendToken(msg.sender);
    LegendRejuvenation public legendRejuvenation = new LegendRejuvenation();
    LegendsMarketplace public legendsMarketplace = new LegendsMarketplace();
    LegendsMatchingBoard public legendsMatchingBoard =
        new LegendsMatchingBoard();

    string private season = "Phoenix";

    // modifier onlyPod() {
    //     require(msg.sender == address(legendRejuvenation), "Not Pod");
    //     _;
    // }

    constructor() {}

    // for testing
    function getChildContracts()
        public
        view
        virtual
        returns (
            LegendsNFT,
            LegendToken,
            LegendRejuvenation,
            LegendsMarketplace,
            LegendsMatchingBoard
        )
    {
        return (
            legendsNFT,
            legendToken,
            legendRejuvenation,
            legendsMarketplace,
            legendsMatchingBoard
        );
    }

    /* promoId => skipIncubation */
    mapping(uint256 => bool) private _promoIncubation;

    function fetchPromoIncubation(uint256 promoId) public view returns (bool) {
        return _promoIncubation[promoId];
    }

    function createPromoEvent(
        string memory eventName,
        uint256 duration,
        bool isUnrestricted,
        bool skipIncubation
    ) public onlyOwner {
        uint256 promoId = _createPromoEvent(
            eventName,
            duration,
            isUnrestricted
        );

        _promoIncubation[promoId] = skipIncubation;
    }

    function dispensePromoTicket(
        uint256 promoId,
        address recipient,
        uint256 ticketAmount
    ) public {
        if (promoEvent[promoId].isUnrestricted == false) {
            require(msg.sender == owner(), "Not Authorized");
        }

        _dispensePromoTicket(promoId, recipient, ticketAmount);
    }

    function redeemPromoTicket(uint256 promoId, address recipient) public {
        _redeemPromoTicket(promoId, recipient);

        // approval lock needed ?
        legendsNFT.createLegend(recipient, promoId, false);
    }

    function closePromoEvent(uint256 promoId) public onlyOwner {
        _closePromoEvent(promoId);
    }

    function setKinBlendingLevel(uint256 newKinBlendingLevel) public onlyOwner {
        legendsNFT.setKinBlendingLevel(newKinBlendingLevel);
    }

    function setIncubationPeriod(uint256 newIncubationPeriod) public onlyOwner {
        legendsNFT.setIncubationPeriod(newIncubationPeriod);
    }

    //TODO: mint legendary function

    function setBlendingLimit(uint256 _newBlendingLimit) public onlyOwner {
        legendsNFT.setBlendingLimit(_newBlendingLimit);
    }

    function setBaseBlendingCost(uint256 _newBaseBlendingCost)
        public
        onlyOwner
    {
        legendsNFT.setBaseBlendingCost(_newBaseBlendingCost);
    }

    function setSeason(string memory _newSeason) public onlyOwner {
        season = _newSeason;
    }

    // function mintPromotion(address receiver, string memory prefix, string memory postfix, uint dna) public onlyOwner {
    //     legendsNFT.mintPromo(receiver, prefix, postfix, dna);
    // }

    function setRoyaltyFee(uint256 _newFee) public onlyOwner {
        legendsMarketplace.setRoyaltyFee(_newFee);
    }

    function setMarketplaceFee(uint256 newFee) public onlyOwner {
        legendsMarketplace.setMarketplaceFee(newFee);
    }

    function setOfferDuration(uint256 _newDuration) public onlyOwner {
        legendsMarketplace.setOfferDuration(_newDuration);
    }

    function setAuctionExtension(uint256 _newDuration) public onlyOwner {
        legendsMarketplace.setAuctionExtension(_newDuration);
    }

    function setMatchingBoardFee(uint256 newFee) public onlyOwner {
        legendsMatchingBoard.setMatchingBoardFee(newFee);
    }

    function restoreBlendingSlots(uint256 _legendId, uint256 _regainedSlots)
        public
    {
        require(msg.sender == address(legendRejuvenation), "Not Pod");

        legendsNFT.restoreBlendingSlots(_legendId, _regainedSlots);
    }

    function fetchRoyaltyRecipient(uint256 _legendId)
        public
        view
        returns (address payable)
    //onlyMarketplace //TODO: in access control rework
    {
        return legendsNFT.fetchLegendMetadata(_legendId).legendCreator;
    }

    //TODO: change is-es to query
    function fetchIsListable(uint256 _legendId)
        public
        view
        returns (bool)
    //onlyMarketplace //TODO: in access control rework
    {
        return legendsNFT.isListable(_legendId);
    }

    function fetchBlendingCount(uint256 _legendId)
        public
        view
        returns (uint256)
    {
        return legendsNFT.fetchLegendMetadata(_legendId).blendingInstancesUsed;
    }

    function fetchIsHatched(uint256 _legendId)
        public
        view
        returns (bool)
    //onlyMarketplace //TODO: in access control rework
    {
        return legendsNFT.isHatched(_legendId);
    }

    function fetchIsBlendable(uint256 _legendId) public view returns (bool) {
        return legendsNFT.isBlendable(_legendId);
    }

    function fetchBlendingCost(uint256 _legendId)
        public
        view
        returns (uint256)
    {
        return legendsNFT.fetchBlendingCost(_legendId);
    }

    function fetchSeason() public view returns (string memory) {
        return season;
    }

    function fetchBlendingLimit() public view returns (uint256) {
        return legendsNFT.fetchBlendingLimit();
    }

    // function fetchOffspringCount(uint256 _tokenId)
    //     public
    //     view
    //     returns (uint256)
    // //only ? //TODO: in access control rework
    // {
    //     return legendsNFT.tokenMeta(_tokenId).offspringCount;
    // }

    //     function restoreBreedingSlots(uint256 _tokenId, uint256 _newOffspringCount)
    //         internal
    //         view
    //         returns (uint256)
    //     //only ? //TODO: in access control rework
    //     {
    //         return legendsNFT.tokenMeta(_tokenId).breedingInstancesUsed;
    //     }
}
