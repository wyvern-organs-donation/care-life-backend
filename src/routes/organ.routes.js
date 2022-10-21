const { Router } = require("express");
const { OrganController } = require("../controllers/OrganController");

const organRoutes = Router();
const organController = new OrganController();


organRoutes.get("/filter", organController.filterOrgan);
organRoutes.get("/", organController.getAllOrgans);
organRoutes.get("/:id", organController.getOrganById);
organRoutes.post("/", organController.createOrgan);
organRoutes.put("/:id", organController.updateOrgan);
organRoutes.delete("/:id", organController.deleteOrgan);

module.exports = { organRoutes };