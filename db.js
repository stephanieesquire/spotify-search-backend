const db = require("./models");

module.exports = async () => {
  //create tables
  await db.sequelize.sync({ force: true });
  console.log(`[Database] Tables were created`);
};
