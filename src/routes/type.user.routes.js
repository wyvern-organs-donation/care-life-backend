const { Router } = require("express");
const { TypeUserController } = require("../controllers/TypeUserController");

const typeUserRoutes = Router();
const typeUserController = new TypeUserController();

typeUserRoutes.get("/", typeUserController.getAllTypeUsers);
typeUserRoutes.get("/:id", typeUserController.getTypeUserById);
typeUserRoutes.post("/", typeUserController.createTypeUser);
typeUserRoutes.put("/:id", typeUserController.updateTypeUser);
typeUserRoutes.delete("/:id", typeUserController.deleteTypeUser);

module.exports = { typeUserRoutes };