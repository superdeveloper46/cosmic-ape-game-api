const getCurrenciesByAccounts = require('../currencies/get-currencies-by-accounts');
const {  Currency } = require('../../models/index');
const checkFinalTier = require('../tier/check-final-tier');
const {getAccountCharacterBalanceByAllCurrencies} =  require('../currencies/get-character-currrencies-by-account');
const tierRecipes = require('../../assets/info/tier-recipes.json');

const checkEvolution = async ({
  ape,
  account,
  resources,
  transaction,
}) => {
  if (!ape) return 'No Ape'
  const tier = ape.Tier || await ape.getTier({ transaction })

  if (ape.level !== tier.max_level) {
    return 'This ape is not reached to max level for current tier'
  }

  if (await checkFinalTier({ tier, transaction })) {
    return 'This ape is already reached to max tier'
  }

  const tierRecipe = (tierRecipes || []).find(recipe => recipe.tier === ((ape.tier || 0) + 1))
  if (!tierRecipe) {
    return false
  }

  const accountCurrencies = await getCurrenciesByAccounts({ accounts: [ account ], transaction })
  let characterCurrencies  = await getAccountCharacterBalanceByAllCurrencies(account.address,transaction)
  const resourceInventories = (account.Apes || []).map(accountApe => accountApe.Resource_Inventories || []).flat()

   let currencies = await Currency.findAll({transaction:transaction});
  
  const checkResults = tierRecipe.materials.map(material => {
    if (material.type === 'Currency') {
      let currencyType = currencies.find(curr => curr.name.toLowerCase() === material.name.toLowerCase());
      let currency;
      if(currencyType.belongs_to === 'Account') {
        currency = accountCurrencies.find(currency => currency.Currency.name === material.name)
      } else {
        currency = characterCurrencies.find(cc => cc.name===currencyType.name)
      }
      console.log(`Ascension Required: ${material.name} - ${material.amount} / ${currency?.amount || 0}`)

      return (currency?.amount || 0) >= material.amount
    } else if (material.type === 'Resource') {
      const resource = (resources || []).find(resource => resource.name === material.name)

      const invs = resourceInventories.filter(rinv => rinv.resource_id === resource.id)
      const availableQuantity = invs.map(rinv => rinv.resource_quantity).reduce((a,b) => a+b, 0)

      console.log(`Ascension Required: ${material.name} - ${material.amount} / ${availableQuantity || 0}`)

      return (availableQuantity || 0) >= material.amount
    } else {
      return true
    }
  })
  console.log(checkResults)

  if (checkResults.filter(res => !res).length > 0) {
    return 'Not enough materials to evolute for this ape'
  }

  return true
}

module.exports = checkEvolution;