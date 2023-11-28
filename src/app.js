require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userController = require("./controllers/userController");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);

app.post("/api/users", userController.postUser);
app.get("/api/users", userController.getUsers);
app.get("/api/users/:id", userController.getUsersById);

module.exports = app;
