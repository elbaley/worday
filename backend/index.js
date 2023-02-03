const express = require("express");
const cors = require("cors");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const Redis = require("ioredis");
const session = require("express-session");
const { COOKIE_NAME } = require("./constants");
const RedisStore = require("connect-redis")(session);
const redisClient = new Redis();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    name: COOKIE_NAME,
    store: new RedisStore({
      client: redisClient,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years,
      httpOnly: true,
      secure: false, // cookie only works in https
      sameSite: "lax", // csrf
    },
    saveUninitialized: false,
    secret: "rfsdaer-341rf3-4321e",
    resave: false,
  })
);

console.log(redisClient.status);

// posts
app.get("/posts", async (req, res) => {
  console.log(redisClient.status);
  console.log(`Current session: ${JSON.stringify(req.session)}`);

  // postlari getir
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

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Username : ${username} Pass: ${password}`);
  // check if username - password exists
  if (!username || !password) {
    return res.json({
      error: "Username/password did not match!",
    });
  }
  // find user in the db
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!user) {
    return res.json({
      error: "No such user!",
    });
  }
  console.log(user);
  // check password
  if (user.password !== password) {
    return res.json({
      error: "Invalid password!",
    });
  }

  req.session.userId = user.user_id;
  console.log("req session after setting id");
  console.log(req.session);
  res.json({
    user,
  });
});

app.listen(4001, () => {
  console.log("🚀 Server started port:4001");
});
