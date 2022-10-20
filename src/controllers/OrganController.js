const { PrismaClient, Prisma, prisma } = require('@prisma/client');

const prismaClient = new PrismaClient();

const organSelect = {
    id: true,
    type: true,
    donor: true,
    institution: true
}

class OrganController {
    async getAllOrgans(req,res) {
        const organs = await prismaClient.organs.findMany({
            select: organSelect
        })

        return res.status(200).json(organs)
    }

    async getOrganById(req,res) {
        const id = +req.params.id;

        const organ = await prismaClient.organs.findUnique({
            where: {
                id
            },
            select: organSelect
        })

        if (!organ) {
            return res.status(400).json("The organ could not be found.");
        }

        return res.status(200).json(organ)
    }
    async createOrgan (req,res) {
        const {
            type_id,
            donor_id,
            institution_id
        } = req.body


        if (!type_id) {
            return res.status(422).json({ message: 'Type organ is required!' });
          }

        if (!donor_id) {
            return res.status(422).json({ message: 'Donor is required!' });
          }
        
          if (!institution_id) {
            return res.status(422).json({ message: 'Institution is required!' });
          }


    try {
        const organ = await prismaClient.organs.create({
            data: {
                organ_types: {
                    connect: {
                        id: type_id
                    }
                },
                users_organs_donorTousers: {
                    connect: {
                        id: donor_id
                    }
                },
                users_organs_institutionTousers: {
                    connect: {
                        id: institution_id
                    }
                }
            }
        })


        res.status(200).json({ message: 'Organ successfully registered!', organ})
    } catch (error) {
        console.log(error)
    } finally {
        async () => {
            await prismaClient.$disconnect
        }
    }
    }
    async updateOrgan(req, res) {
        const id = +req.params.id;
        const {
            type_id,
            donor_id,
            institution_id
          } = req.body;
        
        try {
            const organExist = await prismaClient.organs.findUnique({ where: { id } });
            
            if (!organExist) {
                return res.status(400).json("The organ could not be found.");
            }
            
            const organ = await prismaClient.organs.update({
                where: {
                    id
                },
                data: {
                    organ_types: {
                        connect: {
                            id: type_id
                        }
                    },
                    users_organs_donorTousers: {
                        connect: {
                            id: donor_id
                        }
                    },
                    users_organs_institutionTousers: {
                        connect: {
                            id: institution_id
                        }
                    }
                },
                select: organSelect
            });
            return res.status(200).json(organ);
        } catch (err) {
            return res.status(400).json("Invalid data.");
        }  
    }

    async deleteOrgan(req,res) {
        const id = +req.params.id

        const organExist = await prismaClient.organs.findUnique( { where: { id }})

        if (!organExist) {
            return res.status(400).json("The organ could not be found.");
        }

        const organ = await prismaClient.organs.delete({
            where: {
                id
            }
        })
        return res.status(200).json({ message: 'Successfully deleted' })
    }
}

module.exports = { organSelect, OrganController }