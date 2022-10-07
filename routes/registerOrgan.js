const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register/organ', async (req, res) => {
  const { organ_type, donor, institution } = req.body;

  if (!organ_type) {
    res.status(400).json({ message: 'O tipo de órgão é necessário' });
  }

  if (!institution) {
    res.status(400).json({ message: 'A instituição é necessária' });
  }

  try {
    const organ = await prisma.organs.create({
      data: {
        organ_type,
        donor,
        institution,
      },
    });

    res.status(200).json({ message: 'Orgao cadastrado' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
});

module.exports = router;
