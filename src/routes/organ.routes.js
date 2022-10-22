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
                /* #swagger.parameters['type_id'] = { 
                                                    description: 'ID do tipo do orgão.',
                                                    required: true,
                                                    type: 'number'
                                                } */
                /* #swagger.parameters['donor_id'] = { 
                                                    description: 'ID do doador do orgão.',
                                                    required: true,
                                                    type: 'number',
                                                } */
                /* #swagger.parameters['institution_id'] = { 
                                                    description: 'ID da instituição do orgão.', 
                                                    required: true,
                                                    type: 'number',
                                                } */
                organController.createOrgan);
organRoutes.put("/:id", passport.authenticate('jwt', { session: false }),
                // #swagger.tags = ['Organ']
                // #swagger.description = 'Endpoint para atualizar um orgão.'
                /* #swagger.security = [{
                    "bearerAuth": []
                }] */
                /* #swagger.parameters['type_id'] = { 
                                                    description: 'ID do tipo do orgão.',
                                                    required: true,
                                                    type: 'number'
                                                } */
                /* #swagger.parameters['donor_id'] = { 
                                                    description: 'ID do doador do orgão.',
                                                    required: true,
                                                    type: 'number',
                                                } */
                /* #swagger.parameters['institution_id'] = { 
                                                    description: 'ID da instituição do orgão.', 
                                                    required: true,
                                                    type: 'number',
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