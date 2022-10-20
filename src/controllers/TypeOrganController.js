const { PrismaClient, Prisma, prisma } = require('@prisma/client');

const prismaClient = new PrismaClient();

const typeOrganSelect = {
  id: true,
  type_name: true,
}

class TypeOrganController {
  async getAllTypeOrgans(req,res) {
      const typeOrgans = await prismaClient.typeOrgans.findMany({
          select: typeOrganSelect
      })

      return res.status(200).json(typeOrgans)
  }

  async getTypeOrganById(req,res) {
      const id = +req.params.id;

      const typeOrgan = await prismaClient.typeOrgans.findUnique({
          where: {
              id
          },
          select: typeOrganSelect
      })

      if (!organ) {
          return res.status(400).json("The organ type could not be found.");
      }

      return res.status(200).json(typeOrgan)
  }
  async createTypeOrgan (req,res) {
      const {
          type_name
      } = req.body


      if (!type_name) {
          return res.status(422).json({ message: 'Organ type is required!' });
        }

  try {
      const typeOrgan = await prismaClient.typeOrgans.create({
          data: {
              organ_types: {
                  connect: {
                      id: type_id
                  }
              },
          }
      })


      res.status(200).json({ message: 'Organ type successfully registered!', typeOrgan})
  } catch (error) {
      console.log(error)
  } finally {
      async () => {
          await prismaClient.$disconnect
      }
  }
  }
  async updateTypeOrgan(req, res) {
      const id = +req.params.id;
      const {
          type_name
        } = req.body;
      
      try {
          const typeOrganExist = await prismaClient.typeOrgans.findUnique({ where: { id } });
          
          if (!typeOrganExist) {
              return res.status(400).json("The organ type could not be found.");
          }
          
          const typeOrgan = await prismaClient.typeOrgans.update({
              where: {
                  id
              },
              data: {
                  organ_types: {
                      connect: {
                        type_name: type_name
                      }
                  },
              },
              select: typeOrganSelect
          });
          return res.status(200).json(typeOrgan);
      } catch (err) {
          return res.status(400).json("Invalid data.");
      }  
  }

  async deleteTypeOrgan(req,res) {
      const id = +req.params.id

      const typeOrganExist = await prismaClient.typeOrgans.findUnique( { where: { id }})

      if (!typeOrganExist) {
          return res.status(400).json("The organ type could not be found.");
      }

      const typeOrgans = await prismaClient.typeOrgans.delete({
          where: {
              id
          }
      })
      return res.status(204).send(typeOrgans)
  }
}

module.exports = { typeOrganSelect, TypeOrganController }
