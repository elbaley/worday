const express = require("express");
const cors = require("cors");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors());

// posts
app.get("/posts", async (req, res) => {
  // postlari getir
  const posts = await prisma.posts.findMany();
  res.json({
    posts: posts,
  });
});

// single post detail
app.get("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const post = await prisma.posts.findFirst({
    where: { post_id: postId },
  });
  res.json({
    posts: post,
  });
});

app.listen(4001, () => {
  console.log("🚀 Server started port:4001");
});
