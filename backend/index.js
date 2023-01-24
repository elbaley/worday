const express = require("express");
const cors = require("cors");
const app = express();
const { Client } = require("pg");

// DB client
const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "",
  database: "wordaydb",
});
client.connect().catch((err) => {
  console.log("veritabanina baglanilamadii");
});

// client.query("SELECT * FROM posts", (err, res) => {
//   if (err) throw err;
//   console.log(res.rows);
//   client.end();
// });

app.use(cors());

// posts
app.get("/posts", (req, res) => {
  // run query
  client.query("SELECT * FROM posts", (err, resp) => {
    if (err) throw err;
    res.json({
      posts: resp.rows,
    });
  });
});

app.listen(4001, () => {
  console.log("🚀 Server started port:4001");
});
