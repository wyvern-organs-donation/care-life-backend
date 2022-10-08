const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const typeUSer = await prisma.user_types.create({
      data: {
        name,
      },
    });

    res.status(200).json({ msg: 'User type successfully registered!' });
  } catch (error) {
    res.status(400).json({ error: error.array() });
  }
});

module.exports = router;
