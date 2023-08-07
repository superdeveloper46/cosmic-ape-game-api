const {INVENTORY_SLOTS} = require("../consts");
const {sequelize, Apes, Product} = require("../../models");
const moment = require("moment/moment");
const getApesNotInWallet = require("../nft/get-apes-not-in-wallet");


function getDailyRefreshTime() {
    let daily_reset = moment().utc().set('hour', 7).startOf('hour');
    if (!daily_reset.isBefore(moment.utc())) {
        daily_reset = daily_reset.subtract(1, 'days')
    }
    return daily_reset
}

function getWeeklyRefreshTime() {
    let weekly_reset = moment().utc().startOf('week').add(2, 'days').add(7, "hours");
    if (!weekly_reset.isBefore(moment.utc())) {
        weekly_reset.subtract(1, "week")
    }
    return weekly_reset
}

function getMonthlyRefresh() {
    let monthly_reset = moment().utc().startOf('month').add(7, "hours");
    if (!monthly_reset.isBefore(moment.utc())) {
        monthly_reset.subtract(1, "week")
    }
    return monthly_reset
}

module.exports = {
    async getSlotsAvailable(noOfApes,wallet, transaction){

        if(noOfApes <=0){
            return 0;
        }
        let slots_available = noOfApes * INVENTORY_SLOTS
        let slot_used_query = `select sum(slots_used) as slots_used from
        (select i.id as inventory_id,i.item_id as slot_occupation,0 as capacity_available, 'Item' as slot_occupation_type, slots as slots_used  from Inventories i
        inner join Items it on i.item_id = it.id
        inner join Apes a on i.ape_id = a.id
        where it.is_active=true
        and a.owner=:owner
        UNION ALL
        select ri.id as inventory_id, ri.resource_id as slot_occupation, ((ri.slots*r.stack)-ri.resource_quantity) as capacity_available, 'Resource' as slot_occupation_type,  slots as slots_used from Resource_Inventories ri
        inner join Resources r on ri.resource_id = r.id
        inner join Apes a on ri.ape_id = a.id
        where r.is_active=true
        and a.owner=:owner) as slots_used
        `


        let [ {slots_used} ]  = await  sequelize.query(slot_used_query,{replacements:{'owner':wallet},type: sequelize.QueryTypes.SELECT,transaction:transaction,})

        return slots_available-slots_used;
    },

    async getSlotCapacities(wallet, transaction){

        let slot_used_query = `select * from
            (select i.ape_id as ape_id,i.id as inventory_id,i.item_id as slot_occupation,0 as capacity_available, 'Item' as slot_occupation_type, slots as slots_used  from Inventories i
             inner join Items it on i.item_id = it.id
             inner join Apes a on i.ape_id = a.id
             where it.is_active=true
             and a.owner=owner
             group by   ape_id, inventory_id,slot_occupation, capacity_available, slot_occupation_type
             UNION ALL
             select ri.ape_id as ape_id, ri.id as inventory_id, ri.resource_id as slot_occupation, ((ri.slots*r.stack)-ri.resource_quantity) as capacity_available, 'Resource' as slot_occupation_type,  slots as slots_used from Resource_Inventories ri
             inner join Resources r on ri.resource_id = r.id
             inner join Apes a on ri.ape_id = a.id
             where r.is_active=true
             and a.owner=:owner
             group by  inventory_id, slot_occupation, capacity_available, slot_occupation_type
             order by slots_used asc)  all_inventory_slots
        `
        let inventorySlots = await  sequelize.query(slot_used_query,{replacements:{'owner':wallet},type: sequelize.QueryTypes.SELECT,transaction:transaction,})

        return inventorySlots;
    },

    async getSlotsUsedByCharacterOrderedByBest(wallet, transaction) {

        let slot_used_query = `select ape_id,crown, sum(slots_used) as used_slots from
            (select a.id as ape_id, ca.id as crown, i.slots as slots_used  from Inventories i
            inner join Items it on i.item_id = it.id
            inner join Apes a on i.ape_id = a.id
            left join Crowned_Apes ca on a.id = ca.ape_id
            where it.is_active=true
            and a.owner=:owner
            UNION ALL
            select a.id as ape_id, ca.id as crown,  slots as slots_used from Resource_Inventories ri
            inner join Resources r on ri.resource_id = r.id
            inner join Apes a on ri.ape_id = a.id
            left join Crowned_Apes ca on a.id = ca.ape_id
            where r.is_active=true
             and a.owner=:owner) character_slots
            group by ape_id, crown
            order by crown desc, used_slots desc`

        let slots_used_by_character = await  sequelize.query(slot_used_query,{replacements:{'owner':wallet},type: sequelize.QueryTypes.SELECT,transaction:transaction,});

        return slots_used_by_character;

    },

    async getSlotCapacityForResource(slotCapacities, resource_id){

        let slotCapacity = slotCapacities?.filter(ics => ics.slot_occupation === resource_id && ics.slot_occupation_type.toLowerCase() === "resource")
           ?.map(ics => ics.capacity_available)?.reduce((p,c) => p+c, 0) ||0

        return slotCapacity;
    },

    async getCurrentResourceSlotsForId(slotCapacities,resource_id, ape_id){

        let slots= slotCapacities?.filter(ics => ics.ape_id === ape_id && ics.slot_occupation === resource_id && ics.slot_occupation_type.toLowerCase() ==="resource");


        return slots;
    },
    getlimits: async function ({wallet,noOfApes, slots_available, slot_capacity, redis, transaction}) {
        let daily_reset = getDailyRefreshTime();
        let weekly_reset = getWeeklyRefreshTime();
        let monthly_reset = getMonthlyRefresh();

        let limit_query = `select s.ape_id        as character_id,
                                  p.id            as shop_item_id,
                                  p.limit         as frequency_limit,
                                  sum(s.quantity) as quantity
                           from Shop_Transactions s
                                    inner join Products p on s.product_id = p.id
                                    inner join Apes a on s.ape_id = a.id
                                    inner join Accounts acc on a.owner = acc.address
                           where acc.address = :owner
                             and p.limit_type = :limit_type
                             and s.date_purchased > :startPeriod
                           group by character_id, shop_item_id, limit_type, frequency_limit`


        let productsAvailableToWallet;


        let daily_transactions_summary = await sequelize.query(limit_query, {
            replacements: {
                "owner": wallet,
                "startPeriod": daily_reset.toDate(),
                'limit_type': 'DAILY'
            }, type: sequelize.QueryTypes.SELECT, transaction: transaction
        })

        let weekly_transactions_summary = await sequelize.query(limit_query, {
            replacements: {
                "owner": wallet,
                "startPeriod": weekly_reset.toDate(),
                'limit_type': 'WEEKLY'
            }, type: sequelize.QueryTypes.SELECT, transaction: transaction
        })

        let monthly_transaction_summary = await sequelize.query(limit_query, {
            replacements: {
                "owner": wallet,
                "startPeriod": monthly_reset.toDate(),
                'limit_type': 'MONTHLY'
            }, type: sequelize.QueryTypes.SELECT, transaction: transaction
        })

        let productsCache =await redis.get("shop_products") ;
        let products;
        if(!productsCache){
            products = JSON.parse(JSON.stringify(await Product.findAll({transaction: transaction})))
            await redis.set("shop_products",JSON.stringify(products));
        } else {
            products = JSON.parse(productsCache)
        }



        if(!slots_available) {
            slots_available = await module.exports.getSlotsAvailable(noOfApes, wallet, transaction)
        }
        if(!slot_capacity){
            slot_capacity = await module.exports.getSlotCapacities(wallet, transaction)
        }

        productsAvailableToWallet = products.map(p => {
            let total_limit_used = 0
            if (p.limit_type === "Daily") {
                total_limit_used = daily_transactions_summary?.filter(t => t.shop_item_id === p.id)
                    ?.map(t => parseInt(t.quantity))?.reduce((p, c) => p + c, 0) || 0
            } else if (p.limit_type === "Weekly") {
                total_limit_used = weekly_transactions_summary?.filter(t => t.shop_item_id === p.id)
                    ?.map(t => parseInt(t.quantity))?.reduce((p, c) => p + c, 0) || 0
            } else if (p.limit_type === "Monthly") {
                total_limit_used = monthly_transaction_summary?.filter(t => t.shop_item_id === p.id)
                    ?.map(t => parseInt(t.quantity))?.reduce((p, c) => p + c, 0) || 0
            }

            let existing_capcity = slot_capacity?.filter(ics => ics.slot_occupation === p.product_id && ics.slot_occupation_type.toLowerCase() === p.product_type.toLowerCase())
                ?.map(ics => ics.capacity_available)?.reduce((p, c) => p + c, 0) || 0

            return {
                product_id: p.id,
                limit_type: p.limit_type,
                maximum_allowed: p.limit * noOfApes,
                total_limit_used: total_limit_used,
                existing_slot_capacity_available: existing_capcity,
                slots_available: slots_available,
                slot_required_for_item: p.product_type.toLowerCase() === "currency" ? false : true
            }
        })

        return productsAvailableToWallet
    },


    getShopRefreshTimes(){
        let daily_reset = getDailyRefreshTime();
        let weekly_reset = getWeeklyRefreshTime();
        let monthly_reset = getMonthlyRefresh();

        daily_reset = daily_reset.add(1,"days")
        weekly_reset = weekly_reset.add(1,"week")
        monthly_reset = monthly_reset.add(1,"month")

        return {
            daily:daily_reset.diff(moment.now(),'minutes'),
            weekly:weekly_reset.diff(moment.now(),'minutes'),
            monthly:monthly_reset.diff(moment.now(),'minutes'),
        }
    }
}