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

    string private _season = "Phoenix";

    /* promoId => skipIncubation */
    mapping(uint256 => bool) private _promoIncubated;

    constructor() {}

    // for testing, remove before MVP launch
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

    function createPromoEvent(
        string calldata eventName,
        uint256 duration,
        bool isUnrestricted,
        uint256 maxTickets,
        bool skipIncubation
    ) external onlyOwner {
        uint256 promoId = _createPromoEvent(
            eventName,
            duration,
            isUnrestricted,
            maxTickets
        );

        _promoIncubated[promoId] = skipIncubation;
    }

    function dispensePromoTicket(
        uint256 promoId,
        address recipient,
        uint256 ticketAmount
    ) public {
        if (_promoEvent[promoId].isUnrestricted == false) {
            require(msg.sender == owner(), "Not Authorized");
        }

        _dispensePromoTicket(promoId, recipient, ticketAmount);
    }

    function redeemPromoTicket(uint256 promoId, address recipient) public {
        _redeemPromoTicket(promoId, recipient);

        legendsNFT.createLegend(recipient, promoId, false);
    }

    function closePromoEvent(uint256 promoId) public onlyOwner {
        _closePromoEvent(promoId);
    }

    function mintLegendaryLegend(address recipient, uint256 promoId)
        public
        onlyOwner
    {
        _redeemPromoTicket(promoId, recipient);

        legendsNFT.createLegend(recipient, promoId, true);
    }

    function _restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)
        public
    {
        require(msg.sender == address(legendRejuvenation), "Not Pod");

        legendsNFT._restoreBlendingSlots(legendId, regainedSlots);
    }

    function isHatched(uint256 legendId) public view returns (bool) {
        return legendsNFT.isHatched(legendId);
    }

    function isListable(uint256 legendId) public view returns (bool) {
        return legendsNFT.isListable(legendId);
    }

    function isBlendable(uint256 legendId) public view returns (bool) {
        return legendsNFT.isBlendable(legendId);
    }

    function isPromoIncubated(uint256 promoId) public view returns (bool) {
        return _promoIncubated[promoId];
    }

    function fetchSeason() public view returns (string memory) {
        return _season;
    }

    function fetchBlendingCount(uint256 legendId)
        public
        view
        returns (uint256)
    {
        return legendsNFT.fetchLegendMetadata(legendId).blendingInstancesUsed;
    }

    function fetchBlendingCost(uint256 legendId) public view returns (uint256) {
        return legendsNFT.fetchBlendingCost(legendId);
    }

    function fetchRoyaltyRecipient(uint256 legendId)
        public
        view
        returns (address payable)
    {
        return legendsNFT.fetchLegendMetadata(legendId).legendCreator;
    }

    function setSeason(string calldata newSeason) public onlyOwner {
        _season = newSeason;
    }

    function setKinBlendingLevel(uint256 newKinBlendingLevel) public onlyOwner {
        legendsNFT.setKinBlendingLevel(newKinBlendingLevel);
    }

    function setIncubationViews(string[5] calldata newIncubationViews)
        public
        onlyOwner
    {
        legendsNFT.setIncubationViews(newIncubationViews);
    }

    function setBlendingLimit(uint256 newBlendingLimit) public onlyOwner {
        legendsNFT.setBlendingLimit(newBlendingLimit);
    }

    function setBaseBlendingCost(uint256 newBaseBlendingCost) public onlyOwner {
        legendsNFT.setBaseBlendingCost(newBaseBlendingCost);
    }

    function setIncubationPeriod(uint256 newIncubationPeriod) public onlyOwner {
        legendsNFT.setIncubationPeriod(newIncubationPeriod);
    }

    function setRoyaltyFee(uint256 newRoyaltyFee) public onlyOwner {
        legendsMarketplace.setRoyaltyFee(newRoyaltyFee);
    }

    function setMarketplaceFee(uint256 newMarketplaceFee) public onlyOwner {
        legendsMarketplace.setMarketplaceFee(newMarketplaceFee);
    }

    function setOfferDuration(uint256 newOfferDuration) public onlyOwner {
        legendsMarketplace.setOfferDuration(newOfferDuration);
    }

    function setAuctionDurations(uint256[3] calldata newAuctionDurations)
        public
        onlyOwner
    {
        legendsMarketplace.setAuctionDurations(newAuctionDurations);
    }

    function setAuctionExtension(uint256 newAuctionExtension) public onlyOwner {
        legendsMarketplace.setAuctionExtension(newAuctionExtension);
    }

    function setMinimumSecure(uint256 newMinimumSecure) public onlyOwner {
        legendRejuvenation.setMinimumSecure(newMinimumSecure);
    }

    function setMaxMultiplier(uint256 newMaxMultiplier) public onlyOwner {
        legendRejuvenation.setMaxMultiplier(newMaxMultiplier);
    }

    function setReJuPerBlock(uint256 newReJuEmissionRate) public onlyOwner {
        legendRejuvenation.setReJuPerBlock(newReJuEmissionRate);
    }

    function setReJuNeededPerSlot(uint256 newReJuNeededPerSlot)
        public
        onlyOwner
    {
        legendRejuvenation.setReJuNeededPerSlot(newReJuNeededPerSlot);
    }
}
