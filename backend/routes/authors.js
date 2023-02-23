import { PrismaClient } from "@prisma/client";
import express from "express";
import addCurrentlyLikedToPosts from "../utils/addCurrentlyLikedToPosts.js";

const router = express.Router();
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
  if (!author) {
    return res.status(400).json({
      error: {
        message: "no user found!",
      },
    });
  }
  // add currentlyLiked field to author's posts
  author.posts = addCurrentlyLikedToPosts(author.posts, req.session.userId);
  res.json({ posts: author.posts });
});
// list of author's likes
router.get("/:username/likes", async (req, res) => {
  const username = req.params.username;
  const postsLikedByAuthor = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      likedPosts: {
        include: {
          author: {
            select: {
              name: true,
              username: true,
              profileImg: true,
            },
          },
          _count: true,
          likedBy: true,
        },
      },
    },
  });
  if (!postsLikedByAuthor) {
    return res.status(400).json({
      error: {
        message: "no user found!",
      },
    });
  }
  // add currentlyLiked field to posts
  postsLikedByAuthor.likedPosts = addCurrentlyLikedToPosts(
    postsLikedByAuthor.likedPosts,
    req.session.userId
  );
  res.json({ posts: postsLikedByAuthor.likedPosts });
});

export default router;
