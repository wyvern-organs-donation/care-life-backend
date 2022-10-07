const express = require('express');
const { hash } = require("../utils/utils");
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const {
    user_name,
    email,
    user_password,
    birth_date,
    phone_number,
    user_types_id,
    doc_country,
    doc_number,
    adress,
    city,
    state,
    country,
    zip,
  } = req.body;

  if (!user_name) {
    return res.status(422).json({ message: 'O nome é obrigatório' });
  }

  if (!email) {
    return res.status(422).json({ message: 'O email é obrigatório' });
  }

  if (!user_password) {
    return res.status(422).json({ message: 'A senha é obrigatória' });
  }

  if (!birth_date) {
    return res
      .status(422)
      .json({ message: 'A data de aniversário é obrigatória' });
  }

  if (!phone_number) {
    return res.status(422).json({ message: 'O telefone é obrigatório' });
  }

  try {
    const user = await prisma.users.create({
      data: {
        user_name,
        email,
        user_password: await hash(user_password),
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
            id: user_types_id
          },
        },
      },
    });

    res.status(200).json({ message: 'Usuśario cadastrado no banco' });
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
});

module.exports = router;
