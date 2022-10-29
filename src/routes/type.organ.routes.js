const { Router } = require("express");
const { TypeOrganController } = require("../controllers/TypeOrganController");
const passport = require('../controllers/AuthenticationController');

const typeOrganRoutes = Router();
const typeOrganController = new TypeOrganController();

typeOrganRoutes.get("/",
                    // #swagger.tags = ['TypeOrgan']
                    // #swagger.description = 'Endpoint para obter todos os tipos orgãos.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    typeOrganController.getAllTypeOrgans);
typeOrganRoutes.get("/:id", passport.authenticate('jwt', { session: false }),
                    // #swagger.tags = ['TypeOrgan']
                    // #swagger.description = 'Endpoint para obter um tipo de orgão.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    // #swagger.parameters['id'] = { description: 'ID do tipo de orgão.' }
                    typeOrganController.getTypeOrganById);
typeOrganRoutes.post("/", passport.authenticate('jwt', { session: false }),
                    // #swagger.tags = ['TypeOrgan']
                    // #swagger.description = 'Endpoint para criar um tipo de orgão.'
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
                    typeOrganController.createTypeOrgan);
typeOrganRoutes.put("/:id", passport.authenticate('jwt', { session: false }),
                    // #swagger.tags = ['TypeOrgan']
                    // #swagger.description = 'Endpoint para criar um tipo de orgão.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    // #swagger.parameters['id'] = { description: 'ID do tipo de orgão.' }
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
                    typeOrganController.updateTypeOrgan);
typeOrganRoutes.delete("/:id", passport.authenticate('jwt', { session: false }),
                    // #swagger.tags = ['TypeOrgan']
                    // #swagger.description = 'Endpoint para deletar um tipo de orgão.'
                    /* #swagger.security = [{
                        "bearerAuth": []
                    }] */
                    // #swagger.parameters['id'] = { description: 'ID do tipo de orgão.' }
                    typeOrganController.deleteTypeOrgan);

module.exports = { typeOrganRoutes };