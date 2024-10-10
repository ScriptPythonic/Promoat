// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./PromoatLib.sol";

contract Promoat {
    using SafeERC20 for IERC20;
    using PromoatLib for uint256;
    using PromoatLib for uint8;
    using PromoatLib for address;
    using PromoatLib for bool;
    using PromoatLib for IERC20;

    IERC20 public usdcAddress;
    address public owner;

    event PromotionCreated(uint256 id, address creator, uint256 amount, uint256 duration);
    event ContestEntered(uint256 promotionId, address contester);
    event TaskCompleted(uint256 promotionId);
    event RewardDisbursed(uint256 promotionId);
    event PromotionDeleted(uint256 promotionId, address creator);

    struct Promotion {
        uint256 id;
        address creator;
        uint256 amount;
        uint256 duration;
        string link;
        string description;
        uint8 numberOfInfluencers;
        string region;
        Contest[] contest;
        bool rewardClaimed; 
        bool taskCompleted; 
    }

    struct Contest {
        uint256 promotionId;
        address contester;
        string notes;
        string promotionLink;
    }

    // Mappings to store Promotions and Contests
    mapping(uint256 => Promotion) public promotions;

    uint256 public promotionCount;
    uint256 public contestCount;

    Promotion[] public allPromotions;

    constructor(address _usdcAddress) {
        owner = msg.sender;
        usdcAddress = IERC20(_usdcAddress);
    }

    function createPromotion(
        uint256 amount,
        uint256 duration,
        string memory link,
        string memory description,
        uint8 numberOfInfluencers,
        string memory region,
        Contest[] memory contests
    ) external {
        amount.isZeroAmount();
        duration.isInvalidDuration();
        numberOfInfluencers.hasInsufficientInfluencers();
        usdcAddress.hasInsufficientBalance(amount, msg.sender);

        uint256 _usdcAmount = amount * 10**6;
        usdcAddress.safeTransferFrom(msg.sender, address(this), _usdcAmount);

        allPromotions.push();
        Promotion storage newPromotion = allPromotions[allPromotions.length - 1];

        newPromotion.id = allPromotions.length - 1;
        newPromotion.creator = msg.sender;
        newPromotion.amount = _usdcAmount;
        newPromotion.duration = duration + block.timestamp;
        newPromotion.link = link;
        newPromotion.description = description;
        newPromotion.numberOfInfluencers = numberOfInfluencers;
        newPromotion.region = region;
        newPromotion.rewardClaimed = false;
        newPromotion.taskCompleted = false;

        for (uint256 i = 0; i < contests.length; i++) {
            newPromotion.contest.push(contests[i]);
        }

        emit PromotionCreated(newPromotion.id, msg.sender, newPromotion.amount, newPromotion.duration);
    }

    // Function to enter a contest for a specific promotion
    function enterContest(uint256 promotionId, string memory notes) external {
        PromoatLib.promotionExists(promotionId, allPromotions.length);

        Promotion storage promotion = allPromotions[promotionId];
        promotion.contest.length.hasMaxInfluencers(promotion.numberOfInfluencers);

        address[] memory contesters;
        for (uint256 i = 0; i < promotion.contest.length; i++) {
            contesters[i] = promotion.contest[i].contester;
        }
        
        PromoatLib.isAlreadyInContest(msg.sender, contesters);

        Contest memory newContest = Contest({
            promotionId: promotionId,
            contester: msg.sender,
            notes: notes,
            promotionLink: promotion.link
        });

        promotion.contest.push(newContest);

        emit ContestEntered(promotionId, msg.sender);
    }

    function completeTask(uint256 _promotionId) external {
        Promotion storage promotion = allPromotions[_promotionId];
        promotion.duration.isPromotionOngoing();
        msg.sender.isUnauthorized(promotion.creator);
        promotion.taskCompleted.isTaskCompleted();

        promotion.taskCompleted = true;

        emit TaskCompleted(_promotionId);
    }

    function disburseReward(uint256 _promotionId) external {
        Promotion storage promotion = allPromotions[_promotionId];
        promotion.duration.isPromotionOngoing();
        promotion.contest.length.hasNoParticipants();
        promotion.rewardClaimed.isRewardClaimed();

        uint256 totalParticipants = promotion.contest.length;
        uint256 prizePerParticipant = promotion.amount / totalParticipants;
        uint256 leftover = promotion.amount % totalParticipants;

        for (uint256 i = 0; i < totalParticipants; i++) {
            address participant = promotion.contest[i].contester;
            usdcAddress.safeTransfer(participant, prizePerParticipant);
        }

        if (leftover > 0) {
            usdcAddress.safeTransfer(owner, leftover);
        }

        promotion.rewardClaimed = true;

        emit RewardDisbursed(_promotionId);
    }

    function deletePromotion(uint256 _promotionId) external {
        PromoatLib.promotionExists(_promotionId, allPromotions.length);

        Promotion storage promotion = allPromotions[_promotionId];
        promotion.duration.isPromotionOngoing();
        if (!promotion.rewardClaimed) revert PromoatLib.RewardNotDisbursed();

        allPromotions[_promotionId] = allPromotions[allPromotions.length - 1];
        allPromotions.pop();

        for (uint256 i = 0; i < allPromotions.length; i++) {
            if (allPromotions[i].id == _promotionId && allPromotions[i].creator == msg.sender) {
                allPromotions[i] = allPromotions[allPromotions.length - 1];
                allPromotions.pop();
                break;
            }
        }

        emit PromotionDeleted(_promotionId, msg.sender);
    }

    function getAllPromotions() external view returns (Promotion[] memory) {
        return allPromotions;
    }

    // function getAllPromotionsByAUser(address creator) external view returns (Promotion[] memory) {
    //     return promotions[creator];
    // }

    // function getAllContestsByAUser(address contester) external view returns (Contest[] memory) {
    //     return contests[contester];
    // }
}
