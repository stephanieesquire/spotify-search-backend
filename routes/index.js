const authenticationRoutes = require("./authenticationRoutes");
const searchRoutes = require("./searchRoutes");

module.exports = (app) => {
  app.use(authenticationRoutes);
  app.use(searchRoutes);
};
