const { Router } = require("express");
const { TypeOrganController } = require("../controllers/TypeOrganController");

const typeOrganRoutes = Router();
const typeOrganController = new TypeOrganController();

typeOrganRoutes.get("/", typeOrganController.getAllTypeOrgans);
typeOrganRoutes.get("/:id", typeOrganController.getTypeOrganById);
typeOrganRoutes.post("/", typeOrganController.createTypeOrgan);
typeOrganRoutes.put("/:id", typeOrganController.updateTypeOrgan);
typeOrganRoutes.delete("/:id", typeOrganController.deleteTypeOrgan);

module.exports = { typeOrganRoutes };