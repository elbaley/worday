const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const addCurrentlyLikedToPosts = require("../utils/addCurrentlyLikedToPosts");
const prisma = new PrismaClient();

// all authors
router.get("/", async (req, res) => {
  const authors = await prisma.user.findMany();

  res.json({
    authors,
  });
});

// single author
router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const author = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: true,
    },
  });
  if (!author) {
    return res.status(400).json({
      error: {
        message: "no user found!",
      },
    });
  }
  res.json({
    author,
  });
});

// list of author's posts
router.get("/:username/posts", async (req, res) => {
  const username = req.params.username;
  const author = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      posts: {
        include: {
          author: true,
          likedBy: true,
          _count: {
            select: {
              likedBy: true,
            },
          },
        },
        orderBy: {
          pubDate: "desc",
        },
      },
    },
  });
  // add currentlyLiked field to author's posts
  author.posts = addCurrentlyLikedToPosts(author.posts, req.session.userId);
  console.log(author);
  if (!author) {
    return res.status(400).json({
      error: {
        message: "no user found!",
      },
    });
  }
  // delete TODO
  res.json({ posts: author.posts });
});
module.exports = router;
