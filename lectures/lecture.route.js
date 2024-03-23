// lecture.route.js

const express = require("express");
const router = express.Router();
const lectureController = require("./lecture.controller");

// GET all lectures
router.get("/", lectureController.getAllLectures);

// GET a single lecture by ID
router.get("/:id", lectureController.getLectureById);

// POST create a new lecture
router.post("/", lectureController.createLecture);

// PUT update an existing lecture
router.put("/:id", lectureController.updateLecture);

// DELETE a lecture
router.delete("/:id", lectureController.deleteLecture);

module.exports = router;
