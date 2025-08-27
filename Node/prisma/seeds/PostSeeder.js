const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function PostSeeder() {
	console.log("Post seeding started...");
	// Get all user IDs
	const users = await prisma.user.findMany({ select: { id: true } });
	for (let i = 0; i < 20; i++) {
		const author = faker.helpers.arrayElement(users);
		await prisma.post.create({
			data: {
				content: faker.lorem.paragraph(),
				authorId: author.id,
			},
		});
	}
	console.log("Post seeding done.");
}

module.exports = { PostSeeder };
