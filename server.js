import app from "./app.js";
const PORT = process.env.PORT || 3000;

//set the server to listen at port
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
