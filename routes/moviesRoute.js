import express from "express";
import {
	createMovie,
	getMovies,
	searchMovie,
	deleteMovie,
	updateMovie,
	modifyMovie,
} from "../controller/movieController.js";
const router = express.Router();
//show all the movies;
router.get("/", getMovies);
//add movies to the list
router.post("/", createMovie);
//search for a movie in the list
router.get("/:id", searchMovie);
//remove the movie from the list
router.delete("/:id", deleteMovie);
//modify the movie
router.patch("/:id", modifyMovie);
//update the movie
router.put("/:id", updateMovie);

export default router;
