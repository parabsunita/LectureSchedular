// instructor.route.js

const express = require("express");
const router = express.Router();
const instructorController = require("./instructors.controller");

// Routes for CRUD operations on instructors

// GET all instructors
router.get("/", instructorController.getAllInstructors);

// GET a single instructor by ID
router.get("/:id", instructorController.getInstructorById);

// POST create a new instructor
router.post("/", instructorController.createInstructor);

// PUT update an existing instructor
router.put("/:id", instructorController.updateInstructor);

// DELETE an instructor
router.delete("/:id", instructorController.deleteInstructor);

module.exports = router;
