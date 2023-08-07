
const { Apes, Account_Transaction, Character_Transaction, Currency, Items, Craft_Recipe, Resource, Inventory, Maps, Missions, Mission_Item_Reward, Resource_Inventory, Utility_Inventory, Utility, Item_Equipped, Default_Item_Equip,sequelize } = require('../../models/index');
const Redis = require("ioredis");
const { Op } = require('sequelize');
const checkIfApeIsInWallet = require('../../utils/nft/check-if-ape-is-in-wallet');
const { TRANSACTION_CRAFT_ITEMS, TRANSACTION_REPAIR_ITEM, TRANSACTION_SELL_ITEMS, TRANSACTION_PLAY_MISSION,
    TRANSACTION_TIER_UP
} = require('../../static/transaction-types');
const getOrCreateAccountIfNeeded = require('../../utils/accounts/get-or-create-account-if-needed');
const getCurrenciesByAccounts = require('../../utils/currencies/get-currencies-by-accounts');
const getCurrenciesByCharacters = require('../../utils/currencies/get-currencies-by-characters');
const {getAllCharacterBalanceByCharacter_Currency,getAccountCharacterBalanceByCurrency, getAccountCharacterBalanceByAllCurrencies} = require('../../utils/currencies/get-character-currrencies-by-account');

const fetchRepairCosts = require('../../utils/info/fetch-repair-costs');
const { MYSTERIOUS_KEYS_REVEAL_CHANCES } = require('../../static/mysterious-keys-reveal-chances');
const {Mission_Histories} = require("../../models");
const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
    
});

module.exports = {
    async items(req, res) {
        let searchTerm = "Items"
        let items
        
        try {
            console.log('Getting items from cache')
            items = await redis.get(searchTerm)
            
            if (!!items) {
                console.log(`Items retrieved from cache `)
                return res.json(JSON.parse(items));
            }
        } catch (err) {
            console.log(`Failed to get items from cache - ${err}`)
        }
        
        try {
            console.log('Getting items from DB')
            
            items = await Items.findAll();
            
            console.log(`Got items from DB && set to Cache `)
            redis.set(searchTerm, JSON.stringify(items), "EX", 600);
            
            return res.json(items)
        } catch (err) {
            console.log(`Failed to get items ${err}`)
            
            return res.status(500).json({
                msg: "Something went wrong."
            })
        }
    },
    
    async craftRecipes(req, res) {
        let searchTerm = "CraftRecipes"
        let craftRecipes
        
        try {
            console.log('Getting craft recipes from cache')
            craftRecipes = await redis.get(searchTerm)
            
            if (!!craftRecipes) {
                return res.json(JSON.parse(craftRecipes));
            }
        } catch (err) {
            console.log(`Failed to get craftRecipes from cache - ${err}`)
        }
        
        try {
                console.log('Getting craftRecipes from DB')
            
            craftRecipes = await Items.findAll({
                include: [{
                    model: Craft_Recipe,
                    as: 'recipes',
                    required: false,
                    where: {
                        is_active: true,
                    },
                    include: [{
                        model: Items,
                        include: {
                            model: Mission_Item_Reward,
                            include: [{
                                model: Missions,
                                where: {
                                    is_active: true,
                                },
                                include: Maps
                            }]
                        },
                    }, {
                        model: Resource,
                    }, {
                        model: Currency,
                    }, {
                        model: Items,
                        as: 'craftable'
                    }]
                }, {
                    model: Mission_Item_Reward,
                    include: [{
                        model: Missions,
                        where: {
                            is_active: true,
                        },
                        include: Maps
                    }],

                }],
                where:{
                    is_active: true
                }
            });
            craftRecipes = craftRecipes
            .filter(recipe => (recipe.recipes || []).length > 0)
            .map(recipe => ({
                ...(recipe.dataValues || {}),
                recipes: (recipe.recipes || []).map(r => ({
                    ...(r.dataValues || {}),
                    ingredient: (
                        r.ingredient_type === 'resource' 
                        ? r.Resource 
                        : r.ingredient_type === 'currency' 
                        ? r.Currency 
                        : r.Item
                    )
                }))
            }))
            

            redis.set(searchTerm, JSON.stringify(craftRecipes));
            
            return res.json(craftRecipes)
        } catch (err) {
            console.log(`Failed to get craftRecipes ${err}`)
            
            return res.status(500).json({
                msg: "Something went wrong."
            })
        }
    },
    
    async craft(req, res) {
        const {
            main_ingredient_id,
            craftable_id,
            ingredient_ids,
            ingredient_currency_ids,
            wallet,
            address,
        } = req.body;
        
        if (!address) {
            return res.status(400).json({
                msg: "Invalid Ape"
            })
        }
        
        if (!main_ingredient_id) {
            return res.status(400).json({
                msg: "Invalid Ingredient Item"
            })
        }
        
        if (!craftable_id) {
            return res.status(400).json({
                msg: "Invalid Limit Break Item"
            })
        }
        
        if (!wallet) {
            return res.status(400).json({
                msg: "Connect wallet to limit break items"
            })
        }
        
        if (!await checkIfApeIsInWallet({
            address,
            wallet,
        })) {
            console.log(`Limit Break - This ape can not be detected in this wallet`);
            return res.status(200).json({
                msg: "This ape can not be detected in this wallet"
            })
        }
        
        try {
            await sequelize.transaction(async (t) => {
                const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction: t })
                const ape = await Apes.findOne({
                    where: {
                        address,
                    }
                })
                var inventory = await Inventory.findOne({
                    where: {
                        item_id: main_ingredient_id,
                    }
                }, { transaction: t });
                if (!inventory) {
                    throw new Error(`No main ingredient to limit break this item - ingredient id(${main_ingredient_id})`)
                }

                const now = new Date()
                
                inventory.item_id = craftable_id;
                inventory.item_durability = 1;
                
                try {
                    console.log(`address=${address} - Limit Break Item ${JSON.stringify(inventory)}`);
                    await inventory.save({ transaction: t });
                } catch (err) {
                    console.log(err)
                    throw new Error(`Failed to limit break item ${craftable_id} for ${address} - ${err}`)
                }

                const ingredients = await Craft_Recipe.findAll({
                    where: {
                        id: {
                            [Op.in]: ingredient_ids || []
                        }
                    },
                    include: Resource
                })
                
                redis.del(`Ape_${ape.address}`)
                redis.del(`Account_${wallet}`)
                
                for (let i = 0 ; i < ingredients.length ; i ++) {                    
                    var resource_inventory = await Resource_Inventory.findOne({
                        where: {
                            ape_id: ape.id,
                            resource_id: ingredients[i].Resource.id
                        }
                    }, { transaction: t });

                    if (!resource_inventory) {
                        throw new Error(`Not enough resource to limit break this item - ${ingredients[i]}`)
                    }
                    
                    try {
                        resource_inventory.resource_quantity -= ingredients[i].ingredient_quantity;
                        if (resource_inventory.resource_quantity < 0) {
                            throw new Error(`Not enough resource to limit break this item - ${ingredients[i]}`)
                        }
                        await resource_inventory.save({ transaction: t });
                    } catch (err) {
                        console.log(err)
                        throw new Error(`Failed to limit break item ${craftable_id} for ${address} - ${err}`)
                    }
                }

                const currencyIngredients = await Craft_Recipe.findAll({
                    where: {
                        id: {
                            [Op.in]: ingredient_currency_ids || []
                        }
                    },
                    include: Currency
                })

                console.log('checking if currencies are enough')
                const accountCurrencies = await getCurrenciesByAccounts({ accounts: [ account ], transaction: t })
                const characterCurrencies = await getCurrenciesByCharacters({ apes: [ ape ], transaction: t })
                currencyIngredients.forEach(ingredient => {
                    if (ingredient.ingredient_type !== 'currency' || !ingredient.Currency) {
                        throw new Error(`Failed to limit break item ${craftable_id} for ${address} - ${err}`)
                    }
                    const amount = (
                        ingredient.Currency.belongs_to === 'Account' 
                        ? accountCurrencies.find(accountCurrency => accountCurrency.currency_id === ingredient.ingredient_id)?.amount || 0
                        : ingredient.Currency.belongs_to === 'Character' 
                        ? characterCurrencies.find(characterCurrency => characterCurrency.currency_id === ingredient.ingredient_id)?.amount || 0
                        : 0
                    )

                    if (!amount && !!ingredient.ingredient_quantity) {
                        throw new Error(`Not enough ${ingredient.Currency.name} to limit break this item`)
                    } else if (amount < ingredient.ingredient_quantity) {
                        throw new Error(`Not enough ${ingredient.Currency.name} to limit break this item`)
                    }
                })

                //account currency transactions
                const accountTransactions = await Account_Transaction.bulkCreate(
                    currencyIngredients
                    .filter(ingredient => ingredient.ingredient_type === 'currency' && ingredient.Currency?.belongs_to === 'Account')
                    .map(ingredient => ({
                        account_id: account.id,
                        currency_id: ingredient.ingredient_id,
                        amount: -ingredient.ingredient_quantity,
                        transaction_date: now,
                        source_of_transaction: {
                            type: TRANSACTION_CRAFT_ITEMS,
                            craft_recipe_id: ingredient.id,
                            character_id: ape.id,
                            account_id: account.id,
                        },
                        audit_fields: {
                            transaction_date: now,
                            currency_name: ingredient.Currency.name,
                            amount: -ingredient.ingredient_quantity,
                        },
                        is_settlement: false,
                    })),
                    {
                        transaction: t
                    }
                )
                //account currency transactions
                const characterTransactions = await Character_Transaction.bulkCreate(
                    currencyIngredients
                    .filter(ingredient => ingredient.ingredient_type === 'currency' && ingredient.Currency?.belongs_to === 'Character')
                    .map(ingredient => ({
                        character_id: ape.id,
                        currency_id: ingredient.ingredient_id,
                        amount: -ingredient.ingredient_quantity,
                        transaction_date: now,
                        source_of_transaction: {
                            type: TRANSACTION_CRAFT_ITEMS,
                            craft_recipe_id: ingredient.id,
                            character_id: ape.id,
                            account_id: account.id,
                        },
                        audit_fields: {
                            transaction_date: now,
                            currency_name: ingredient.Currency.name,
                            amount: -ingredient.ingredient_quantity,
                        },
                        is_settlement: false,
                    })),
                    {
                        transaction: t
                    }
                )
                
                return res.status(200).json({
                    ape,
                    accountTransactions,
                    characterTransactions
                })
            })
        } catch(err) {
            console.log(err);
            if (err.message.includes('Not enough resource to limit break this item')) {
                return res.status(400).json({
                    msg: 'Not enough resource to limit break this item'
                })
            } else if (err.message.includes('No main ingredient to limit break this item')) {
                return res.status(400).json({
                    msg: 'No main ingredient to limit break this item'
                })
            } else {
                res.status(400).json({
                    msg: `Failed to limit break item - ${err.message}`
                })
            }
        }
    },
    
    async forge(req, res) {
        const {
            inventoryId,
            materials,
            wallet,
            address,
        } = req.body;
        
        if (!address) {
            return res.status(400).json({
                msg: "Invalid Ape Address"
            })
        }
        
        if (!inventoryId || !materials || (materials || []).length === 0) {
            return res.status(400).json({
                msg: "Invalid Inventory or Materials"
            })
        }
        
        if (!wallet) {
            return res.status(400).json({
                msg: "Connect wallet to forge items"
            })
        }
        
        if (!await checkIfApeIsInWallet({
            address,
            wallet,
        })) {
            console.log(`Forge - This ape can not be detected in this wallet`);
            return res.status(200).json({
                msg: "This ape can not be detected in this wallet"
            })
        }
        
        try {
            await sequelize.transaction(async (transaction) => {
                const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction })
                const ape = await Apes.findOne({
                    where: {
                        address,
                    }
                }, { transaction })
                const inventory = await Inventory.findOne({
                    where: {
                        id: inventoryId,     
                        item_durability: {
                            [Op.gt]: 0
                        }
                    },
                    include: Items
                }, { transaction });

                if (!inventory) {
                    throw new Error(`No inventory to be forged - inventory id(${inventoryId})`)
                } else if (inventory.ape_id !== ape.id) {
                    throw new Error(`This inventory is not allocated to the current ape - inventory id(${inventoryId}), ape id(${ape.id})`)
                }
                const invMaterialIds = (materials || []).filter(material => material.type === 'item').map(material => material.id)
                const invMaterials = await Inventory.findAll({
                    where: {
                        id: {
                            [Op.in]: invMaterialIds
                        },     
                        item_durability: {
                            [Op.gt]: 0
                        },
                        ape_id: ape.id
                    },
                    include: Items
                }, { transaction });

                if (!invMaterialIds.length > invMaterials.length) {
                    throw new Error(`Not enough materials to be used for forging - material ids(${invMaterialIds})`)
                }

                const now = new Date()
                
                try {
                    inventory.set({
                        experience: Math.min(
                            inventory.Item?.experience || 0,
                            invMaterials.map(material => material.Item?.gxp || 0).reduce((a, b) => a + b, inventory.experience || 0)
                        )
                    })
                    console.log(`address=${address} - Forge Item ${JSON.stringify(inventory)}`);
                    await inventory.save({ transaction });
                } catch (err) {
                    console.log(err)
                    throw new Error(`Failed to forge item ${inventoryId} for ${address} - ${err}`)
                }

                console.log(`Make materials' durabilities to 0`)
                
                const updatedMaterials = await Inventory.update({
                    item_durability: 0
                }, {
                    where: {
                        id: {
                            [Op.in]: invMaterials.map(material => material.id)
                        }
                    },
                    transaction
                });
                
                redis.del(`Ape_${ape.address}`)
                  
                return res.status(200).json({
                    ape,
                })
            })
        } catch(err) {
            console.log(err);
            if (err.message.includes('No inventory to be forged')) {
                return res.status(400).json({
                    msg: 'No inventory to be forged'
                })
            } else if (err.message.includes('This inventory is not allocated to the current ape')) {
                return res.status(400).json({
                    msg: 'This inventory is not allocated to the current ape'
                })
            } else if (err.message.includes('Not enough materials to be used for forging')) {
                return res.status(400).json({
                    msg: 'Not enough materials to be used for forging'
                })
            } else {
                res.status(400).json({
                    msg: `Failed to forge item - ${err.message}`
                })
            }
        }
    },
    
    async repair(req, res) {
        const {
            inventoryId,
            materials,
            efficiency,
            wallet,
        } = req.body;
        

        
        if (!inventoryId || !materials || !efficiency) {
            return res.status(400).json({
                msg: "Invalid Parameters"
            })
        }
        
        if (!wallet) {
            return res.status(400).json({
                msg: "Connect wallet to repair items"
            })
        }

        try {
            const now = new Date()
            await sequelize.transaction(async (transaction) => {

                const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction })

                const inventory = await Inventory.findOne({
                    where: {
                        id: inventoryId,
                    },
                    include: [Items,Apes],
                    transaction:transaction
                });

                if (!inventory) {
                    throw new Error(`No inventory to be repaired - inventory id(${inventoryId})`)
                }
                let address = inventory.Ape.address

                if (!await checkIfApeIsInWallet({
                    address,
                    wallet,
                })) {
                    console.log(`Repair - This ape can not be detected in this wallet`);
                    throw new Error("The ape this inventory belongs to  can not be detected in this wallet")
                }
                let efficiencyFromItems = 0
                const materialIds = (materials || []).filter(m => m.count > 0).map(material => material.id)
                if(!!materialIds && materialIds.length>0) {
                    const invMaterials = await Resource_Inventory.findAll({
                        where: {
                            resource_id: {
                                [Op.in]: materialIds
                            },
                            resource_quantity: {
                                [Op.gt]: 0
                            }
                        },
                        include: [
                            {
                                model: Resource
                            },
                            {
                                model: Apes,
                                where: {
                                    owner: wallet
                                }
                            }
                        ],
                        transaction: transaction
                    });


                    const updatedMaterialInventories = await Promise.all(
                        materials.map(async material => {
                            if (!material.count) return true

                            const invs = invMaterials.filter(inv => material.id === inv.resource_id)
                            const inv = invs[0]
                            const totalCount = invs.map(inv => inv.resource_quantity).reduce((a,b) => a+b, 0)
                            if (totalCount < material.count) {
                                throw new Error(`Not enough materials to be used for repairing - material ids(${materialIds})`)
                            }

                            const reparingEfficiency = (typeof inv.Resource.effect === 'object')
                                ? (inv.Resource.effect?.efficiency || 0)
                                : (JSON.parse(inv.Resource.effect || '{}')?.efficiency || 0)
                            efficiencyFromItems += (inventory.Item?.efficiency / 100 * reparingEfficiency * material.count)

                            console.log(`Reduce ${inv.Resource.name || ''}'s count by ${material.count}`)
                            
                            let materialCount = material.count
                            let index = 0

                            while (materialCount > 0 && index < invs.length) {
                                if (invs[index].resource_quantity > materialCount) {
                                    await invs[index].update({
                                        resource_quantity: invs[index].resource_quantity - materialCount
                                    }, {transaction})

                                    materialCount = 0
                                } else {
                                    materialCount -= invs[index].resource_quantity

                                    await invs[index].update({
                                        resource_quantity: 0
                                    }, {transaction})
                                }

                                index ++
                            }
                            
                            return true
                        })
                    )
                }

                let ascension = await Currency.findOne( {
                    where: {
                        name: 'Ascension'
                    },
                    transaction:transaction
                })
                const ascension_balance  = await getAccountCharacterBalanceByCurrency( wallet, ascension.id, transaction);

                let balance = ascension_balance.map(b => b.amount).reduce((a, c) => a + c, 0);

                const payingEfficiency = Math.max(0, efficiency - efficiencyFromItems - inventory.efficiency)
                console.log('Pay for not enough repairing efficiency', payingEfficiency)
                if (payingEfficiency > 0  && !!ascension_balance) {
                    const accountTransactions = await getCurrenciesByAccounts({
                        accounts: [account],
                        transaction:transaction,
                    })


                    const gold = accountTransactions.find(trx => trx.Currency.name === 'Gold')
                    const repairCosts = await fetchRepairCosts({ redis })
                    const cost = repairCosts.find(cost => cost.tier === (inventory.Item?.tier || 0))

                    if (!cost) {
                        throw new Error(`Not enough currencies to be used for repairing`)
                    }

                    if ((gold?.amount || 0) < cost.gold * payingEfficiency) {
                        throw new Error(`Not enough Gold to be used for repairing`)
                    }

                    let ascension_amount  = cost.ascension * payingEfficiency
                    if((balance|| 0 ) < ascension_amount){
                        throw new Error(`Not enough Ascension across the account your balance is ${ascension_balance} and you need ${ascension_amount} `)
                    }

                    let ascension_By_character = await getAllCharacterBalanceByCharacter_Currency(wallet,ascension.id,transaction)
                    ascension_By_character = ascension_By_character.filter(abc => !!abc && abc.amount>0);

                    let char_transactions = []
                    let depletedAmount = ascension_amount;
                    let index = 0;
                    while (index < ascension_By_character.length && depletedAmount > 0) {
                        let character = ascension_By_character[index];
                        let reduction = character.amount > depletedAmount ?  -depletedAmount : -character.amount
                        let char_trans = {
                            character_id: character.ape_id,
                            currency_id: ascension.id,
                            amount: reduction,
                            transaction_date: now,
                            source_of_transaction: {
                                type: TRANSACTION_REPAIR_ITEM,
                                efficiency_point: payingEfficiency,
                                cost_per_efficiency: cost.ascension,
                                character_id: character.ape_id,
                                account_id: account.id,
                            },
                            audit_fields: {
                                transaction_date: now,
                                item_tier: inventory.Item?.tier || 0,
                                efficiency_point: payingEfficiency,
                                cost_per_efficiency: cost.ascension,
                            },
                            is_settlement: false,
                        }
                        depletedAmount -= character.amount;
                        char_transactions.push(char_trans)
                    }

                    let ascensionTransactions = await Character_Transaction.bulkCreate(char_transactions,{transaction:transaction})

                    console.log(`Creating a transaction for ${ cost.gold * payingEfficiency } gold for forge`)
                    const goldTransaction = await Account_Transaction.create(
                      {
                        account_id: account.id,
                        currency_id: gold.Currency.id,
                        amount: -cost.gold * payingEfficiency,
                        transaction_date: now,
                        source_of_transaction: {
                          type: TRANSACTION_REPAIR_ITEM,
                          efficiency_point: payingEfficiency,
                          cost_per_efficiency: cost.gold,
                          account_id: account.id,
                        },
                        audit_fields: {
                          transaction_date: now,
                          item_tier: inventory.Item?.tier || 0,
                          efficiency_point: payingEfficiency,
                          cost_per_efficiency: cost.gold,
                        },
                        is_settlement: false,
                      },
                      { transaction:transaction }
                    )
                    console.log('Created a gold transaction for forge', goldTransaction)
                }

                try {
                    inventory.set({
                        efficiency: Math.min(
                            inventory.Item?.efficiency || 0,
                            efficiency
                        )
                    })
                    console.log(`address=${address} - Repair Item ${JSON.stringify(inventory)}`);
                    await inventory.save({ transaction:transaction});
                } catch (err) {
                    console.log(err)
                    throw new Error(`Failed to repair item ${inventoryId} for ${address} - ${err}`)
                }
                
                redis.del(`Ape_${address}`)
                redis.del(`Account_${wallet}`)

            })
            return res.status(200).json({
                message:`Inventory item repaired successfully`
            })
        } catch(err) {
            console.log(err);
            if (err.message?.includes('No inventory to be repaired')) {
                return res.status(400).json({
                    msg: 'No inventory to be repaired'
                })
            } else if (err?.message?.includes('This inventory is not allocated to the current ape')) {
                return res.status(400).json({
                    msg: 'This inventory is not allocated to the current ape'
                })
            } else if (err?.message?.includes('Not enough materials to be used for repairing')) {
                return res.status(400).json({
                    msg: 'Not enough materials to be used for repairing'
                })
            } else if (err?.message?.includes('Not enough currencies to be used for repairing')) {
                return res.status(400).json({
                    msg: 'Not enough currencies to be used for repairing'
                })
            } else if (err?.message?.startsWith('Not enough Ascension')) {
                return res.status(400).json({
                    msg: err.message
                })
            } else if (err?.message?.includes('Not enough Gold to be used for repairing')) {
                return res.status(400).json({
                    msg: 'Not enough Gold to be used for repairing'
                })
            } else {
                res.status(400).json({
                    msg: `Failed to repair item`
                })
            }
        }
    },
    
    async accountItems(req, res) {
        const {
            address,
            type,
            subType,
            count,
            after,
            resourceId
        } = req.query
        
        if (!address || !type || !count) {
            return res.status(400).json({
                msg: "Invalid Parameters"
            })
        }

        if (type === 'resource') {
            const query = `
                FROM Resource_Inventories AS rinv
                LEFT JOIN Resources AS resources ON rinv.resource_id = resources.id
                LEFT JOIN Apes AS apes ON rinv.ape_id = apes.id
                WHERE rinv.resource_quantity > 0
                AND apes.owner = '${address}'
                AND resources.is_active IS TRUE
                ${!!subType ? `AND resources.subcategory = '${subType}'` : ''}
                ${!!resourceId ? `AND resources.id = '${resourceId}'` : ''}
            `

            if (!!resourceId) {
                const [ countResult ] = await sequelize.query(`
                    SELECT COUNT(*) AS count
                    ${query}
                `)
                const totalCount = countResult[0]['count']

                const [ results ] = await sequelize.query(`
                    SELECT  rinv.id AS inv_id, rinv.resource_quantity AS quantity, resources.id, resources.name, resources.description, resources.icon,
                            resources.star, resources.rarity, resources.type, resources.subcategory,
                            resources.gold, resources.salvage,
                            apes.id AS ape_id, apes.address AS ape_address, apes.name AS ape_name, apes.image AS ape_image,
                            'resource' AS inv_type
                    ${query}
                    ORDER BY apes.id ASC, resources.subcategory ASC, resources.type ASC, resources.star DESC, resources.name ASC
                    LIMIT ${after || 0}, ${count}
                `)
                
                return res.json({
                    data: results,
                    metadata: {
                        type,
                        totalCount,
                        count: results.length,
                        isNextAvailable: totalCount > Number(after || 0) + results.length,
                        isBeforeAvailable: after > 0
                    }
                })
            } else {
                const [ results ] = await sequelize.query(`
                    SELECT  SUM(rinv.resource_quantity) AS quantity, resources.id, resources.name, resources.description, resources.icon,
                            resources.star, resources.rarity, resources.type, resources.subcategory,
                            resources.gold, resources.salvage,
                            'resource' AS inv_type, TRUE AS is_folder
                    ${query}
                    GROUP BY resources.id, resources.name, resources.description, resources.icon, resources.star, resources.rarity, resources.type, resources.subcategory, resources.gold, resources.salvage
                    ORDER BY resources.subcategory ASC, resources.type ASC, resources.star DESC
                `)
                
                return res.json({
                    data: results,
                    metadata: {
                        type,
                        totalCount: results.length,
                        count: results.length,
                        isNextAvailable: false,
                        isBeforeAvailable: false
                    }
                })
            }
        } else if (type === 'item') {
            try{


            const new_query=`from
                (select i.id as inv_id,i.efficiency as efficiency, i.experience as experience,itd.name,itd.image as icon, itd.manufacturer as manufacturer, itd.description as item_detail_description,
                    it.id as id, it.category as category,it.description as description,it.type as type,it.tier as tier,it.star as star,it.rarity as rarity,it.gold as gold, it.efficiency as item_efficiency, it.salvage as salvage,
                    e.type as effect_type,e.effect as effect,e.bonus as effect_bonus,e.minimum_efficiency as minimum_efficiency, round(( greatest(i.efficiency/it.efficiency ,e.minimum_efficiency)* e.bonus),2 ) as actual_bonus,  e.star as effect_star,e.tier as effect_tier,
                    a.id as ape_id,a.address as ape_address,a.name as ape_name, a.image as ape_image,die.id as equip from Inventories i
                inner join  Apes  a on i.ape_id=a.id
                inner join  Item_Detail itd  on  itd.id = i.item_detail_id
                inner join Items  it on  i.item_id=it.id
                inner join Effects e on i.effect_id=e.id
                left  join Default_Item_Equips die on i.id = die.inventory_id
            where a.owner='${address}'
            AND it.is_active IS TRUE
             ${!!subType ? `AND it.category = '${subType}'` : ''}) as default_equips
            left join
            (select i.id as inv_id,i.efficiency as efficiency, i.experience as experience,itd.name,itd.image as icon, itd.manufacturer as manufacturer, itd.description as item_detail_description,
                    it.id as id, it.category as category,it.description as description,it.type as type,it.tier as tier,it.star as star,it.rarity as rarity,it.gold as gold, it.efficiency as item_efficiency, it.salvage as salvage,
                    e.type as effect_type,e.effect as effect,e.bonus as effect_bonus,e.minimum_efficiency as minimum_efficiency, round(( greatest(i.efficiency/it.efficiency ,e.minimum_efficiency)* e.bonus),2 ) as actual_bonus,  e.star as effect_star,e.tier as effect_tier,
                    a.id as ape_id,a.address as ape_address,a.name as ape_name, a.image as ape_image, ie.id as mission_equip from Inventories i
                inner join  Apes  a on i.ape_id=a.id
                inner join  Item_Detail itd  on  itd.id = i.item_detail_id
                inner join Items  it on  i.item_id=it.id
                inner join Effects e on i.effect_id=e.id
                left join Item_Equippeds ie on i.id = ie.inventory_id
                left join  Mission_Histories mh on ie.mission_history_id = mh.id
            where a.owner='${address}'
            AND it.is_active IS TRUE
             ${!!subType ? `AND it.category = '${subType}'` : ''}
            and mh.ended_at is null) as mission_equip
                on default_equips.inv_id =mission_equip.inv_id`



            const [ countResult ] = await sequelize.query(`
                SELECT COUNT(*) AS count
                ${new_query}
            `)
            const totalCount = countResult[0]['count']

            const [ results ] = await sequelize.query(`
                SELECT  default_equips.*,mission_equip.mission_equip, 'item' as inv_type
                ${new_query}
                LIMIT ${after || 0}, ${count}
            `)
            
            return res.json({
                data: results,
                metadata: {
                    type,
                    totalCount,
                    count: results.length,
                    isNextAvailable: totalCount > Number(after || 0) + results.length,
                    isBeforeAvailable: after > 0
                }
            })
            }catch(err){
                console.log(err)
            }
        } else if (type === 'currency') {
            try {
                await sequelize.transaction(async transaction => {
                    const account = await getOrCreateAccountIfNeeded({ address, transaction })
                    const currencies = await Currency.findAll({
                        where: {
                            is_active: true
                        },
                        transaction
                    })
                    const accountCurrencies = await getCurrenciesByAccounts({ accounts: [account], transaction })
                    const accountCurrenciesFromCharacters = await getAccountCharacterBalanceByAllCurrencies(address, transaction)

                    console.log(accountCurrencies)
                    console.log(accountCurrenciesFromCharacters)
                    return res.json({
                        data: currencies.map(currency => ({
                            id: currency.id,
                            name: currency.name,
                            amount: (
                                currency.belongs_to === 'Account' 
                                ? Number(accountCurrencies.find(ac => ac.currency_id === currency.id)?.amount || 0).toFixed(1)
                                : Number(accountCurrenciesFromCharacters.find(ac => ac.currency === currency.id)?.amount || 0).toFixed(1)
                            ),
                        })),
                        metadata: {
                            type: 'currency',
                            totalCount: accountCurrencies.length + accountCurrenciesFromCharacters.length,
                            count: accountCurrencies.length + accountCurrenciesFromCharacters.length,
                            isNextAvailable: false,
                            isBeforeAvailable: false
                        }
                    })
                })
            } catch(err){
                console.log(err)
            }
        } else {
            return res.status(400).json({
                msg: 'Invalid Type Filter'
            })
        }
    },
    
    async reloadInventory(req, res) {
        const {
            inventoryId
        } = req.query
        
        if (!inventoryId) {
            return res.status(400).json({
                msg: "Invalid Parameter"
            })
        }
        try {

            const new_query=`SELECT  default_equips.*,mission_equip.mission_equip, 'item' as inv_type
                    from
                    (select i.id as inv_id,i.efficiency as efficiency, i.experience as experience,itd.name,itd.image as icon, itd.manufacturer as manufacturer, itd.description as item_detail_description,
                        it.id as id, it.category as category,it.description as description,it.type as type,it.tier as tier,it.star as star,it.rarity as rarity,it.gold as gold, it.efficiency as item_efficiency, it.salvage as salvage,
                        e.type as effect_type,e.effect as effect,e.bonus as effect_bonus,e.minimum_efficiency as minimum_efficiency,round(( greatest(i.efficiency/it.efficiency ,e.minimum_efficiency)* e.bonus),2 ) as actual_bonus,  e.star as effect_star,e.tier as effect_tier,
                        a.id as ape_id,a.address as ape_address,a.name as ape_name, a.image as ape_image,die.id as equip from Inventories i
                    inner join  Apes  a on i.ape_id=a.id
                    inner join  Item_Detail itd  on  itd.id = i.item_detail_id
                    inner join Items  it on  i.item_id=it.id
                    inner join Effects e on i.effect_id=e.id
                    left  join Default_Item_Equips die on i.id = die.inventory_id
                where i.id = :inventoryId
                    ) as default_equips
            
                left join
                (select i.id as inv_id,i.efficiency as efficiency, i.experience as experience,itd.name,itd.image as icon, itd.manufacturer as manufacturer, itd.description as item_detail_description,
                        it.id as id, it.category as category,it.description as description,it.type as type,it.tier as tier,it.star as star,it.rarity as rarity,it.gold as gold, it.efficiency as item_efficiency, it.salvage as salvage,
                        e.type as effect_type,e.effect as effect,e.bonus as effect_bonus,e.minimum_efficiency as minimum_efficiency,round(( greatest(i.efficiency/it.efficiency ,e.minimum_efficiency)* e.bonus),2 ) as actual_bonus,  e.star as effect_star,e.tier as effect_tier,
                        a.id as ape_id,a.address as ape_address,a.name as ape_name, a.image as ape_image, ie.id as mission_equip from Inventories i
                    inner join  Apes  a on i.ape_id=a.id
                    inner join  Item_Detail itd  on  itd.id = i.item_detail_id
                    inner join Items  it on  i.item_id=it.id
                    inner join Effects e on i.effect_id=e.id
                    left join Item_Equippeds ie on i.id = ie.inventory_id
                    left join  Mission_Histories mh on ie.mission_history_id = mh.id
                where i.id = :inventoryId
                AND i.effect_id IS NOT NULL AND i.name IS NOT NULL AND i.icon IS NOT NULL
                and mh.ended_at is null) as mission_equip
                    on default_equips.inv_id =mission_equip.inv_id`


            let [ results ] = await sequelize.query(new_query,
                { replacements: { inventoryId: inventoryId },type:sequelize.QueryTypes.SELECT})
            if(!results){
                throw  new Error(`Failed to load  inventory for id ${inventoryId}`)
            }
            return res.json(results)
        }catch(err){
            console.log(err)
            return res.status(400).json({
                msg: `Failed to reload inventory ${inventoryId}`
            })
        }
    },
    
    async sell(req, res) {
        const {
            address,
            inventories: inventoriesInfo
        } = req.body
        
        if (!address || !inventoriesInfo) {
            return res.status(400).json({
                msg: "Invalid Parameter"
            })
        }

        try {
            await sequelize.transaction(async transaction => {
                const folderingResourceIds = inventoriesInfo.filter(inv => !!inv.is_folder && inv.inv_type === 'resource' && !!inv.id).map(inv => inv.id)
                const resourceInventoryIds = inventoriesInfo.filter(inv => !inv.is_folder && inv.inv_type === 'resource' && !!inv.inv_id).map(inv => inv.inv_id)
                const inventoryIds = inventoriesInfo.filter(inv => !inv.is_folder && inv.inv_type === 'item' && !!inv.inv_id).map(inv => inv.inv_id)

                const account = await getOrCreateAccountIfNeeded({ address, transaction })
                const apes = await Apes.findAll({
                    where: {
                        owner: address,
                    },
                    transaction
                })
                const gold = await Currency.findOne({
                    where: {
                        name: 'Gold'
                    },
                    transaction
                })
                const now = new Date()

                const folderingResourceInventories = await Resource_Inventory.findAll({
                    where: {
                        ape_id: {
                            [Op.in]: apes.map(ape => ape.id)
                        },
                        resource_id: {
                            [Op.in]: folderingResourceIds
                        }
                    },
                    include: Resource,
                    transaction,
                })
                const resourceInventories = await Resource_Inventory.findAll({
                    where: {
                        ape_id: {
                            [Op.in]: apes.map(ape => ape.id)
                        },
                        id: {
                            [Op.in]: resourceInventoryIds
                        },
                    },
                    include: Resource,
                    transaction
                })
                const inventories = await Inventory.findAll({
                    where: {
                        ape_id: {
                            [Op.in]: apes.map(ape => ape.id)
                        },
                        id: {
                            [Op.in]: inventoryIds
                        },
                    },
                    include: Items,
                    transaction
                })

                const totalGold = folderingResourceInventories.map(inv => (inv.Resource?.gold || 0) * (inv.resource_quantity || 0)).reduce((a,b) => a+b, 0)
                                + resourceInventories.map(inv => (inv.Resource?.gold || 0) * (inv.resource_quantity || 0)).reduce((a,b) => a+b, 0)
                                + inventories.map(inv => (inv.Item?.gold || 0) * 1).reduce((a,b) => a+b, 0)

                console.log('Removing resource inventories && inventories && equippeds')
                const removedResourceInventories = await Resource_Inventory.destroy({
                    where: {
                        id: [
                            ...folderingResourceInventories.map(inv => inv.id),
                            ...resourceInventories.map(inv => inv.id)
                        ]
                    },
                    transaction
                })

                const defaultItemEquips = await Default_Item_Equip.destroy({
                    where: {
                        inventory_id: inventories.map(inv => inv.id)
                    },
                    transaction
                })

                const removedInventories = await Inventory.destroy({
                    where: {
                        id: inventories.map(inv => inv.id)
                    },
                    transaction
                })

                console.log(`Creating a transaction for ${totalGold} gold to sell`)
                const goldTransaction = await Account_Transaction.create(
                  {
                    account_id: account.id,
                    currency_id: gold.id,
                    amount: totalGold,
                    transaction_date: now,
                    source_of_transaction: {
                      type: TRANSACTION_SELL_ITEMS,
                      account_id: account.id,
                    },
                    audit_fields: {
                      transaction_date: now,
                    },
                    is_settlement: false,
                  },
                  { transaction }
                )
                console.log('Created a gold transaction for forge', goldTransaction)

                console.log('Clearing cache for account and all apes on this account', account)
                apes.forEach(ape => {
                    redis.del(`Ape_${ape.address}`)
                })
                redis.del(`Account_${address}`)
                console.log('Cleared cache for account and all apes on this account', account)

                return res.json({
                    goldTransaction
                })
            })
        } catch (err) {
            console.log('sell error', {
                err,
                address,
                inventoriesInfo
            })
            return res.status(400).json({
                msg: 'Unable to sell the inventories'
            })
        }
    },
    
    async salvage(req, res) {
        const {
            address,
            inventories: inventoriesInfo
        } = req.body
        
        if (!address || !inventoriesInfo) {
            return res.status(400).json({
                msg: "Invalid Parameter"
            })
        }

        try {
            await sequelize.transaction(async transaction => {
                const folderingResourceIds = inventoriesInfo.filter(inv => !!inv.is_folder && inv.inv_type === 'resource' && !!inv.id).map(inv => inv.id)
                const resourceInventoryIds = inventoriesInfo.filter(inv => !inv.is_folder && inv.inv_type === 'resource' && !!inv.inv_id).map(inv => inv.inv_id)
                const inventoryIds = inventoriesInfo.filter(inv => !inv.is_folder && inv.inv_type === 'item' && !!inv.inv_id).map(inv => inv.inv_id)

                const account = await getOrCreateAccountIfNeeded({ address, transaction })
                const apes = await Apes.findAll({
                    where: {
                        owner: address,
                    },
                    transaction
                })
                const salvage = await Currency.findOne({
                    where: {
                        name: 'Salvage'
                    },
                    transaction
                })
                const now = new Date()

                const folderingResourceInventories = await Resource_Inventory.findAll({
                    where: {
                        ape_id: {
                            [Op.in]: apes.map(ape => ape.id)
                        },
                        resource_id: {
                            [Op.in]: folderingResourceIds
                        }
                    },
                    include: Resource,
                    transaction,
                })
                const resourceInventories = await Resource_Inventory.findAll({
                    where: {
                        ape_id: {
                            [Op.in]: apes.map(ape => ape.id)
                        },
                        id: {
                            [Op.in]: resourceInventoryIds
                        },
                    },
                    include: Resource,
                    transaction
                })
                const inventories = await Inventory.findAll({
                    where: {
                        ape_id: {
                            [Op.in]: apes.map(ape => ape.id)
                        },
                        id: {
                            [Op.in]: inventoryIds
                        },
                    },
                    include: Items,
                    transaction
                })

                const totalSalvage = folderingResourceInventories.map(inv => (inv.Resource?.salvage || 0) * (inv.resource_quantity || 0)).reduce((a,b) => a+b, 0)
                                + resourceInventories.map(inv => (inv.Resource?.salvage || 0) * (inv.resource_quantity || 0)).reduce((a,b) => a+b, 0)
                                + inventories.map(inv => (inv.Item?.salvage || 0) * 1).reduce((a,b) => a+b, 0)

                console.log('Removing resource inventories && inventories && equippeds')
                const removedResourceInventories = await Resource_Inventory.destroy({
                    where: {
                        id: [
                            ...folderingResourceInventories.map(inv => inv.id),
                            ...resourceInventories.map(inv => inv.id)
                        ]
                    },
                    transaction
                })

                const defaultItemEquips = await Default_Item_Equip.destroy({
                    where: {
                        inventory_id: inventories.map(inv => inv.id)
                    },
                    transaction
                })

                const removedInventories = await Inventory.destroy({
                    where: {
                        id: inventories.map(inv => inv.id)
                    },
                    transaction
                })

                console.log(`Creating a transaction for ${totalSalvage} salvage to salvage`)
                const salvageTransaction = await Account_Transaction.create(
                  {
                    account_id: account.id,
                    currency_id: salvage.id,
                    amount: totalSalvage,
                    transaction_date: now,
                    source_of_transaction: {
                      type: TRANSACTION_SELL_ITEMS,
                      account_id: account.id,
                    },
                    audit_fields: {
                      transaction_date: now,
                    },
                    is_settlement: false,
                  },
                  { transaction }
                )
                console.log('Created a salvage transaction for forge', salvageTransaction)

                console.log('Clearing cache for account and all apes on this account', account)
                apes.forEach(ape => {
                    redis.del(`Ape_${ape.address}`)
                })
                redis.del(`Account_${address}`)
                console.log('Cleared cache for account and all apes on this account', account)

                return res.json({
                    salvageTransaction
                })
            })
        } catch (err) {
            console.log('salvage error', {
                err,
                address,
                inventoriesInfo
            })
            return res.status(400).json({
                msg: 'Unable to salvage the inventories'
            })
        }
    },

    async reveal(req, res) {
        const {
            address,
            wallet,
            item_id,
            item_type,
        } = req.body

        const itemType = item_type || 'item'

        let searchTerm = `Ape_${address}`;
        redis.del(searchTerm);

        if(!address || !item_id || !wallet) {
            return res.status(200).json({
                msg: "Invalid Parameters"
            })
        }

        if (!await checkIfApeIsInWallet({
            address,
            wallet,
        })) {
            console.log(`Default Equip - This ape can not be detected in this wallet`);
            return res.status(200).json({
                msg: "This ape can not be detected in this wallet"
            })
        }
        
        if (itemType === 'utility') {
            const ape = await Apes.findOne({
                where: {
                    address
                }
            })
            
            const inventory = await Utility_Inventory.findOne({
                where: {
                    utility_id: item_id,
                    ape_id: ape.id,
                    utility_quantity: {
                        [Op.gt]: 0
                    }
                },
                include: Utility,
            })

            
            if (!inventory || !ape) {
                return res.status(200).json({
                    msg: "No Ape or No Utility"
                })
            }

            let revealedInventory, revealedUtility
            if (inventory.Utility.category === 'Mysterious'){
                const luck = Math.random() * 100

                let category = 'Gold'
                if (luck < MYSTERIOUS_KEYS_REVEAL_CHANCES.Bronze) {
                    category = 'Bronze'
                } else if (luck < (MYSTERIOUS_KEYS_REVEAL_CHANCES.Bronze + MYSTERIOUS_KEYS_REVEAL_CHANCES.Silver)) {
                    category = 'Silver'
                }

                revealedUtility = await Utility.findOne({
                    where: {
                        key: inventory.Utility.key,
                        category,
                    }
                })

                revealedInventory = await Utility_Inventory.create({
                    ape_id: ape.id,
                    utility_id: revealedUtility.id,
                    utility_quantity: 1,
                    utility_durability: revealedUtility.durability,
                })
                console.log(`Revealed Myesterious key ${inventory.Utility.key} to ${category}`)

                inventory.set({
                    utility_quantity: inventory.utility_quantity - 1
                })
                await inventory.save()
            }
            
            return res.json({
                utility: revealedUtility,
                inventory: revealedInventory
            })
        }
    },
}   