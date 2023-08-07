const { Op } = require('sequelize');

const {
  sequelize,
} = require('../../models/index');


module.exports = {
    async getAccountCharacterBalanceByAllCurrencies  (wallet, transaction)  {
        console.log(`Getting currencies for apes from DB`)
        let query = `select c.id as currency, c.name as name, sum(amount) as amount from Character_Transactions ct 
        inner join Apes a on ct.character_id = a.id 
        inner join Currencies c on ct.currency_id = c.id 
        where a.owner = '${wallet}'
        and c.is_active IS TRUE
        group by currency, name`
        let currencies = await  sequelize.query(query
            ,{ type: sequelize.QueryTypes.SELECT, transaction:transaction})
        console.log(`Got currencies from DB`)
        return currencies
    },
    async getAccountCharacterBalanceByCurrency(wallet, currency_id,transaction)  {
        let query = `select c.id as currency, c.name as name, sum(amount) as amount from Character_Transactions ct 
        inner join Apes a on ct.character_id = a.id 
        inner join Currencies c on ct.currency_id = c.id 
        where a.owner = :owner
        and c.id=:currency_id
        group by currency, name`
        let currencies = await  sequelize.query(query
            ,{ replacements: {'owner': wallet,'currency_id':currency_id}, type: sequelize.QueryTypes.SELECT, transaction:transaction})

        return currencies
    },

    async getAllCharacterBalanceByCharacter_Currency(wallet,currency_id,transaction)  {
        let query = `select a.id as ape_id, c.id as currency, c.name as name, sum(amount) as amount from Character_Transactions ct 
        inner join Apes a on ct.character_id = a.id 
        inner join Currencies c on ct.currency_id = c.id 
        where a.owner = :owner
        and c.id=:currency_id
        group by ape_id, currency, name`
        let currencies = await  sequelize.query(query
            ,{ replacements:{'owner':wallet,'currency_id':currency_id},type: sequelize.QueryTypes.SELECT, transaction:transaction
                } )
        return currencies
    }

}
