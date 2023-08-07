const {Apes, Crowned_Apes} = require("../../models");
const getApesNotInWallet = require("../nft/get-apes-not-in-wallet");


module.exports = {

    async getNoOfApes(wallet,transaction){

        let apes = await Apes.findAll({
            where: {
                owner:wallet
            },
            attributes: [
                'address'
            ],
            transaction:transaction
        })
        if(!apes.length >0){
            throw new Error(`failed to find any valid characters for the wallet ${wallet}`)
        }

        const apesNotInWallet = await getApesNotInWallet({
            addresses: (apes || []).map(ape => ape.address),
            wallet,
        })||0
        let noOfApes = (apes?.length - apesNotInWallet?.length)||0

        return noOfApes

    },

    async findApesByWallet(wallet,transaction){

        let apes = await Apes.findAll({
            where: {
                owner:wallet
            },
            transaction:transaction
        })
        return apes ||[]
    }
}