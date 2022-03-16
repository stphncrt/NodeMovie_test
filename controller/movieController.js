import { v4 as uuidv4 } from "uuid";
let movies = [
	{
		id: "1",
		title: "Inception",
		director: "Christopher Nolan",
		releaseDate: "2010-07-16",
	},
	{
		id: "2",
		title: "The Irishman",
		director: "Martin Scorsese",
		releaseDate: "2019-09-27",
	},
];
//show all the movies;
export const getMovies = (req, res) => res.status(200).send(movies);
//add movies to the list
export const createMovie = (req, res) => {
	const movie = req.body;
	if (!movie.title || !movie.director || !movie.releaseDate) {
		res.status(404).send("You need to provide all information for this movie");
	}
	movies.push({ ...movie, id: uuidv4() });
	res.status(200).send(`New movie with the ID: ${movie.id} added to database.`);
};
//search for a movie in the list
export const searchMovie = (req, res) => {
	const { id } = req.params;
	const foundMovie = movies.find((movie) => movie.id === id);
	if (foundMovie) {
		res.status(200).send(foundMovie);
	}
	res.status(404).send("Movie not found");
};
//remove the movie from the list
export const deleteMovie = (req, res) => {
	const { id } = req.params;
	const foundMovie = movies.find((movie) => movie.id === id);
	if (foundMovie) {
		movies = movies.filter((movie) => movie.id !== id);
		res.status(200).send(`Movie with the ID: ${id} deleted from the database`);
		res.send(movies);
	}
	res.status(404).send("Movie not found");
};

//update the movie in the database
export const modifyMovie = (req, res) => {
	const { id } = req.params;
	const { title, director, releaseDate } = req.body;
	const foundMovie = movies.find((movie) => movie.id === id);
	if (foundMovie) {
		if (title) foundMovie.title = title;
		if (director) foundMovie.director = director;
		if (releaseDate) foundMovie.releaseDate = releaseDate;
		res.status(200).send(`Movie with the ID: ${id} has been updated`);
	}
	res.status(404).send("Movie not found");
};

export const updateMovie = (req, res) => {
	const { id } = req.params;
	const { title, director, releaseDate } = req.body;
	const foundMovie = movies.find((movie) => movie.id === id);
	if (foundMovie) {
		const newMovie = req.body;
		if (newMovie.title && newMovie.director && newMovie.releaseDate) {
			foundMovie.title = title;
			foundMovie.director = director;
			foundMovie.releaseDate = releaseDate;
			res.status(200).send(`The movie with the ID: ${id} has been updated.`);
		} else {
			res.status(400).send("The movie has to have a title, director and release date");
		}
	} else {
		res.status(404).send("Movie not found");
	}
};
