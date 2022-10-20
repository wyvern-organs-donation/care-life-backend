const { Router } = require("express");
const { UserController } = require("../controllers/UserController");

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.post("/", userController.createUser);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.get("/confirmation/:id/:token", userController.confirmRegistration);

module.exports = { userRoutes };