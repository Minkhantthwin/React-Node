const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ msg: 'username & password required' });
    }
    const user = await prisma.user.findUnique({
        where: { username: username },
    });
    if (!user) {
        return res.status(401).json({ msg: 'Invalid username or password' });
    }
    else {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ msg: 'Login successful', token, user });
      }
    }
});

module.exports = { userRouter: router };