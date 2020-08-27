const path = require("path");

const express = require("express");

const app = express();
const port = 4000;
const viewsPath = path.join(__dirname, "../templates");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("/", (_req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
