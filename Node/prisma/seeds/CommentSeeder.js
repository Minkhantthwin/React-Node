const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function CommentSeeder() {
	console.log("Comment seeding started...");
	// Get all user and post IDs
	const users = await prisma.user.findMany({ select: { id: true } });
	const posts = await prisma.post.findMany({ select: { id: true } });
	for (let i = 0; i < 40; i++) {
		const author = faker.helpers.arrayElement(users);
		const post = faker.helpers.arrayElement(posts);
		await prisma.comment.create({
			data: {
				content: faker.lorem.sentence(),
				authorId: author.id,
				postId: post.id,
			},
		});
	}
	console.log("Comment seeding done.");
}

module.exports = { CommentSeeder };
