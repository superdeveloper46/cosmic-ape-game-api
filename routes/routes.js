var express = require('express');
var router = express.Router();
var moment = require('moment');

const apes = require('../controller/ape');
const mission = require('../controller/mission');
const nft = require('../controller/nft');
const inventories = require('../controller/inventories');
const equips = require('../controller/equips')
const items = require('../controller/items')
const maps = require('../controller/maps')
const listings = require('../controller/listings')

const v2Accounts = require('../controller/v2/accounts');
const v2Apes = require('../controller/v2/ape');
const v2Mission = require('../controller/v2/mission');
const v2Maps = require('../controller/v2/maps');
const v2Items = require('../controller/v2/items');
const v2Resources = require('../controller/v2/resources');
const v2Currencies = require('../controller/v2/currencies');
const v2Equips = require('../controller/v2/equips');
const v2Levels = require('../controller/v2/levels');
const v2Info = require('../controller/v2/info');
const v2StakeRewards = require('../controller/v2/staking-rewards')
const v2Bank = require('../controller/v2/bank');

const v2TierComplexity = require('../controller/v2/tier-complexity');
const v2LimitBreak = require('../controller/v2/limit-break');
const v2Products = require('../controller/v2/products');
const v2ShopPurchase  = require('../controller/v2/shop-purchase')
const v2AccountLimits  = require('../controller/v2/account-limits')


//Admin-page
const admin_auth = require('../controller/admin/auth')
const admin_maps = require('../controller/admin/maps')
const admin_missions = require('../controller/admin/missions')
const admin_missionItemRewards = require('../controller/admin/missionItemRewards')
const admin_items = require('../controller/admin/items')
const admin_effects = require('../controller/admin/effects')


//middleware
const { verifyToken } = require("../middleware/authJwt");

router.get('/health', (req, res) => {
  res.status(200).send('Ok');
});

// ======================Admin-page=========================
    // auth
    router.post('/api/account/login', admin_auth.login)
    router.post('/api/account/register', admin_auth.register)
    router.post('/api/account/verify', admin_auth.verify)
    router.post('/api/account/resend', admin_auth.resend)

    router.post('/api/account/reset_password', admin_auth.reset_password)
    router.post('/api/account/new_password', admin_auth.new_password)


    //maps
    router.get('/api/admin/maps', [verifyToken], admin_maps.gets)
    router.get('/api/admin/maps/map/:id', [verifyToken], admin_maps.get)
    router.post('/api/admin/maps/create', [verifyToken], admin_maps.create)
    router.post('/api/admin/maps/update/:id', [verifyToken], admin_maps.update)

    //missions
    router.get('/api/admin/missions', [verifyToken], admin_missions.gets)
    router.get('/api/admin/missions/mission/:id', [verifyToken], admin_missions.get)
    router.post('/api/admin/missions/create', [verifyToken], admin_missions.create)
    router.post('/api/admin/missions/update/:id', [verifyToken], admin_missions.update)
    router.post('/api/admin/missions/delete', [verifyToken], admin_missions.delete)
    router.post('/api/admin/missions/deletes', [verifyToken], admin_missions.deletes)

    //missionItemRewards
    router.get('/api/admin/missionItemRewards', [verifyToken], admin_missionItemRewards.gets)
    router.get('/api/admin/missionItemRewards/item/:id', [verifyToken], admin_missionItemRewards.get)
    router.post('/api/admin/missionItemRewards/create', [verifyToken], admin_missionItemRewards.create)
    router.post('/api/admin/missionItemRewards/update/:id', [verifyToken], admin_missionItemRewards.update)

    //items
    router.get('/api/admin/items', [verifyToken], admin_items.gets)
    router.get('/api/admin/Items/item/:id', [verifyToken], admin_items.get)
    router.post('/api/admin/items/create', [verifyToken], admin_items.create)
    router.post('/api/admin/items/update/:id', [verifyToken], admin_items.update)
    router.post('/api/admin/items/delete', [verifyToken], admin_items.delete)
    router.post('/api/admin/items/deletes', [verifyToken], admin_items.deletes)

    //effects
    router.get('/api/admin/effects', [verifyToken], admin_effects.gets)
    router.get('/api/admin/effects/effect/:id', [verifyToken], admin_effects.get)
    router.post('/api/admin/effects/create', [verifyToken], admin_effects.create)
    router.post('/api/admin/effects/update/:id', [verifyToken], admin_effects.update)


// ======================Admin=========================

// Home page route.
router.post('/apes/store',  apes.store)
router.post('/apes/store/bulk',  apes.bulkStore)
router.post('/apes/check-levelup', apes.checkLevelUp)
router.post('/apes/levelup', apes.levelUp)
router.get('/apes/info', apes.getInfo)

router.get('/maps', maps.maps)
router.get('/map/get', maps.getMap)

router.get('/missions', mission.missions)
router.get('/missions/map', mission.mapMissions)
router.get('/mission/get', mission.getMission);
router.post('/mission/go-mission-selected', mission.goMissionSelected)
router.post('/mission/go-mission', mission.goMissionSelected)
router.post('/mission/reward', mission.getReward)

router.get('/nft/fetch', nft.getWalletNfts)
router.post('/wallet/verify', nft.verifyWallet)

// inventories
router.get('/inventories', inventories.getInventories)
router.post('/inventories/create', inventories.createInventory)

// items
router.get('/items/get-ingredients', items.getIngredients)
router.get('/items', items.getItemsByTier)
router.post('/items/craft', items.craft)

//item equips
router.post('/equip/check-equip', equips.checkEquip)
router.post('/equip/equip', equips.equip)
router.post('/equip/unequip', equips.unequip)
router.post('/equip/default/equip', equips.defaultEquip)
router.post('/equip/default/unequip', equips.defaultUnequip)
router.get('/equip/default', equips.defaultItems)
router.get('/listings',listings.getlistings)
router.get('/listings/ape',listings.getlisting)
// router.get('/listings/get',listings.getlisting)
router.get('/stats', listings.getStats)
router.get("/itemsList", listings.getItems)
router.get("/levels", listings.getLevels)
router.get("/resourceList",listings.getResources)
// rewards
router.post('/reward/claim-all', mission.claimAllRewards)

//v2 apis
router.post('/v2/apes/store/bulk', v2Apes.bulkStore)
router.post('/v2/apes', v2Apes.getInfos)
router.post('/v2/ape/crowned', v2Apes.getCrowned)
router.post('/v2/ape/crown', v2Apes.setCrown)
router.post('/v2/ape/uncrown', v2Apes.removeCrown)
router.post('/v2/ape/favorite', v2Apes.favorite)
router.post('/v2/ape/unfavorite', v2Apes.unfavorite)
router.post('/v2/apes/levelup', v2Apes.levelUp)
router.post('/v2/apes/levelup-by-xp', v2Apes.levelUpByExperienceItems)
router.post('/v2/apes/evolute', v2Apes.evolute)
router.get('/v2/apes/refresh-stamina', v2Apes.refreshStamina)
router.get('/v2/apes/powers', v2Apes.powers)
router.get('/v2/mission-complexity',v2TierComplexity.mission_complexity)

router.get('/v2/account', v2Accounts.getInfo)
router.get('/v2/get-mfa', v2Accounts.getMFA)
router.post('/v2/verify-wallet', v2Accounts.verifyWallet)
router.put('/v2/account', v2Accounts.updateAccountInfo)

router.post('/v2/auth/twitter/reverse', v2Accounts.twitterReverse)
router.get('/v2/auth/twitter', v2Accounts.twitterAuth)
router.get('/v2/me', v2Accounts.getMe)

router.get('/v2/missions', v2Mission.missions)
router.get('/v2/missions/by-reward-item', v2Mission.missionsByRewardItem)
router.get('/v2/missions/by-reward-resource', v2Mission.missionsByRewardResource)
router.post('/v2/missions/go-mission-selected', v2Mission.goMissionSelected)
router.post('/v2/missions/claim-all-rewards', v2Mission.claimAllRewards)

router.get('/v2/maps', v2Maps.maps)
router.get('/v2/items', v2Items.items)
router.get('/v2/craft-recipes', v2Items.craftRecipes)
router.get('/v2/limit-break-recipes', v2LimitBreak.getLimitBreakRecipes)
router.post('/v2/limit-break', v2LimitBreak.limitBreak)
router.get('/v2/resources', v2Resources.resources)
router.get('/v2/account-resource-summary', v2Resources.account_resource_summary)
router.get('/v2/currencies', v2Currencies.currencies)

router.post('/v2/equip/default/equip', v2Equips.defaultEquip)
router.post('/v2/equip/default/unequip', v2Equips.defaultUnequip)
router.post('/v2/craft', v2Items.craft)
router.post('/v2/items/forge', v2Items.forge)
router.post('/v2/items/repair', v2Items.repair)
router.post('/v2/items/reveal', v2Items.reveal)
router.post('/v2/items/sell', v2Items.sell)
router.post('/v2/items/salvage', v2Items.salvage)
router.get('/v2/items/account', v2Items.accountItems)
router.get('/v2/items/account/inventory', v2Items.reloadInventory)
router.get('/v2/character-currencies-balance-by-wallet',v2Accounts.character_currencies_balances_for_account)
router.get('/v2/character-all-currency-balance-by-character',v2Accounts.character_currency_balances_per_character)
router.get('/v2/character-currency-balance-by-wallet',v2Accounts.character_currency_balances_for_account)
router.get('/v2/products',v2Products.getProducts)
router.post('/v2/purchase',v2ShopPurchase.shop_purchase)
router.get('/v2/account-limits/shop',v2AccountLimits.getAccountShopItemLimits)
router.get('/v2/account-limits/refresh',v2AccountLimits.getShopRefreshTimes)


router.get('/v2/info/repair-costs', v2Info.repairCosts)
router.get('/v2/info/evolution-costs', v2Info.evolutionCosts)
router.get('/v2/info/power-effects', v2Info.powerEffects)

router.get('/v2/levels', v2Levels.levels)
router.get('/v2/staking-rewards', v2StakeRewards.reward)




router.post('/v2/bank/deposit/start', v2Bank.depositStart)
router.post('/v2/bank/deposit/complete', v2Bank.depositComplete)
router.post('/v2/bank/withdraw', v2Bank.withdraw)
router.get('/v2/bank/verify-unconfirmed-signatures', v2Bank.verifyUnconfirmedSignatures)
router.get('/v2/account_levels',v2Accounts.account_levels)

module.exports = router;