const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register/typeorgan', async (req, res) => {
  const { type_name } = req.body;

  if (!type_name) {
    res.status(400).json({ message: 'O type name é obrigatório' });
  }

  try {
    const typeOrgan = await prisma.organ_types.create({
      data: {
        type_name,
      },
    });
    res.status(200).json({ message: 'Tipo de orgão cadastrado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
