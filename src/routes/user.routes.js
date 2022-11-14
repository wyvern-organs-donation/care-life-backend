const { Router } = require("express");
const { UserController } = require("../controllers/UserController");
const passport = require('../controllers/AuthenticationController');

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/filter", passport.authenticate('admin', { session: false }),
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para filtrar usuários por tipo.'
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */

                /* #swagger.parameters['user_type_id'] = {
                    in: 'query',
                    description: 'ID do tipo do usuário para filtrar.',
                    type: 'number'
                } */
                userController.filterUser);
userRoutes.get("/", passport.authenticate('admin', { session: false }),
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para obter todos os usuários.'
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */
                userController.getAllUsers);
userRoutes.get("/:id", passport.authenticate('admin', { session: false }),
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para obter um usuário.'
                // #swagger.parameters['id'] = { description: 'ID do usuário.' }
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */
                userController.getUserById);
userRoutes.post("/",
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para criar um usuário.'
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */
                /* #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    "required": ["name", "email", "password", "birth_date", "type_id", "cpf", "phone_number"], 
                                    "properties": { 
                                        "name":{ 
                                                "type": "string"
                                            } ,
                                        "email":{ 
                                                "type": "string" 
                                            } ,
                                        "password":{ 
                                                "type": "string" 
                                            } ,
                                        "birth_date":{ 
                                                "type": "string"
                                            } ,
                                        "phone_number":{ 
                                                "type": "string"
                                            } ,
                                        "type_id":{ 
                                                "type": "number"
                                            } ,
                                        "cpf":{ 
                                                "type": "string"
                                            } ,
                                        "adress":{ 
                                                "type": "string"
                                            } ,
                                        "city":{ 
                                                "type": "string"
                                            } ,
                                        "state":{ 
                                                "type": "string"
                                            } ,
                                        "zip":{ 
                                                "type": "string"
                                            } ,
                                    }
                                }
                            }
                        }
                    } */
                userController.createUser);
userRoutes.put("/:id", passport.authenticate('admin', { session: false }),
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para atualizar um usuário.'
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */
                /* #swagger.parameters['id'] = { description: 'ID do usuário.' }
                /* #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    "required": ["name", "email", "password", "birth_date", "type_id", "cpf", "phone_number"], 
                                    "properties": { 
                                        "name":{ 
                                                "type": "string"
                                            } ,
                                        "email":{ 
                                                "type": "string" 
                                            } ,
                                        "password":{ 
                                                "type": "string" 
                                            } ,
                                        "birth_date":{ 
                                                "type": "string"
                                            } ,
                                        "phone_number":{ 
                                                "type": "string"
                                            } ,
                                        "type_id":{ 
                                                "type": "number"
                                            } ,
                                        "cpf":{ 
                                                "type": "string"
                                            } ,
                                        "adress":{ 
                                                "type": "string"
                                            } ,
                                        "city":{ 
                                                "type": "string"
                                            } ,
                                        "state":{ 
                                                "type": "string"
                                            } ,
                                        "zip":{ 
                                                "type": "string"
                                            } ,
                                    }
                                }
                            }
                        }
                    } */
                userController.updateUser);
userRoutes.delete("/:id", passport.authenticate('admin', { session: false }),
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para deletar um usuário.'
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */
                // #swagger.parameters['id'] = { description: 'ID do usuário.' }
                userController.deleteUser);
userRoutes.get("/confirmation/:id/:token",
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para confirmar o registro de um usuário.'
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */
                // #swagger.parameters['id'] = { description: 'ID do usuário.' }
                // #swagger.parameters['token'] = { description: 'Token de confirmação gerado.' }
                userController.confirmRegistration);

module.exports = { userRoutes };