const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { type_id, donor_id, institution_id } = req.body;

  if (!type_id) {
    res.status(400).json({ message: 'Type of organ is a necessary data.' });
  }

  if (!institution_id) {
    res.status(400).json({ message: 'The institution is a necessary data.' });
  }

  if (!donor_id) {
    res.status(400).json({ message: 'The donor is a necessary data.' });
  }

  try {
    const organ = await prisma.organs.create({
      data: {
        organ_types: {
          connect: {
            id: type_id,
          },
        },
        users_organs_donorTousers: {
          connect: {
            id: donor_id,
          },
        },
        users_organs_institutionTousers: {
          connect: {
            id: institution_id,
          },
        },
      },
    });

    res.status(200).json({ message: 'Organ registered successfully', organ });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
});

module.exports = router;
