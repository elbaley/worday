import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import multer, { diskStorage } from "multer";
import { COOKIE_NAME } from "./constants.js";
const app = express();
const prisma = new PrismaClient();
const RedisStore = connectRedis(session);
const redisClient = new Redis();
const storageEngine = diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const upload = multer({ storage: storageEngine });

import authorRoutes from "./routes/authors.js";
import postRoutes from "./routes/posts.js";
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.101:5173"],
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
      maxAge: 1000 * 60 * 60 * 24, //* 365 * 10, // 10 years,
      httpOnly: true,
      secure: false, // cookie only works in https
      sameSite: "lax", // csrf
    },
    saveUninitialized: false,
    secret: "rfsdaer-341rf3-4321e",
    resave: false,
  })
);
console.log("test");
app.use(express.static("public"));

app.use("/posts", postRoutes);
app.use("/authors", authorRoutes);

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Username : ${username} Pass: ${password}`);
  // check if username - password exists
  if (!username || !password) {
    return res.json({
      error: {
        message: "Username/password did not match!",
      },
    });
  }
  // find user in the db
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include:{
      posts:true
    }
  });

  if (!user) {
    return res.json({
      error: {
        message: "No such user!",
      },
    });
  }
  // check password
  if (user.password !== password) {
    return res.json({
      error: {
        message: "Invalid password!",
      },
    });
  }

  // set session
  req.session.userId = user.user_id;
  res.json({
    user,
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      console.log("User logged out.");
      res.clearCookie(COOKIE_NAME);
      res.json({
        success: true,
      });
    } else {
      console.log(err);
      res.json({
        success: false,
      });
    }
  });
});

// register
app.post("/register", upload.single("profileImg"), async (req, res) => {
  // Destructure userValues from req.body and set default values if not provided (each becaomes undefined)
  const userValues = JSON.parse(req.body.userValues);

  const profileImgFileName = req.file?.filename;

  const {
    name,
    username,
    password,
    birthDate,
    profileImg = profileImgFileName
      ? `/uploads/${profileImgFileName}`
      : "/uploads/default-profile-img.jpeg",
  } = userValues;
  // Check if name, username, birthDate, and password are present
  if (!name || !username || !birthDate || !password) {
    res.status(400).json({
      error: {
        message: "insufficient data",
      },
    });
    return;
  }
  // check username
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (existingUser) {
    res.status(400).json({
      message: "Username already exists",
    });
    return;
  }
  const user = await prisma.user.create({
    data: {
      birthDate: new Date(birthDate),
      username,
      name,
      profileImg,
      password,
    },
  });
  // set session
  req.session.userId = user.user_id;
  console.log(user);
  res.json({
    user,
  });
});

app.get("/me", async (req, res) => {
  const author = await prisma.user.findFirst({
    where: {
      user_id: req.session.userId,
    },
 });
  res.json({
    userId: req.session.userId || null,
  });
});

app.post("/profile", upload.single("avatar"), function(req, res, next) {
  // req.file is the `avatar` file
  console.log(req.file);
  // req.body will hold the text fields, if there were any
});

app.listen(4001, () => {
  console.log("🚀 Server started port:4001");
});
