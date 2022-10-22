const { PrismaClient, Prisma, prisma } = require('@prisma/client');

const prismaClient = new PrismaClient();

const typeOrganSelect = {
  id: true,
  name: true,
}

class TypeOrganController {
  async getAllTypeOrgans(req,res) {
      const typeOrgans = await prismaClient.organ_types.findMany({
          select: typeOrganSelect
      })

      return res.status(200).json(typeOrgans)
  }

  async getTypeOrganById(req,res) {
      const id = +req.params.id;

      const typeOrgan = await prismaClient.organ_types.findUnique({
          where: {
              id
          },
          select: typeOrganSelect
      })

      if (!typeOrgan) {
          return res.status(400).json("The organ type could not be found.");
      }

      return res.status(200).json(typeOrgan)
  }
  async createTypeOrgan (req,res) {
      const {
          name
      } = req.body


      if (!name) {
          return res.status(422).json({ message: 'Organ type name is required!' });
        }

  try {
      const typeOrgan = await prismaClient.organ_types.create({
          data: {
              name:name
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
          name
        } = req.body;
      
      try {
          const typeOrganExist = await prismaClient.organ_types.findUnique({ where: { id } });
          
          if (!typeOrganExist) {
              return res.status(400).json("The organ type could not be found.");
          }
          
          const typeOrgan = await prismaClient.organ_types.update({
              where: {
                  id
              },
              data: {
                  name:name
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

      const typeOrganExist = await prismaClient.organ_types.findUnique( { where: { id }})

      if (!typeOrganExist) {
          return res.status(400).json("The organ type could not be found.");
      }

      const typeOrgans = await prismaClient.organ_types.delete({
          where: {
              id
          }
      })
      return res.status(200).json("Organ type successfully deleted!")
  }
}

module.exports = { typeOrganSelect, TypeOrganController }
