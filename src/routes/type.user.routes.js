const { Router } = require("express");
const { TypeUserController } = require("../controllers/TypeUserController");
const passport = require('../controllers/AuthenticationController');

const typeUserRoutes = Router();
const typeUserController = new TypeUserController();

typeUserRoutes.get("/",
                    // #swagger.tags = ['TypeUser']
                    // #swagger.description = 'Endpoint para obter todos os tipos usuários.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    typeUserController.getAllTypeUsers);
typeUserRoutes.get("/:id", passport.authenticate('admin', { session: false }),
                    // #swagger.tags = ['TypeUser']
                    // #swagger.description = 'Endpoint para obter um tipo de usuário.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    // #swagger.parameters['id'] = { description: 'ID do tipo de usuário.' }
                    typeUserController.getTypeUserById);
typeUserRoutes.post("/", passport.authenticate('admin', { session: false }),
                    // #swagger.tags = ['TypeUser']
                    // #swagger.description = 'Endpoint para criar um tipo de usuário.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    /* #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    "required": ["name"], 
                                    "properties": { 
                                        "name":{ 
                                                "type": "string"
                                            } ,
                                    }
                                }
                            }
                        }
                    } */
                    typeUserController.createTypeUser);
typeUserRoutes.put("/:id", passport.authenticate('admin', { session: false }),
                    // #swagger.tags = ['TypeUser']
                    // #swagger.description = 'Endpoint para atualizar um tipo de usuário.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    /* #swagger.parameters['id'] = { description: 'ID do tipo de usuário.' }
                    /* #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    "required": ["name"], 
                                    "properties": { 
                                        "name":{ 
                                                "type": "string"
                                            } ,
                                    }
                                }
                            }
                        }
                    } */
                    typeUserController.updateTypeUser);
typeUserRoutes.delete("/:id", passport.authenticate('admin', { session: false }),
                    // #swagger.tags = ['TypeUser']
                    // #swagger.description = 'Endpoint para deletar um tipo de usuário.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    // #swagger.parameters['id'] = { description: 'ID do tipo de usuário.' }
                    typeUserController.deleteTypeUser);

module.exports = { typeUserRoutes };