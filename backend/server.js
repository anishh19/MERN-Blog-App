const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.port || 5000;

connectDB();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));

//api route from file
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
