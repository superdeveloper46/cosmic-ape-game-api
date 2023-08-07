const { sequelize } = require("../../models");

const getResourceInventoriesByAccount = async ({
  accounts,
  resources,
  transaction,
}) => {
  console.log(`Getting resource inventories on accounts from DB`);

  let query = `
    SELECT ri.id, ri.resource_quantity, apes.id AS ape_id, res.id AS resource_id, res.name AS resource_name
    FROM Resource_Inventories ri
    LEFT JOIN Apes AS apes ON ri.ape_id = apes.id
    LEFT JOIN Resources AS res ON ri.resource_id = res.id
    WHERE apes.owner IN (${accounts.map((account) => `'${account.address}'`).join(',')})
    AND ri.resource_id IN (${resources.map((resource) => `'${resource.id}'`).join(',')})
    AND ri.resource_quantity > 0
  `;
  const resourceInventories = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    transaction: transaction,
  });
  console.log(`Got resource inventories from DB`, resourceInventories);
  return resourceInventories;
};

module.exports = getResourceInventoriesByAccount;
