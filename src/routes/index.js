const { Router } = require("express");
const { organRoutes } = require("./organ.routes");
const { userRoutes } = require("./user.routes");
const { typeOrganRoutes } = require("./type.organ.routes");
const { typeUserRoutes } = require("./type.user.routes");

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/organ", organRoutes);
routes.use("/typeOrgan", typeOrganRoutes);
routes.use("/typeUser", typeUserRoutes);

module.exports = routes;