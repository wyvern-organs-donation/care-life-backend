const { Router } = require("express");
const { OrganController } = require("../controllers/OrganController");
const passport = require('../controllers/AuthenticationController');

const organRoutes = Router();
const organController = new OrganController();


organRoutes.get("/filter", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['Organ']
                // #swagger.description = 'Endpoint para filtrar orgãos por tipo.'
                /* #swagger.security = [{
                    "bearerAuth": []
                }] */

                /* #swagger.parameters['organ_type_id'] = {
                    in: 'query',
                    description: 'ID do tipo do orgão para filtrar.',
                    type: 'number'
                } */
                /* #swagger.parameters['institution_id'] = {
                    in: 'query',
                    description: 'ID da instituição do orgão para filtrar.',
                    type: 'number'
                } */
                organController.filterOrgan);
organRoutes.get("/", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['Organ']
                // #swagger.description = 'Endpoint para obter todos os orgãos.'
                /* #swagger.security = [{
                    "bearerAuth": []
                }] */
                organController.getAllOrgans);
organRoutes.get("/:id", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['Organ']
                // #swagger.description = 'Endpoint para obter um orgão.'
                // #swagger.parameters['id'] = { description: 'ID do orgão.' }
                /* #swagger.security = [{
                    "bearerAuth": []
                }] */
                organController.getOrganById);
organRoutes.post("/", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['Organ']
                // #swagger.description = 'Endpoint para criar um orgão.'
                /* #swagger.security = [{
                    "bearerAuth": []
                }] */
                 /* #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    "required": ["type_id", "donor_id", "institution_id"], 
                                    "properties": { 
                                        "type_id":{ 
                                                "type": "number"
                                            } ,
                                        "donor_id":{ 
                                                "type": "number"
                                            } ,
                                        "institution_id":{ 
                                                "type": "number"
                                            } ,
                                    }
                                }
                            }
                        }
                    } */
                organController.createOrgan);
organRoutes.put("/:id", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['Organ']
                // #swagger.description = 'Endpoint para atualizar um orgão.'
                /* #swagger.security = [{
                    "bearerAuth": []
                }] */
                // #swagger.parameters['id'] = { description: 'ID do orgão.' }
                /* #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    "required": ["type_id", "donor_id", "institution_id"], 
                                    "properties": { 
                                        "type_id":{ 
                                                "type": "number"
                                            } ,
                                        "donor_id":{ 
                                                "type": "number"
                                            } ,
                                        "institution_id":{ 
                                                "type": "number"
                                            } ,
                                    }
                                }
                            }
                        }
                    } */
                organController.updateOrgan);
organRoutes.delete("/:id", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['Organ']
                // #swagger.description = 'Endpoint para deletar um orgão.'
                /* #swagger.security = [{
                    "bearerAuth": []
                }] */
                // #swagger.parameters['id'] = { description: 'ID do orgão.' }                              
                organController.deleteOrgan);

module.exports = { organRoutes };