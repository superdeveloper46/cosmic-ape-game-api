const {
    Apes,
    Account_Transaction,
    Character_Transaction,
    Currency,
    Inventory,
    Resource,
    Resource_Inventory,
    Items,
    Effect,
    sequelize
} = require('../../models/index');
const {Op} = require("sequelize");
const Redis = require("ioredis");
const limit_break_csv = require("../../assets/info/limit_break.csv");
const csvtojson = require("csvtojson");
const {INVENTORY_SLOTS} = require("../../utils/consts");
const csv = require("csvtojson");
const {resources} = require("./resources");

const getOrCreateAccountIfNeeded = require("../../utils/accounts/get-or-create-account-if-needed");

const getCurrenciesByAccounts = require("../../utils/currencies/get-currencies-by-accounts");
const {TRANSACTION_LIMIT_BREAK, TRANSACTION_TIER_UP} = require("../../static/transaction-types");
const {getAccountCharacterBalanceByCurrency, getAccountCharacterBalanceByAllCurrencies,
    getAllCharacterBalanceByCharacter_Currency
} = require("../../utils/currencies/get-character-currrencies-by-account");
const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host

});

module.exports = {

    async limitBreakRecipes(){
        const search_term = "limit_break_recipes";
        let limit_break_groups = JSON.parse(await redis.get(search_term))

        if(!limit_break_groups){
            console.log("cache not hit");
            const currencies =  JSON.parse(JSON.stringify(await  Currency.findAll({attributes: ['id', 'name','belongs_to']})));
            const resources = JSON.parse(JSON.stringify( await  Resource.findAll({
                where: {
                    is_active: true
                },
            })));
            const effects = JSON.parse(JSON.stringify(await Effect.findAll({
                where: {
                    is_active: true
                }
            })));
            const items = JSON.parse(JSON.stringify(await Items.findAll({
                where: {
                    is_active: true
                }
            })));

            const limit_break_recipe_json =  await csvtojson().fromString(limit_break_csv)
            let csvkeys;

            limit_break_groups =  await  Promise.all(limit_break_recipe_json.map(async lb => {
                let out_lb = {
                    Currencies: [],
                    Resources: [],

                }
                if (!csvkeys) {
                    csvkeys = Object.keys(lb)
                }
                await csvkeys.forEach(k => {
                    if (k.startsWith("Currency_")) {
                        let new_val = k.substring(k.lastIndexOf("Currency_") + "Currency_".length)

                        let obj = {
                            Cost: currencies.find(c => c.name.toLowerCase() === new_val.toLowerCase()) || `${new_val} not available`,
                            amount: lb[k]
                        }
                        out_lb.Currencies.push(obj)

                    } else if (k.startsWith("Resource_")) {
                        let new_val = k.substring(k.lastIndexOf("Resource_") + "Resource_".length)
                        let obj = {
                            Cost: resources.filter(r => !!r.name && r.name.toLowerCase() === new_val.toLowerCase())[0] || `${new_val} not available`,
                            amount: lb[k]
                        }
                        out_lb.Resources.push(obj)
                    } else {
                        out_lb[k] = lb[k]
                    }
                })
                let new_effects = effects.filter(ef => parseInt(ef.tier) === parseInt(lb.Tier) && parseInt(ef.star) === parseInt(lb.Star))
                out_lb['Effects'] = new_effects || []

                let item_group = items.filter(it => it.category.toLowerCase() === lb.Category.toLowerCase() && parseInt(it.tier) === parseInt(lb.Tier) && parseInt(it.star) === parseInt(lb.Star))
                out_lb['Item'] = item_group[0] || {}

                return out_lb;
            }));

            redis.set(search_term, JSON.stringify(limit_break_groups));
        }
        return limit_break_groups;
    },
    async getLimitBreakRecipes(req,res){

        const limit_break_groups = await module.exports.limitBreakRecipes();

        return res.json(limit_break_groups)

    },

    async limitBreak(req,res){
        const {
            limitBreak_id,
            wallet
        } = req.body;

        if (!limitBreak_id) {
            return res.status(400).json({
                msg: "Invalid Limit Break Item"
            })
        }

        if (!wallet) {
            return res.status(400).json({
                msg: "Connect wallet to limit break items"
            })
        }
        const searchTerm = `Account_${wallet}`
        await redis.del(searchTerm)
        try {
            let inventories_depleted = []
            let accountTransactions;
            let characterTransactions;
            let limit_break_inventory;
            await sequelize.transaction(async (t) => {
                const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction: t })
                const limit_break_groups = await module.exports.limitBreakRecipes();
                limit_break_inventory = await Inventory.findOne({

                    include: [{
                        model: Apes,
                        where:{
                            owner:{
                                [Op.eq]:wallet
                            }
                        }
                    },
                        {
                            model: Items,
                            where:{
                                is_active:true
                            }
                        },
                        {
                            model: Effect,
                            where:{
                                is_active:true
                            }
                        }],
                    where: {
                        id: limitBreak_id,
                    },

                }, { transaction: t });


                if(!limit_break_inventory){
                    throw new Error(`Inventory with id ${limitBreak_id} does not exist for wallet ${wallet}`)
                }

                let item_tier = limit_break_inventory.Item.tier
                let item_category = limit_break_inventory.Item.category
                let item_star = limit_break_inventory.Item.star

                let groups = limit_break_groups.filter(lbg => parseInt(lbg.Tier)===parseInt(item_tier+1) && parseInt(item_star) === parseInt(lbg.Star) &&  item_category.toLowerCase() === lbg.Category.toLowerCase())
                if(!groups || groups.length !== 1){
                    throw  new Error(`Incorrect number of Limit Break recipes found [${groups} ]for Tier ${item_tier} category ${item_category} ad star ${item_star}`)
                }
                let limit_break_group = groups[0]
                let cost_resource_ids = limit_break_group.Resources.filter(c => !!c.Cost.id && c.amount>0).map(c => c.Cost.id)

                let account_resource_inventories = await Resource_Inventory.findAll({
                    where:{
                        resource_quantity: {
                            [Op.gt]: 0
                        }
                    },
                    include: [
                        {
                            model: Apes,
                            where:{
                                owner:{
                                    [Op.eq]:wallet
                                }
                            }
                        },
                        {
                            model: Resource,
                            where:{
                                id:{
                                    [Op.in]:cost_resource_ids
                                }
                            }
                        }],

                    transaction:t
                });

                const accountCurrencies = await getCurrenciesByAccounts({ accounts: [ account ], transaction: t })
                const characterAccountCurrency_Balance  = await getAccountCharacterBalanceByAllCurrencies(account.address,t)
                let allCurrencies  = await Currency.findAll({transaction:t})
                limit_break_group.Currencies.every(c => {

                    let currencyId = parseInt(c.Cost.id);
                    if(!currencyId){
                        return false
                    }
                    let curr =  allCurrencies.find(c => c.id === currencyId);
                    let amount;
                    if(curr.belongs_to === "Account") {
                         amount = accountCurrencies.find(accountCurrency => accountCurrency.currency_id === currencyId)?.amount || 0;
                    } else {
                        amount  = characterAccountCurrency_Balance.find(charCurrency => charCurrency.currency === currencyId)?.amount ||0
                    }
                    if (!amount) {
                        throw new Error(`Not enough ${c.Cost.name} to limit break this item`)
                    } else if (amount < parseFloat(c.amount)) {
                        throw new Error(`Not enough ${c.Cost.name} to limit break this item`)
                    }
                    return true;
                })

                await limit_break_group.Resources.filter(c => !!c.Cost.id && c.amount>0).forEach(r => {
                    let resourceId = parseInt(r.Cost.id);
                    let resource_available = account_resource_inventories.filter(ri => ri.Resource.id === resourceId)
                        .map(ri => ri.resource_quantity)
                        .reduce((p,c) => p+c, 0)
                    if(resource_available < r.amount){
                        throw new Error(`Some of the Resources are not available ${r.Cost.name} you have ${resource_available} and you need ${r.amount}`)
                    }
                })

                await limit_break_group.Resources.filter(c => !!c.Cost.id && c.amount>0).forEach(r => {
                    let resourceId = parseInt(r.Cost.id);
                    let amount = r.amount;
                    let resources_available = account_resource_inventories.filter(ri => ri.Resource.id === resourceId && ri.resource_quantity >0);

                    //This will iterate through the resource inventories and reduce each inventory until the amount is reduced to 0

                    for(const ri of resources_available){
                        if ((amount - ri.resource_quantity) > 0) {
                            amount -= ri.resource_quantity
                            ri.set({
                                resource_quantity: 0
                            })
                            inventories_depleted.push(ri)

                        } else {
                            amount=0;
                            ri.set({
                                resource_quantity: ri.resource_quantity-amount
                            })
                            inventories_depleted.push(ri)
                            break;  // this will break out of the loop the moment we have depleted the resources required for limit break
                        }
                    }
                    if(amount>0){
                        throw new Error(`Some of the Resources are not available ${r.Cost.name} you still need  ${r.amount}`)
                    }

                })

                for (const ri of inventories_depleted) {
                    await ri.save({transaction:t})
                }

                const now = new Date();
                let char_transactions = []
                await Promise.all(limit_break_group.Currencies.filter(c => !!c.Cost.id).filter(c =>c.Cost.belongs_to === "Character")
                    .map(async c => {
                        let charCurrBalances = await getAllCharacterBalanceByCharacter_Currency(account.address, c.Cost.id, t)
                        let depletedAmount = c.amount;
                        let index = 0;

                        charCurrBalances = charCurrBalances.filter(c => c.amount > 0)
                        while (index < charCurrBalances.length && depletedAmount > 0) {

                            let character = charCurrBalances[index];
                            let reduction = character.amount > depletedAmount ? -depletedAmount: -character.amount
                            let char_trans = {
                                character_id: character.ape_id,
                                currency_id: c.Cost.id,
                                amount: reduction,
                                transaction_date: now,
                                source_of_transaction: {
                                    type: TRANSACTION_LIMIT_BREAK,
                                    limit_break_id: limit_break_inventory.id,
                                    account_id: character.ape_id,
                                },
                                audit_fields: {
                                    transaction_date: now,
                                    currency_name: c.Cost.name,
                                    amount: -c.amount,
                                },
                                is_settlement: false,
                            }
                            depletedAmount -= character.amount;
                            char_transactions.push(char_trans)

                        }
                        if(depletedAmount >0){
                            throw new Error("Something is wrong failed to deplete costs")
                        }
                    }));
                characterTransactions = await Character_Transaction.bulkCreate(char_transactions,{transaction:t})

                accountTransactions = await Account_Transaction.bulkCreate(
                    limit_break_group.Currencies.filter(c => !!c.Cost.id).filter(c =>c.belongs_to="Account")
                        .map(c => ({
                            account_id: account.id,
                            currency_id: c.Cost.id,
                            amount: -c.amount,
                            transaction_date: now,
                            source_of_transaction: {
                                type: TRANSACTION_LIMIT_BREAK,
                                limit_break_id: limit_break_inventory.id,
                                account_id: account.id,
                            },
                            audit_fields: {
                                transaction_date: now,
                                currency_name: c.Cost.name,
                                amount: -c.amount,
                            },
                            is_settlement: false,
                        })),
                    {
                        transaction: t
                    }
                );
                console.log('Account Transactions are bulk-created to play missions', accountTransactions)

                let effect =limit_break_group.Effects.find(e => e.type.toLowerCase() ===limit_break_inventory.Effect.type)

                limit_break_inventory.set({
                    item_id: parseInt(limit_break_group.Item.id),
                    effect_id: parseInt(effect.id),
                    efficiency:parseInt(limit_break_group.Item.efficiency)
                });

                await limit_break_inventory.save({transaction:t})
            });



            return res.status(200).json({
                wallet:wallet,
                currency_transactions:accountTransactions,
                resources_used: inventories_depleted,
                updated_inventory:limit_break_inventory
            })

        }catch(err){
            console.log(err)
            res.status(400).json({msg:err.message})
        }


    }
}