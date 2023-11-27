require("dotenv").config();
const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");
const userController = require("./controllers/userController");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userController.getUsers);
app.get("/api/users/:id", userController.getUsersById);

module.exports = app;
