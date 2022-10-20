const { PrismaClient, Prisma, prisma } = require('@prisma/client');

const prismaClient = new PrismaClient();

const typeUserSelect = {
    id: true,
    type_name: true,
};

class TypeUserController {
    async getAllTypeUsers(req, res) {
        const typeUsers = await prismaClient.typeUsers.findMany({
            select: typeUserSelect
        });

        return res.status(200).json(typeUsers);
    }
    
    async getTypeUserById(req, res) {
        const id = +req.params.id;

        const typeUser = await prismaClient.typeUsers.findUnique({
            where: {
                id
            },
            select: typeUserSelect
        });
        
        if (!typeUser) {
            return res.status(400).json("The user type could not be found.");
        }

        return res.status(200).json(user);
    }

    async createTypeUser(req, res) {
      const {
        type_name,
      } = req.body;
    
      if (!type_name) {
        return res.status(422).json({ message: 'Type is required!' });
      }

      try {
        const typeUser = await prismaClient.typeUsers.create({
          data: {
            type_name,
            user_types: {
              connect: {
                id: type_id,
              },
            },
          },
        });
        res.status(200).json({ message: 'User type successfully registered!', typeUser });
      } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === 'P2002') {
            if (error.meta.target === 'type_name') {
              res.status(400).json({ message: 'already have a registration with this type.'});
            }
          }
        }
      } finally {
        async () => {
          await prismaClient.$disconnect();
        };
      }
        
    }
    
    async updateTypeUser(req, res) {
        const id = +req.params.id;
        const {
            type_name,
          } = req.body;
        
        try {
            const typeUserExist = await prismaClient.typeUsers.findUnique({ where: { id } });
            
            if (!typeUserExist) {
                return res.status(400).json("The type could not be found.");
            }
            
            const typeUser = await prismaClient.typeUsers.update({
                where: {
                    id
                },
                data: {
                    type_name,
                    user_types: {
                      connect: {
                        id: type_id,
                      },
                    },
                },
                select: typeUserSelect
            });
            return res.status(200).json(typeUser);
        } catch (err) {
            return res.status(400).json("Invalid data.");
        }  
    }

    async deleteTypeUser(req, res) {
        const id = +req.params.id;

        const typeUserExist = await prismaClient.typeUsers.findUnique({ where: { id } });

        if (!typeUserExist) {
            return res.status(400).json("The type could not be found.");
        }

        const typeUser = await prismaClient.typeUsers.delete({
            where: {
                id
            }
        });

        return res.status(204).send(typeUser);
    }
}

module.exports = { typeUserSelect, TypeUserController };