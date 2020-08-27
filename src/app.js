const path = require("path");

const express = require("express");
const hbs = require("hbs");

const app = express();
const port = 4000;
const viewsPath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("/", (_req, res) => {
  res.render("index", {
    title: "Home page",
    name: "Ralph Effting",
  });
});

app.get("/weather", (_req, res) => {
  res.send({
    forecast: "It's sowing",
    location: "Philadeçphia",
  });
});

app.get("/help", (_req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ralph Effting",
  });
});

app.get("/help/*", (_req, res) => {
  res.render("404", {
    text: "Help article not found",
  });
});

app.get("/about", (_req, res) => {
  res.render("about", {
    title: "About",
    name: "Ralph Effting",
  });
});

app.get("*", (_req, res) => {
  res.render("404", {
    text: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
