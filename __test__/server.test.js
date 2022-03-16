import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);
describe("GET /movie", () => {
	test("Should return 200 status code with movie of id === 1", async () => {
		const response = await request.get("/movie/1");
		expect(response.statusCode).toBe(200);
	});

	test("Should return 404 status code if the ID of a movie is not unique or not found ", async () => {
		const response = await request.get("/movie/xxxx");
		expect(response.statusCode).toBe(404);
		expect(response.text).toBe("Movie not found");
	});
});

describe("POST /movie", () => {
	test("Should return 200 status code if the request should include id, title, director and releaseDate fields", async () => {
		const response = await request.post("/movie").send({
			id: "3",
			title: "Spider Man",
			director: "Jon Watts",
			releaseDate: "2011",
		});
		expect(response.statusCode).toBe(200);
	});
	test("Should return 404 status code if one of the property fields is missing", async () => {
		const response = await request.post("/movie").send({
			director: "Rickky",
			releaseDate: "2014",
		});
		expect(response.statusCode).toBe(404);
	});
});

describe("DELETE /movie", () => {
	test("Should return 404 status code if the id of movie is wrong", async () => {
		const response = await request.delete("/movie").send({
			id: "5",
		});
		expect(response.statusCode).toBe(404);
	});
	test("Should return 200 status code if id of the movie is correct.", async () => {
		const response = await request.delete("/movie/1");
		expect(response.statusCode).toBe(200);
	});
});

describe("PATCH /movie", () => {
	test("Should return 404 status code if the given ID does not exist in the movies list", async () => {
		const response = await request.patch("/movie/xxxx");
		expect(response.statusCode).toBe(404);
	});

	test("The request should contain at least one fields from title or director or releaseDate", async () => {
		const response = await request.patch("/movie/2").send({ title: "The Truman Show" });
		expect(response.statusCode).toBe(200);
	});
});

describe("PUT /movie", () => {
	test("Should return 404 status code if the given ID does not exist in the movies list", async () => {
		const response = await request.put("/movie/xxxx");
		expect(response.statusCode).toBe(404);
	});
	test("Should return 400 status code if the request does not contain title and director and releaseDate", async () => {
		const response = await request.put("/movie/2").send({ title: "Green Mile" });
		expect(response.statusCode).toBe(400);
	});
	test("Should return 200 status code if the request contains title and director and releaseDate", async () => {
		const response = await request.put("/movie/2").send({
			title: "Green Mile",
			director: "Frank Darabont",
			releaseDate: "1999",
		});
		expect(response.statusCode).toBe(200);
	});
});
