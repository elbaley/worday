const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const demoPosts = [
  {
    userName: "emre",
    postContent: "lorem",
    date: "25m",
  },
  {
    userName: "mahmut",
    postContent: "dal",
    date: "25m",
  },
  {
    userName: "yaren",
    postContent: "yaprak",
    date: "32m",
  },
  {
    userName: "ayse",
    postContent: "agac",
    date: "23m",
  },
  {
    userName: "teyze",
    postContent: "odun",
    date: "1h",
  },
];

// posts
app.get("/posts", (req, res) => {
  console.log("posta istek geldi");
  res.json({
    posts: demoPosts,
  });
});

app.listen(4001, () => {
  console.log("🚀 Server started port:4001");
});
