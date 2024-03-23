// course.route.js

const express = require("express");
const router = express.Router();
const courseController = require("./course.controller");

// Routes for CRUD operations on courses

// GET all courses
router.get("/", courseController.getAllCourses);

// GET a single course by ID
router.get("/:id", courseController.getCourseById);

// POST create a new course
router.post("/", courseController.createCourse);

// PUT update an existing course
router.put("/:id", courseController.updateCourse);

// DELETE a course
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
