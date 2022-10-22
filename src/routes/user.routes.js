const { Router } = require("express");
const { UserController } = require("../controllers/UserController");
const passport = require('../controllers/AuthenticationController');

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/filter", passport.authenticate('jwt', { session: false }),
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
userRoutes.get("/", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para obter todos os usuários.'
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */
                userController.getAllUsers);
userRoutes.get("/:id", passport.authenticate('jwt', { session: false }),
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
                /* #swagger.parameters['name'] = { 
                                                    description: 'Nome do usuário.',
                                                    required: true,
                                                    type: 'string'
                                                } */
                /* #swagger.parameters['email'] = { 
                                                    description: 'Email do usuário.',
                                                    required: true,
                                                    type: 'string',
                                                } */
                /* #swagger.parameters['password'] = { 
                                                    description: 'Senha do usuário.', 
                                                    required: true,
                                                    type: 'string',
                                                } */
                /* #swagger.parameters['birth_date'] = { 
                                                    description: 'Data de nascimento do usuário.', 
                                                    required: true,
                                                    type: 'Date',
                                                    format: 'AAAA-MM-DD'
                                                } */
                /* #swagger.parameters['type_id'] = { 
                                                    description: 'ID do tipo do usuário.', 
                                                    required: true,
                                                    type: 'number'
                                                } */
                /* #swagger.parameters['cpf'] = { 
                                                    description: 'CPF do usuário.', 
                                                    required: true,
                                                    type: 'string'
                                                } */
                // #swagger.parameters['adress'] = { description: 'Endereço do usuário.' }
                // #swagger.parameters['city'] = { description: 'Cidade do usuário.' }
                // #swagger.parameters['state'] = { description: 'Estado do usuário.' }
                // #swagger.parameters['zip'] = { description: 'CEP do usuário.' }
                userController.createUser);
userRoutes.put("/:id", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['User']
                // #swagger.description = 'Endpoint para atualizar um usuário.'
                /* #swagger.security = [{
                        "bearerAuth": []
                }] */
                /* #swagger.parameters['id'] = { description: 'ID do usuário.' }
                /* #swagger.parameters['name'] = { 
                                                    description: 'Nome do usuário.',
                                                    required: true,
                                                    type: 'string'
                                                } */
                /* #swagger.parameters['email'] = { 
                                                    description: 'Email do usuário.',
                                                    required: true,
                                                    type: 'string'
                                                } */
                /* #swagger.parameters['password'] = { 
                                                    description: 'Senha do usuário.', 
                                                    required: true,
                                                    type: 'string'
                                                } */
                /* #swagger.parameters['birth_date'] = { 
                                                    description: 'Data de nascimento do usuário.', 
                                                    required: true,
                                                    type: 'Date',
                                                    format: 'AAAA-MM-DD'
                                                } */
                /* #swagger.parameters['type_id'] = { 
                                                    description: 'ID do tipo do usuário.', 
                                                    required: true,
                                                    type: 'number'
                                                } */
                /* #swagger.parameters['cpf'] = { 
                                                    description: 'CPF do usuário.', 
                                                    required: true,
                                                    type: 'string'
                                                } */
                // #swagger.parameters['adress'] = { description: 'Endereço do usuário.' }
                // #swagger.parameters['city'] = { description: 'Cidade do usuário.' }
                // #swagger.parameters['state'] = { description: 'Estado do usuário.' }
                // #swagger.parameters['zip'] = { description: 'CEP do usuário.' }
                userController.updateUser);
userRoutes.delete("/:id", passport.authenticate('jwt', { session: false }),
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