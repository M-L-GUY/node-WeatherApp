const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
//define paths for express config
const viewsPath = path.join(__dirname, "./", "templates/views");
const partialsPath = path.join(__dirname, "./", "templates", "/partials");
//getting geocode and forecast

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port=process.env.PORT||3000;
//setup handlebars enfine and views lcoations
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);
//setup static directory toserver
app.use(express.static(path.join(__dirname, "./", "public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Hardik",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    text: "this is about page",
    name: "Hardik",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    text: "Just Enter the Name of the city to get the weather forecast",
    name: "hardik",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  geoCode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({error});
    }
    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        latitude: latitude,
        longitude: longitude,
        location: location,
        forecast: foreCastData,
      });
    });
  });
});

//match anything that has not been matched far
app.get("*", (req, res) => {
  res.render("404.hbs", {
    title: "Error Page",
    name: "Hardik",
    errorMessage: "Error Page",
  });
});
app.listen(port, () => {
  console.log("listening to "+port);
});
