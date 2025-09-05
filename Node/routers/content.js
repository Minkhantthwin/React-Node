const express = require('express');
const router = express.Router();

const { auth, isOwner} = require('../middleware/auth');

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

router.post('/posts', auth, async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ msg: 'Content is required' });
    }
    const user = res.locals.user;
    try {
        const post = await prisma.post.create({
            data: {
                content,
                authorId: user.id,
            },
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
    const data = await prisma.post.findMany({
        include: {
            user: true,
            comments:{
                include: { author: true },
            },
        },
        orderBy : { id : "desc"},
        take: 20, 
  });
    res.json(data);
}
);

router.post('/comments', auth, async (req, res) => {
    const { postId, content } = req.body;
    if (!postId || !content) {
        return res.status(400).json({ msg: 'postId and content are required' });
    }
    const user = res.locals.user;
    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                postId: Number(postId),
                authorId: user.id,
            },
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
    comment.user = user;
    res.json(comment);
}
);

router.get("/verify", auth, async (req, res) => {
    const user = res.locals.user;
    res.json(user);
});

router.delete('/posts/:id', auth, isOwner("post"), async (req, res) => {
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

router.delete('/comments/:id', auth, isOwner("comment"), async (req, res) => {
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