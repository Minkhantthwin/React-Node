const express = require("express");
const jwt = require("jsonwebtoken");

const prisma = require("../prismaClient");

function auth(req, res, next) {
    const {authorization} = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
    res.locals.user = user;
    next();
}

function isOwner(type) {

    return async (req, res, next) => {
        const { id } = req.params;
        const user = res.locals.user;

        if (type === "post") {
            const post = await prisma.post.findUnique({
                where: { id: Number(id) },
            });
            if (post.authorId == user.id)
                return next();
    }
    if (type === "comment") {
        const comment = await prisma.comment.findUnique({
            where: { id: Number(id) },
            include: { post: true },
        });
        if (comment.authorId == user.id || comment.post.authorId == user.id)
            return next();
    }
    res.status(403).json({ msg: "Forbidden" });
};

}

module.exports = {auth, isOwner};