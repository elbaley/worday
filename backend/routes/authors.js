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
      likes: true,
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
          likes: true,
          _count: {
            select: {
              likes: true,
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
// Define the route to get the posts liked by a user
router.get("/:username/likes", async (req, res) => {
  const username = req.params.username;

  // Find the user with the specified username
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  // If the user is not found, return an error response
  if (!user) {
    return res.status(400).json({
      error: {
        message: "no user found!",
      },
    });
  }

  // Get the user's id from the user object
  const { user_id } = user;

  // Get all the likes made by the user, including the posts they liked
  const likesOfUser = await prisma.likes.findMany({
    where: {
      user_id,
    },
    include: {
      post: {
        include: {
          author: true,
          likes: true,
          _count: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Order the likes by the time they were created
    },
  });

  // Extract the posts from the likes and create an array of posts liked by the user
  const postsLikedByUser = likesOfUser.map((like) => {
    const { post } = like;
    return post;
  });

  // Return the posts liked by the user, including whether the currently logged in user liked the post or not
  res.json({
    posts: addCurrentlyLikedToPosts(postsLikedByUser, req.session.userId),
  });
});

export default router;
