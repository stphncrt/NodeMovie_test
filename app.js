import express from "express";
import movieRoutes from "./routes/moviesRoute.js";
const app = express();

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/movie", movieRoutes);

export default app;
