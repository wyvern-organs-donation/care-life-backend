const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register/typeuser', async (req, res) => {
  const { type_name } = req.body;

  try {
    const typeUSer = await prisma.user_types.create({
      data: {
        type_name,
      },
    });

    res.status(200).json({ msg: 'Tipo de usuário cadastrado' });
  } catch (error) {
    res.status(400).json({ error: error.array() });
  }
});

module.exports = router;
