const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register/typeOrgan', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Organ name is required!' });
  }

  try {
    const typeOrgan = await prisma.organ_types.create({
      data: {
        name,
      },
    });
    res.status(200).json({ message: 'Organ type successfully registered!' });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
