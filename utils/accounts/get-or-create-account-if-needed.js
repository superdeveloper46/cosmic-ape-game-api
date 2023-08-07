const { Op } = require("sequelize");
const { Account, Apes, Resource_Inventory } = require("../../models/index");

const   getOrCreateAccountIfNeeded = async ({
  address,
  transaction,
  withApes,
}) => {
  if (!address) {
    return "No Address";
  }

  console.log(
    `Checking if an account is already created - Address(${address})`
  );

  const account = await Account.findOne(
    {
      where: {
        address,
      },
      include: !!withApes && [
        {
          model: Apes,
          include: [{
            model: Resource_Inventory,
            where: {
              resource_quantity: {
                [Op.gt]: 0
              }
            }
          }]
        },
      ],
      transaction:transaction
    },

  );

  if (!!account) {
    console.log(
      `This account is already existing - Address(${address}), Model(${account})`
    );
    return account;
  }

  console.log(
    `This account is not created yet && creating an account - Address(${address})`
  );
  const createdAccount = await Account.create({
    address,
    experience: 0,
    level:1
  },{transaction:transaction});

  console.log(
    `Account is created - Address(${address}), Model(${createdAccount})`
  );

  return createdAccount;
};

module.exports = getOrCreateAccountIfNeeded;
