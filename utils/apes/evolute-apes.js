const { Account_Transaction,Character_Transaction, Currency, Resource_Inventory } = require('../../models/index');
const tierRecipes = require('../../assets/info/tier-recipes.json');
const { TRANSACTION_TIER_UP, TRANSACTION_USE_EXPERIENCE_ITEM_OVERFLOW, TRANSACTION_REPAIR_ITEM} = require('../../static/transaction-types');
const {getAllCharacterBalanceByCharacter_Currency} =  require('../currencies/get-character-currrencies-by-account');
const adjustLevelsForApesByExperiences = require('../levels/adjust-levels-for-apes-by-experiences');

const evoluteApe = async ({
  ape,
  account,
  resources,
  redis,
  transaction
}) => {
  if (!ape) return false;
  const tierRecipe = (tierRecipes || []).find(recipe => recipe.tier === ((ape.tier || 0) + 1))
  const currencies = await Currency.findAll({ transaction })
  const resourceInventories = (account.Apes || []).map(accountApe => accountApe.Resource_Inventories || []).flat()
  const now = new Date();

  let currency_balances_character = await Promise.all(tierRecipe.materials.filter(r => r.type==='Currency'  && r.belongs_to == "Character").map(async tr => {
      let currency = currencies.find(c => c.name.toLowerCase() === tr.name.toLowerCase())
      let char_balances = await getAllCharacterBalanceByCharacter_Currency(account.address, currency.id, transaction);
      return {
          currency: tr.name,
          character_balances: char_balances
      }
  }));



  //materials


  await Promise.all(tierRecipe.materials.map(async material => {
    if (material.type === 'Currency') {
        const currency = currencies.find(currency => currency.name === material.name)
        let evoluteTransaction;
        if (currency.belongs_to === 'Account') {
            console.log("processing Account Transactions")
            evoluteTransaction = await Account_Transaction.create(
                {
                    account_id: account.id,
                    currency_id: currency.id,
                    amount: -material.amount,
                    transaction_date: now,
                    source_of_transaction: {
                        type: TRANSACTION_TIER_UP,
                        character_id: ape.id,
                        account_id: account.id,
                        tier: ape.tier,
                    },
                    audit_fields: {
                        transaction_date: now,
                        currency_name: currency.name,
                        amount: -material.amount,
                        tier: ape.tier,
                        target_tier: ape.tier + 1
                    },
                    is_settlement: false,
                },
                {transaction}
            )

        } else {
            console.log("processing Character Transactions")
            let characterBalance = currency_balances_character.find(cbc => cbc.currency.toLowerCase() === currency.name.toLowerCase())
                .character_balances.filter(c => c.amount>0)
            if (characterBalance) {
                let depletedAmount = material.amount;
                let char_transactions = []
                let index = 0;
                while (index < characterBalance.length && depletedAmount > 0) {
                    let character = characterBalance[index];
                    let reduction = character.amount > depletedAmount ?  -depletedAmount : -character.amount
                    let char_trans = {
                        character_id: ape.id,
                        currency_id: currency.id,
                        amount: reduction,
                        transaction_date: now,
                        source_of_transaction: {
                            type: TRANSACTION_TIER_UP,
                            character_id: ape.id,
                            account_id: account.id,
                            tier: ape.tier,
                        },
                        audit_fields: {
                            transaction_date: now,
                            currency_name: currency.name,
                            amount: reduction,
                            tier: ape.tier,
                            target_tier: ape.tier + 1
                        },
                        is_settlement: false,
                    }
                    depletedAmount -= character.amount;
                    char_transactions.push(char_trans)
                }

                evoluteTransaction = await Character_Transaction.bulkCreate(char_transactions, {transaction: transaction})
            }


        }
        return evoluteTransaction


    } else if (material.type === 'Resource') {
      const resource = (resources || []).find(resource => resource.name === material.name)
      const invs = resourceInventories.filter(rinv => rinv.resource_id === resource.id)

      let remaingInvCount = material.amount
      let index = 0
      const updatingInvs = []
      while (index < invs.length && remaingInvCount > 0) {
        const inv = invs[index]
        updatingInvs.push({
          id: inv.id,
          resource_quantity: remaingInvCount > inv.resource_quantity ? 0 : inv.resource_quantity - remaingInvCount
        })
        remaingInvCount -= inv.resource_quantity
        index ++
      }

      const updatedInventories = await Resource_Inventory.bulkCreate(updatingInvs, { transaction, updateOnDuplicate: ['resource_quantity'] })

      return updatedInventories
    } else {
      return true
    }
  }))

  //evolute
  ape.set({ tier: ape.tier + 1 })
  await ape.save({ transaction })

  const adjustedApes = await adjustLevelsForApesByExperiences({
    apes: [ape],
    transaction,
    redis,
  })

  return adjustedApes[0]
}

module.exports = evoluteApe;