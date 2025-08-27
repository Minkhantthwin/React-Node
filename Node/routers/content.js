const express = require('express');
const router = express.Router();

const prisma = require('../prismaClient');

router.get('/posts', async (req, res) => {
  try {
    const data = await prisma.post.findMany({
        include: {
            author: true,
            comments: true,
        },
        orderBy : { id : "desc"},
        take: 20, 
  });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.post.findFirst({
            where: { id: Number(id) },
            include: {
                author: true,
                comments: { include: { author: true } },
            },
    });
     res.json(data);
     }
    catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
}
}
);

router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.comment.deleteMany({
            where: { postId: Number(id) },
        });
        await prisma.post.delete({
            where: { id: Number(id) },
        });
        res.json({ msg: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

router.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.comment.delete({
            where: { id: Number(id) },
        });
        res.json({ msg: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

module.exports = { contentRouter: router};