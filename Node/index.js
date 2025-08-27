const express = require('express');
const app = express();

const prisma = require('./prismaClient');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { contentRouter } = require('./routers/content');
app.use("/content", contentRouter);

const { userRouter } = require('./routers/user');
app.use("/", userRouter);

app.get('/info', (req, res) => {
  res.json({msg:"Express is running"});
});

app.get("/users/:id", (req, res) => {
 const { id } = req.params;
 res.json({ user: `User ${id}` });
});

const server = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });
};