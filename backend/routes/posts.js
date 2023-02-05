const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// list all posts
router.get("/", async (req, res) => {
  // fetch posts from db
  const posts = await prisma.post.findMany({
    orderBy: {
      pubDate: "desc",
    },
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
router.get("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const post = await prisma.post.findFirst({
    where: { post_id: postId },
  });
  res.json({
    posts: post,
  });
});

module.exports = router;
