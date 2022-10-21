const { PrismaClient, Prisma, prisma } = require('@prisma/client');

const prismaClient = new PrismaClient();

const typeUserSelect = {
    id: true,
    name: true,
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

        return res.status(200).json(typeUser);
    }

    async createTypeUser(req, res) {
      const {
        name,
      } = req.body;
    
      if (!name) {
        return res.status(422).json({ message: 'Name is required!' });
      }

      try {
        const typeUser = await prismaClient.typeUsers.create({
          data: {
            name
          },
        });
        res.status(200).json({ message: 'User type successfully registered!', typeUser });
      } catch (error) {
        console.log(error);
      } finally {
        async () => {
          await prismaClient.$disconnect();
        };
      }
        
    }
    
    async updateTypeUser(req, res) {
        const id = +req.params.id;
        const {
            name,
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
                    name
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

        return res.status(200).json("User type successfully deleted!");
    }
}

module.exports = { typeUserSelect, TypeUserController };