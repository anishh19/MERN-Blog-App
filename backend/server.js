const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlleware/errorMiddleware");

const port = process.env.port || 5000;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));

//api route from file
app.use("/api", require("./routes/blogPosts"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
