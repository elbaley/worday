const express = require("express");
const cors = require("cors");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors());

// posts
app.get("/posts", async (req, res) => {
  // postlari getir
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          username: true,
          name: true,
          profileImg: true,
        },
      },
    },
  });
  res.json({
    posts: posts,
  });
});

// single post detail
app.get("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const post = await prisma.post.findFirst({
    where: { post_id: postId },
  });
  res.json({
    posts: post,
  });
});

// all authors
app.get("/authors", async (req, res) => {
  const authors = await prisma.user.findMany();

  res.json({
    authors,
  });
});

// single author
app.get("/authors/:id", async (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = await prisma.user.findFirst({
    where: {
      user_id: authorId,
    },
  });

  res.json({
    author,
  });
});

app.listen(4001, () => {
  console.log("🚀 Server started port:4001");
});
