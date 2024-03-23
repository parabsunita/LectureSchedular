const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const instructorsRouter = require("./instructors/instructors.route");
const coursesRouter = require("./courses/course.route");
const lecturesRouter = require("./lectures/lecture.route");

app.use("/api/instructors", instructorsRouter);
app.use("/api/course", coursesRouter);
app.use("/api/schedule-lecture", lecturesRouter);

module.exports = app;
