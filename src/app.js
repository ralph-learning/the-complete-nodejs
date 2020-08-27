const path = require("path");

const express = require("express");
const hbs = require("hbs");
const fetch = require("node-fetch");

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

app.get("/weather", async (req, res) => {
  const ACCESS_KEY = "e40d1cca7e7e7f464236024432f79237"; // TODO: extract to use env var
  const qs = encodeURI(req.query.address);

  const urlWeather = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${qs}`;

  if (!req.query.address) {
    return res.send("No ?address provided.");
  }

  try {
    const response = await fetch(urlWeather);

    const json = await response.json();

    res.send({
      forecast: json.current.weather_descriptions.join(", "),
      location: json.location.name,
    });
  } catch (error) {
    console.error(error);
  }
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
