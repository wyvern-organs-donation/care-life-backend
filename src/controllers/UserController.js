const { PrismaClient, Prisma } = require('@prisma/client');
const { hash } = require('./HashPassword');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

const prismaClient = new PrismaClient();

const userSelect = {
    id: true,
    type: true,
    name: true,
    email: true,
    birth_date: true,
    phone_number: true,
    cpf: true,
    adress: true,
    city: true,
    state: true,
    zip: true
};

const sendConfirmationEmail = async  (user, token, req) => {
  var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  });

  var message = {
      from: "norepley@wyver.com.br",
      to: user.email,
      subject: "Confirmação de cadastro - Wyver",
      text: `Prezado(a) ${user.name}. \n\nBem-vindo(a) à Wyver! \n\nClique no link abaixo para confirmar seu e-mail e concluir seu cadastro: \nhttp://${req.headers.host}/user/confirmation/${user.id}/${token.token} \n\nEste link tem validade de 24h. Recomendamos que você realize a confirmação assim que receber este e-mail.`,
      html: `Prezado(a) ${user.name}. <br><br>Bem-vindo(a) à Wyver!<br><br>Clique no link abaixo para confirmar seu e-mail e concluir seu cadastro:<br> <a href='http://${req.headers.host}/user/confirmation/${user.id}/${token.token}'> Clique aqui </a><br><br>Este link tem validade de 24h. Recomendamos que você realize a confirmação assim que receber este e-mail.`
  };

  transport.sendMail(message, function (err) {
      if (err) console.log(err)
      return err
  })
}

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
            return res.status(400).json("The user could not be found.");
        }

        return res.status(200).json(user);
    }

    // filter by user type
    async filterUser(req,res) {
      const userTypeId = req.query.user_type_id;
      

      const users = await prismaClient.users.findMany({
          where: {
              type: userTypeId != null ? parseInt(userTypeId) : undefined,
          },
          select: userSelect
      })

      if (users.length < 1) {
          return res.status(400).json("This filter didn't return any user.");
      }

      return res.status(200).json(users)
  }

    async createUser(req, res) {
      const {
        name,
        email,
        password,
        birth_date,
        phone_number,
        type_id,
        cpf,
        adress,
        city,
        state,
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
    
      const formatDate = new Date(birth_date);
    
      try {
        const user = await prismaClient.users.create({
          data: {
            name,
            email,
            password: await hash(password),
            birth_date: formatDate,
            phone_number,
            state,
            city,
            adress,
            zip,
            cpf,
            user_types: {
              connect: {
                id: type_id,
              },
            },
          },
        });
    
        var now = new Date();
    
        const token = await prismaClient.confirmation_tokens.create({
          data: {
            token: crypto.randomBytes(16).toString('hex'),
            expiration: new Date(now.setTime(now.getTime() + 24 * 60 * 60 * 1000)),
            user_id: user.id,
          }
        })
    
        await sendConfirmationEmail(user, token, req);
        
        res.status(200).json({ message: 'User successfully registered!', user });
      } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === 'P2002') {
            if (error.meta.target === 'users_cpf_key') {
              res.status(400).json({ message: 'already have a registration with this CPF.'});
            } if (error.meta.target === 'users_email_key') {
              res.status(400).json({ message: 'already have an account with this email.'});
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
            cpf,
            adress,
            city,
            state,
            zip,
          } = req.body;
        
        try {
            const userExist = await prismaClient.users.findUnique({ where: { id } });
            
            if (!userExist) {
                return res.status(400).json("The user could not be found.");
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
                    cpf,
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
            console.log(err)
            return res.status(400).json("Invalid data.");
        }  
    }

    async deleteUser(req, res) {
        const id = +req.params.id;

        const userExist = await prismaClient.users.findUnique({ where: { id } });

        if (!userExist) {
            return res.status(400).json("The user could not be found.");
        }

        const user = await prismaClient.users.delete({
            where: {
                id
            }
        });

        return res.status(200).json("User successfully deleted!");
    }

    async confirmRegistration (req, res, next) {
      var token = await prismaClient.confirmation_tokens.findFirst({ where: {token: req.params.token} })
          // token is not found into database i.e. token may have expired 
      if (!token){
          return res.status(400).json({message:'Invalid token.'});
      }
      if (token.expiration < new Date()){
          return res.status(400).json({message:'Your verification link may have expired. Please click on resend for verify your Email.'});
      }
      // if token is found then check valid user 
      else{
        var user = await prismaClient.users.findFirst({ where: {id: parseInt(req.params.id), tokens: {every: {token: req.params.token} }}})
        // not valid user
        if (!user){
            return res.status(401).json({message: 'We were unable to find a user for this verification. Please SignUp!'});
        } 
        // user is already verified
        else if (user.status){
            return res.status(200).json({message: 'User has been already verified. Please Login'});
        }
        // verify user
        else{
            // change isVerified to true
            user =  await prismaClient.users.update({ 
                where: {
                    id: parseInt(req.params.id)
                }, data: {
                    status: true
                } 
            });
            return res.status(200).json({message: 'Email has been confirmed sucessfully'});
        }
      }
    }
}

module.exports = { userSelect, UserController, sendConfirmationEmail };