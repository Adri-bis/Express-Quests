require("dotenv").config();
const express = require("express");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userController = require("./controllers/userController");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);

app.post("/api/users", validateUser, userController.postUser);
app.get("/api/users", userController.getUsers);
app.get("/api/users/:id", userController.getUsersById);
app.put("/api/users/:id", validateUser, userController.updateUser);

module.exports = app;
