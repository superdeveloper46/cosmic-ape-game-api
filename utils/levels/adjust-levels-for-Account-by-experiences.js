const { 
  Accounts,
} = require('../../models/index');

const fetchAccountLevels = require('../info/fetch-account-levels')

const adjustLevelsForAccountByExperiences = async ({
  account,
  redis,
  transaction,
}) => {

  const account_levels = await fetchAccountLevels({
    redis,
  })
  let account_experience = account.experience;
  let account_level = account_levels.find(level => account_experience >= parseInt(level.experience_low)  && account_experience <= parseInt(level.experience_high));

  if(account_level) {
    account.set({
      level: account_level.level
    })
  }
    await account.save({transaction: transaction})


}

module.exports = adjustLevelsForAccountByExperiences