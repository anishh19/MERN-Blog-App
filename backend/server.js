const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.port || 5000;

connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));

//api route from file
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
