const axios = require('axios');
const minted = require('../..//static/cosmic_mint_data.json')
const moment = require('moment');
const csvtojson = require('csvtojson')
const rewardsCsv = require('../../assets/info/staking-rewards-values.csv')
const {
  Apes,
  Account_Transaction, 
  Character_Transaction, 
  Currency,
  sequelize,
} = require('../../models/index');
const { Op } = require("sequelize");
const getOrCreateAccountIfNeeded = require('../../utils/accounts/get-or-create-account-if-needed');
const { TRANSACTION_STAKE } = require('../../static/transaction-types');

module.exports = {
  async reward(req, res) {
    const rewardsJson = await csvtojson().fromString(rewardsCsv)
    let firstResponse = await axios.get(
        `https://api.cac.d1v.io/extra/staking`);

    let  {total} = firstResponse.data;

    let mecca_call = async function (offset, limit, result) {
      if(total === 0 ){
        return result;
      }
      let meccaResponse = await axios.get(
          `https://api.cac.d1v.io/extra/staking?skip=${offset}&limit=${limit}`);
      let {data}  = meccaResponse.data
      result = result.concat(data)
      if (result.length === total) {
        return result
      }
      return mecca_call(result.length,limit,result)
    }

    let result = await mecca_call(0,total,[])


    let minted_addresses = minted.map((minted_Ape) => {
      return minted_Ape.address
    });
    let characters = await Apes.findAll({
      where: {
        address: {
          [Op.in]: minted_addresses
        }
      }, attributes: ['id','address', 'tier', 'owner']
    });

    const currencies = await Currency.findAll()
    const gold = currencies.find(currency => currency.name === 'Gold')
    const experience = currencies.find(currency => currency.name === 'Experience')

    const stakingTransactions = await Character_Transaction.findAll({
      where: sequelize.where(
        sequelize.fn('JSON_EXTRACT', 
          sequelize.col('source_of_transaction'), 
          sequelize.literal(`'$.type'`)
        ),
        TRANSACTION_STAKE
      )
    })
    const now = new Date()
    let filteredResult  = result.filter( ( item ) => minted_addresses.includes( item.mint ) )
    .filter((item) => characters.some(c=> c.address ===item.mint))
    .map(token => {
      let stateDate = moment.unix(token.stake).utc();
      let now = new moment().utc();
      let daysStaked = now.diff(stateDate, 'days')+1
      let character = characters.find(c => c.address === token.mint);
      let character_tier = character?.tier;
      let tier_rewards = rewardsJson.filter(r => (parseInt(r.tier)===character_tier));


      let dailyRewards  = function(token,tier_rewards,daysStaked){
        let experience = 0;
        let gold = 0;

        // Experience rewards
        if (daysStaked > 30) {
          experience = tier_rewards.find(
              r => (parseInt(r.days_from) === 31)).experience
        } else {
          experience = tier_rewards.find(
              r => (daysStaked >= parseInt(r.days_from) && daysStaked <= parseInt(r.days_upto)))?.experience
        }

        let goldDays=daysStaked
        if(daysStaked>30){
          goldDays =(daysStaked%30==0)? 30 : (goldDays -= 30 * (~~(daysStaked / 30)));
        }
        if(goldDays===7 || goldDays===14 || goldDays===30) {
          gold = tier_rewards.find(
              r => (parseInt(r.days_upto) == goldDays))?.gold
        }

        return {
          mint:token.mint,
          owner:token.owner,
          stake:daysStaked,
          experience:experience||0,
          gold:gold||0

        }
      }

      let accumulatedRewards = function(token,tier_rewards,daysStaked) {
        let allocated_reward;
        let experience = 0;
        let gold =0;
        let goldDays = 0;
        for (let i = 1; i <= daysStaked; i++) {
          goldDays += 1;
          if (i > 30) {
            allocated_reward = tier_rewards.find(
                r => (parseInt(r.days_from) === 31))
          } else {
            allocated_reward = tier_rewards.find(
                r => (i >= parseInt(r.days_from) && i <= parseInt(r.days_upto)))
          }

          experience += parseInt(allocated_reward?.experience);
          if (goldDays === 7 || goldDays === 14 || goldDays === 30) {
            let gold_reward = tier_rewards.find(
                r => (goldDays >= parseInt(r.days_from) && goldDays <= parseInt(
                    r.days_upto)))
            gold += parseInt(gold_reward?.gold)
          }

          if (goldDays === 30) {
            goldDays = 0;
          }
        }
        return {
          mint:token.mint,
          owner:token.owner,
          stake:daysStaked,
          experience:experience||0,
          gold:gold||0

        }
      }

      const first = !(stakingTransactions.find(trx => trx.character_id === character?.id))

      if(first){
        return accumulatedRewards(token,tier_rewards,daysStaked)
      } else {
        return dailyRewards(token,tier_rewards,daysStaked)
      }
    });

    const transactions = await Promise.all(
      filteredResult.map(async stakeResult => {
        const character = characters.find(character => character.address === stakeResult.mint)

        if (!character) {
          return false
        }

        const account = await getOrCreateAccountIfNeeded({ address: character.owner })

        const goldTransaction = {
          account_id: account.id,
          currency_id: gold.id,
          amount: stakeResult.gold,
          transaction_date: now,
          source_of_transaction: {
            type: TRANSACTION_STAKE,
            character_id: character.id,
            account_id: account.id,
          },
          audit_fields: {
            transaction_date: now,
            currency_name: gold.name,
            amount: stakeResult.gold,
            stake_days: stakeResult.stake,
            tier: character.tier,
          },
          is_settlement: false,
        }

        const experienceUpdate = {
          id: character.id,
          experience: character.experience + stakeResult.experience          
        }

        return {
          goldTransaction,
          experienceUpdate
        }
      })
    )

    const goldTransactions = await Account_Transaction.bulkCreate(
      transactions.map(trx => trx.goldTransaction)
    )

    const updatedApes = await Apes.bulkCreate(
      transactions.map(trx => trx.experienceUpdate), {
        updateOnDuplicate: ['experience']
      }
    )
    

    res.status(200).send({
      staked: filteredResult

    });
  }
}