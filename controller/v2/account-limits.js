const getApesNotInWallet = require('../../utils/nft/get-apes-not-in-wallet');
const {getShopRefreshTimes, getlimits} = require('../../utils/account_limits/account-limit-helper');
const {
    Product,
    Apes,
    sequelize
} = require('../../models/index');
const Redis = require("ioredis");
const moment = require("moment");
const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
});
const { INVENTORY_SLOTS } = require('../../utils/consts')
const {getNoOfApes} = require("../../utils/apes/ape-helper");

module.exports = {

    getAccountShopItemLimits: async  function (req, res){
      const {wallet}  = req.query;
      if(!wallet){
          res.status(400).json({message: "A wallet address is needed"})
      }

      try{
          let productsAvailableToWallet;
          await sequelize.transaction(async (t) => {
              let noOfApes = await getNoOfApes(wallet,t);
              productsAvailableToWallet = await getlimits({wallet:wallet,noOfApes:noOfApes,redis:redis,transaction:t});
          });
          res.status(200).json(productsAvailableToWallet)
      } catch(err){
          res.status(400).json({message:err.message});
      }
  },


    async getShopRefreshTimes(req,res){

        res.status(200).json(getShopRefreshTimes())
    }
}
