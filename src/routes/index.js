const { Router } = require("express");
const { organRoutes } = require("./organ.routes");
const { userRoutes } = require("./user.routes");

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/organ", organRoutes);

module.exports = routes;