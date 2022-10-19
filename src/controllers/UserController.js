const { PrismaClient, Prisma } = require('@prisma/client');
const { hash } = require('../controllers/hashPassword');
const sendConfirmationEmail = require('../controllers/confirmRegistration')

const prismaClient = new PrismaClient();

const userSelect = {
    id: true,
    type: true,
    name: true,
    email: true,
    birth_date: true,
    phone_number: true,
    doc_country: true,
    doc_number: true,
    adress: true,
    city: true,
    state: true,
    country: true,
    zip: true
};

class UserController {
    async getAllUsers(req, res) {
        const users = await prismaClient.users.findMany({
            select: userSelect
        });

        return res.status(200).json(users);
    }
    
    async getUserById(req, res) {
        const id = +req.params.id;

        const user = await prismaClient.users.findUnique({
            where: {
                id
            },
            select: userSelect
        });
        
        if (!user) {
            return res.status(400).json("Não foi possível encontrar o usuário.");
        }

        return res.status(200).json(user);
    }

    async createUser(req, res) {
        const {
            name,
            email,
            password,
            birth_date,
            phone_number,
            type_id,
            doc_country,
            doc_number,
            adress,
            city,
            state,
            country,
            zip,
          } = req.body;
        
          if (!name) {
            return res.status(422).json({ message: 'Name is required!' });
          }
        
          if (!email) {
            return res.status(422).json({ message: 'Email is required!' });
          }
        
          if (!password) {
            return res.status(422).json({ message: 'Password is required!' });
          }
        
          if (!birth_date) {
            return res.status(422).json({ message: 'Birth date is required!' });
          }
        
          if (!phone_number) {
            return res.status(422).json({ message: 'Phone is required!' });
          }
        
          if (!type_id) {
            return res.status(422).json({ message: 'Type user is required!' });
          }
        
          try {
            const user = await prismaClient.users.create({
              data: {
                name,
                email,
                password: await hash(password),
                birth_date: new Date(birth_date),
                phone_number,
                country,
                state,
                city,
                adress,
                zip,
                doc_country,
                doc_number,
                user_types: {
                  connect: {
                    id: type_id,
                  },
                },
              },
            });
        
            // Colocar função do sendmail aqui 
            await sendConfirmationEmail(user)
            
            res.status(200).json({ message: 'User successfully registered!', user });
          } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              // The .code property can be accessed in a type-safe manner
              if (error.code === 'P2002') {
                if (error.meta.target === 'users_doc_number_key') {
                  res.status(400).json({ message: 'já possui um cadastro com esse CPF'});
                } if (error.meta.target === 'users_email_key') {
                  res.status(400).json({ message: 'já possui um cadastro com esse email'});
                }
              }
            }
          } finally {
            async () => {
              await prismaClient.$disconnect();
            };
          }
        
    }
    
    async updateUser(req, res) {
        const id = +req.params.id;
        const {
            name,
            email,
            password,
            birth_date,
            phone_number,
            type_id,
            doc_country,
            doc_number,
            adress,
            city,
            state,
            country,
            zip,
          } = req.body;
        
        try {
            const userExist = await prismaClient.users.findUnique({ where: { id } });
            
            if (!userExist) {
                return res.status(400).json("Não foi possível encontrar o usuário.");
            }
            
            const user = await prismaClient.users.update({
                where: {
                    id
                },
                data: {
                    name,
                    email,
                    password: await hash(password),
                    birth_date: new Date(birth_date),
                    phone_number,
                    country,
                    state,
                    city,
                    adress,
                    zip,
                    doc_country,
                    doc_number,
                    user_types: {
                      connect: {
                        id: type_id,
                      },
                    },
                },
                select: userSelect
            });
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json("Dados inválidos.");
        }  
    }

    async deleteUser(req, res) {
        const id = +req.params.id;

        const userExist = await prismaClient.users.findUnique({ where: { id } });

        if (!userExist) {
            return res.status(400).json("Não foi possível encontrar o usuário.");
        }

        const user = await prismaClient.users.delete({
            where: {
                id
            }
        });

        return res.status(204).send(user);
    }
}

module.exports = { userSelect, UserController };