import { PrismaClient } from "@prisma/client";
import express from "express";
import addCurrentlyLikedToPosts from "../utils/addCurrentlyLikedToPosts.js";
const router = express.Router();
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
      likes: {
        select: {
          user_id: true,
        },
      },
      _count: true,
    },
  });
  res.json({
    posts: addCurrentlyLikedToPosts(posts, req.session.userId),
  });
});

// list popular words
router.get("/popular", async (req, res) => {
  // fetch popular words
  const popularWords = await prisma.post.groupBy({
    by: ["postContent"],
    _count: {
      postContent: true,
      _all: true,
    },
    orderBy: {
      _count: {
        postContent: "desc",
      },
    },
    take: 5,
  });
  res.json({
    popularWords,
  });
});

// add post
router.post("/", async (req, res) => {
  // check values
  const { postContent, authorId, pubDate = new Date() } = req.body;
  console.log(postContent, authorId, pubDate);
  // check authentication
  if (req.session.userId !== authorId) {
    return res.status(401).json({ message: "you are not authorized" });
  }
  const post = {
    postContent,
    authorId,
    pubDate,
  };
  try {
    const newPost = await prisma.post.create({
      data: {
        ...post,
      },
    });
    res.status(201).json({ status: 201, post: newPost });
  } catch (e) {
    console.log(e);
  }

  console.log(req.session.userId);
  console.log("now add the post");
});

// single post detail
router.get("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const post = await prisma.post.findFirst({
    where: { post_id: postId },
    include: {
      author: true,
      likes: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  console.log(post);
  res.json({
    posts: post,
  });
});

// delete post
router.put("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const post = await prisma.post.deleteMany({
    where: { post_id: postId, authorId: req.session.userId },
  });
  res.json({
    posts: post,
  });
});
// like a post

router.put("/like/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.session.userId;
  // check if the post has already been liked
  const post = await prisma.post.findUnique({
    where: {
      post_id: postId,
    },
    select: {
      likes: true,
    },
  });
  const hasLiked =
    post.likes.filter((like) => like.user_id === userId).length > 0;
  if (hasLiked) {
    // unlike the post
    const deletedLike = await prisma.likes.delete({
      where: {
        post_id_user_id: {
          user_id: userId,
          post_id: postId,
        },
      },
    });
    return res.json({ msg: "unliked" });
  }
  const like = await prisma.likes.create({
    data: {
      post: {
        connect: { post_id: postId },
      },
      user: {
        connect: { user_id: userId },
      },
      createdAt: new Date(),
    },
  });
  res.json({ msg: "liked" });
});
export default router;
