const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const prisma = require('../prismaClient');

router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        comments: true,
      },
      orderBy: { id: 'desc' },
      take: 20,
    });
    res.json(users);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/users/:id', async (req, res) => {
    try{
    const { id } = req.params;
    const user = await prisma.user.findFirst({
        where: { id: Number(id) },
        include: {
            posts: true,
            comments: true
        },
     });
     res.json(user);
    }
    catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
});

router.post('/users', async (req, res) => {
    const { name, username, email, password, bio } = req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json({ msg: 'Missing required fields' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, username, email, password: hash, bio },
    });
    res.status(201).json(user);
});

module.exports = { userRouter: router };