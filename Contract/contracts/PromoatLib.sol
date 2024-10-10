// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

library PromoatLib {
    error ZeroAmount();
    error InvalidDuration();
    error InsufficientInfluencers();
    error InsufficientBalance();
    error PromotionNotFound();
    error AlreadyInContest();
    error MaxInfluencersReached();
    error TaskAlreadyCompleted();
    error PromotionOngoing();
    error NoParticipants();
    error Unauthorized();
    error RewardNotDisbursed();
    error RewardsClaimed();

    // Validation Functions
    function isZeroAmount(uint256 amount) internal pure {
        if (amount == 0) revert ZeroAmount();
    }

    function isInvalidDuration(uint256 duration) internal view {
        if (duration <= block.timestamp) revert InvalidDuration();
    }

    function hasInsufficientInfluencers(uint8 numberOfInfluencers) internal pure {
        if (numberOfInfluencers == 0) revert InsufficientInfluencers();
    }

    function hasInsufficientBalance(
        IERC20 token,
        uint256 amount,
        address sender
    ) internal view {
        uint256 _usdcAmount = amount * 10**6;
        if (token.balanceOf(sender) < _usdcAmount) {
            revert InsufficientBalance();
        }
    }

    function promotionExists(uint256 promotionId, uint256 length) internal pure {
        if (promotionId >= length) revert PromotionNotFound();
    }

    function isAlreadyInContest(address contester, address[] memory contesters) internal pure {
        for (uint256 i = 0; i < contesters.length; i++) {
            if (contesters[i] == contester) revert AlreadyInContest();
        }
    }

    function hasMaxInfluencers(uint256 currentInfluencers, uint8 maxInfluencers) internal pure {
        if (currentInfluencers >= maxInfluencers) revert MaxInfluencersReached();
    }

    function isTaskCompleted(bool taskCompleted) internal pure {
        if (taskCompleted) revert TaskAlreadyCompleted();
    }

    function isPromotionOngoing(uint256 duration) internal view {
        if (block.timestamp <= duration) revert PromotionOngoing();
    }

    function isUnauthorized(address sender, address creator) internal pure {
        if (sender != creator) revert Unauthorized();
    }

    function hasNoParticipants(uint256 participants) internal pure {
        if (participants == 0) revert NoParticipants();
    }

    function isRewardClaimed(bool rewardClaimed) internal pure {
        if (rewardClaimed) revert RewardsClaimed();
    }
}
