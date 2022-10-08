const express = require('express');
const { hash } = require('../utils/utils');
const router = express.Router();

const { PrismaClient, Prisma  } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
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

  const formatDate = new Date(birth_date);

  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: await hash(password),
        birth_date: formatDate,
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
      await prisma.$disconnect();
    };
  }
});

module.exports = router;
