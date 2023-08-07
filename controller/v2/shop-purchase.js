const {getSlotsAvailable,getSlotCapacities, getSlotCapacityForResource,getCurrentResourceSlotsForId,getSlotsUsedByCharacterOrderedByBest,getlimits} = require('../../utils/account_limits/account-limit-helper');
const {findProductById} = require('../../utils/Product/product-helper');
const {getNoOfApes,findApesByWallet} = require('../../utils/apes/ape-helper');
const {INVENTORY_SLOTS} = require("../../utils/consts");
const {TRANSACTION_SHOP_PURCHASE,TRANSACTION_SHOP_COST, TRANSACTION_USE_EXPERIENCE_ITEM} = require("../../static/transaction-types")
const getOrCreateAccountIfNeeded = require('../../utils/accounts/get-or-create-account-if-needed')
const getCurrenciesByAccounts = require('../../utils/currencies/get-currencies-by-accounts')

const {  Resource_Inventory,Resource,sequelize } = require('../../models/index')
const Redis = require("ioredis");
const getApesNotInWallet = require("../../utils/nft/get-apes-not-in-wallet");
const {TRANSACTION_REPAIR_ITEM} = require("../../static/transaction-types");
const {Character_Transaction, Account_Transaction,Shop_Transaction} = require("../../models");
const XP_ITEM_PRICES = require("../../static/experience-item-price");
const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
});


module.exports = {

    saveResourceForShop: async function (slotCapacities, product, slotsAvailable, quantity, slotsByApes, wallet, t) {
        let slotCapacityForResource = await getSlotCapacityForResource(slotCapacities, product.product_id)
        if (slotCapacityForResource <= 0 && slotsAvailable <= 0) {
            throw new Error(`There is no capacity or slot available to complete purchase- current slot capacity [${slotCapacityForResource}] slots [${slotsAvailable}]`);
        }

        let resource_to_create = []
        let apes_with_transaction = []
        let depleting_quantity = product.quantity * quantity;
        if (slotsByApes.length === 0) {
            // new rsosurce inventories exist for apes
            let amount = depleting_quantity
            let slots = Math.ceil(amount / product.product_details.stack)
            let apes = await findApesByWallet(wallet, t);
            resource_to_create.push({
                ape_id: apes[0].id,
                resource_id: product.product_id,
                resource_quantity: amount,
                slots: slots
            })
            apes_with_transaction.push({ape_id: apes[0].id, amount})
        }

        for (const slot of slotsByApes) {
            let avaialble_slots = INVENTORY_SLOTS - slot.used_slots;
            let canCreateSlot = true
            if (avaialble_slots === 0) {
                canCreateSlot = false
            }

            let existingProductSlots = await getCurrentResourceSlotsForId(slotCapacities, product.product_id, slot.ape_id);
            let amount;
            if (existingProductSlots.length === 0 && canCreateSlot) {
                let max_slots_needed = Math.ceil(depleting_quantity / product.product_details.stack)
                let slots_to_add = 0
                if (max_slots_needed < avaialble_slots) {
                    amount = depleting_quantity
                    slots_to_add = max_slots_needed
                } else {
                    slots_to_add = avaialble_slots
                    amount = slots_to_add * product.product_details.stack
                }

                resource_to_create.push({
                    ape_id: slot.ape_id,
                    resource_id: product.product_id,
                    resource_quantity: amount,
                    slots: slots_to_add

                })
                apes_with_transaction.push({ape_id: slot.ape_id, amount})
            } else if (existingProductSlots.length > 0 && canCreateSlot) {
                let rinv = await Resource_Inventory.findOne({
                    where: {
                        id: existingProductSlots[0].inventory_id
                    },
                    transaction: t
                })

                let slots_to_add = 0;
                if (depleting_quantity <= product.product_details.stack) {
                    amount = depleting_quantity
                } else {
                    let current_capacity = rinv.slots * product.product_details.stack - rinv.resource_quantity
                    let max_slots_needed = Math.ceil((depleting_quantity - current_capacity) / product.product_details.stack)

                    if (max_slots_needed < avaialble_slots) {
                        slots_to_add = max_slots_needed
                        amount = depleting_quantity
                    } else if (avaialble_slots > 0) {
                        slots_to_add = avaialble_slots;
                        amount = slots_to_add * product.product_details.stack + current_capacity
                    } else {
                        amount = product.product_details.stack - rinv.resource_quantity;
                    }
                }
                resource_to_create.push({
                    id: rinv.id,
                    ape_id: slot.ape_id,
                    resource_id: product.product_id,
                    resource_quantity: rinv.resource_quantity + amount,
                    slots: rinv.slots + slots_to_add
                })
                apes_with_transaction.push({ape_id: slot.ape_id, amount})
            } else if (existingProductSlots.length > 0 && !canCreateSlot) {
                let rinv = await Resource_Inventory.findOne({
                    where: {
                        id: existingProductSlots[0].inventory_id
                    },
                    transaction: t
                })

                let current_capacity = rinv.slots * product.product_details.stack - rinv.resource_quantity

                amount = current_capacity;

                resource_to_create.push({
                    id: rinv.id,
                    ape_id: slot.ape_id,
                    resource_id: product.product_id,
                    resource_quantity: rinv.resource_quantity + amount,
                    slots: rinv.slots
                })
                apes_with_transaction.push({ape_id: slot.ape_id, amount})

            }
            depleting_quantity -= amount
            if (depleting_quantity === 0) {
                break;
            }
        }
        await Resource_Inventory.bulkCreate(resource_to_create, {updateOnDuplicate:['resource_quantity', 'slots']})
        return apes_with_transaction;
    },

    createCurrencyTransaction: async function (slotsByApes, wallet, t, product, quantity) {
        let ape_id;
        if (slotsByApes.length === 0) {
            if (slotsByApes.length === 0) {
                let apes = await findApesByWallet(wallet, t);
                ape_id = apes[0].id;
            }
        } else {
            ape_id = slotsByApes[0].ape_id;
        }
        let now = new Date();
        let currency_transaction = {
            character_id: ape_id,
            currency_id: product.product_id,
            amount: quantity * product.quantity,
            transaction_date: now,
            source_of_transaction: {
                type: TRANSACTION_SHOP_PURCHASE,
                character_id: ape_id,
                wallet: wallet,

            },
            audit_fields: {
                transaction_date: now,
                product_id: product.product_id,
                quantity: quantity,
                product_currency: product.purchase_currency.id,
                product_cost: product.cost * quantity
            },
            is_settlement: false,
        }

        await Character_Transaction.create(currency_transaction, {transaction: t})

        return [{ape_id: ape_id, amount:quantity}]
    },
    chargeCost: async function (account, product, quantity, t) {
        let now = new Date();
        await Account_Transaction.create(
            {
                account_id: account.id,
                currency_id: product.purchase_currency.id,
                amount: -(product.cost * quantity),
                transaction_date: now,
                source_of_transaction: {
                    type: TRANSACTION_SHOP_COST,
                    product_id: product.id,
                    account_id: account.id,
                },
                audit_fields: {
                    transaction_date: now,
                    currency_name: product.purchase_currency.name,
                    amount: -(product.cost * quantity),
                    quantity: quantity,
                    product: product.id
                },
                is_settlement: false,
            },
            {transaction: t}
        )
    },
    shop_purchase: async  function (req, res){
        const {product_id,quantity,wallet}  = req.body

        if(!product_id  || product_id <= 0){
            res.status(400).json({message:`valid product_id is required`})
            return;
        }
        if(!quantity || quantity <=0){
            res.status(400).json({message:`valid quantity is required`})
            return;
        }
        if(!wallet){
            res.status(400).json({message:`wallet  is required`})
            return;
        }

        try{
            await sequelize.transaction(async (t) => {
                let product = await findProductById(product_id,t)
                if (!product) {
                    console.log(`Purchase failed with product_id ${product_id}`)
                    throw new Error(`Product is not valid`)
                }
                const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction: t })

                let account_balances = await getCurrenciesByAccounts({accounts:[account],transaction:t});
                if(account_balances.length === 0){
                    throw new Error("Account does not have any currency available")
                }

                let noOfApes = await getNoOfApes(wallet,t);
                if(noOfApes <=0){
                    throw  new Error("No Valid characters found in wallet")
                }
                let slotsAvailable = await getSlotsAvailable(noOfApes,wallet,t);
                if(!slotsAvailable  && slotsAvailable ===0 && product.product_type === "Resource" && product.product_details.stack===1){
                    throw new Error(`Not enough slot capacity available to complete purchase - Available slots [${slotsAvailable}]`)
                }

                let slotCapacities = await getSlotCapacities(wallet,t);
                const account_shop_limits  = await getlimits({wallet:wallet,noOfApes:noOfApes,slots_available:slotsAvailable,slot_capacity:slotCapacities,redis:redis,transaction:t})

                let currency_balance = account_balances.find(ab => ab.currency_id ===  product.purchase_currency.id)?.amount ||0

                if(currency_balance < (product.cost * quantity)){
                    throw new Error(`You dont have enough ${product.purchase_currency.name} , You need  ${(product.cost * quantity)} and you have ${currency_balance}`)
                }





                let account_product_limit = account_shop_limits.find(sl => sl.product_id===product.id)

                if(!account_product_limit){
                    throw new Error(`Shop limit config not defined for ${product_id}`)
                }
                if(product.limit_type !== "NO_Limit"){
                    let available_limit = account_product_limit.maximum_allowed - account_product_limit.total_limit_used
                    if(available_limit < quantity){
                        throw new Error(`Product purchase limit is exceeded your available limit for this product is ${available_limit}`);
                    }
                }

                let slotsByApes = (await getSlotsUsedByCharacterOrderedByBest(wallet,t));
                let apes_limit_used;
                if(product.product_type === "Resource"){
                    apes_limit_used = await module.exports.saveResourceForShop(slotCapacities, product, slotsAvailable, quantity, slotsByApes, wallet, t);
                } else if (product.product_type === "Currency"){
                    apes_limit_used = await module.exports.createCurrencyTransaction(slotsByApes, wallet, t, product, quantity);
                }

                if(apes_limit_used.length === 0){
                    console.log(`failed to record apes that have had there limit used ${apes_limit_used}`)
                    throw new Error("We have failed to complete purchase")
                }
                let shop_transactions = [];
                let now = new Date()
                for(const apeTransaction of apes_limit_used){

                    shop_transactions.push({
                        product_id:product.id,
                        ape_id:apeTransaction.ape_id,
                        quantity:apeTransaction.amount,
                        date_purchased: now,
                        total:(product.cost*apeTransaction.amount),
                        purchase_currency: product.purchase_currency.id
                    })
                }

                await Shop_Transaction.bulkCreate(shop_transactions, {transaction:t})
                await module.exports.chargeCost(account, product, quantity,t);
            })
            await redis.del(`Account_${wallet}`)

            res.status(200).json({
                message:"Purchase Complete",
            })
        }catch(err){
            console.log(`Purchase for wallet ${wallet||""} failed due to ${err.message ||""}`)
            console.log(err)
            res.status(400).json({
                message:err.message,
            })
        }
    }
}
