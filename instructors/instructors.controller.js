// instructor.controller.js

const Instructor = require("../model/instructors.model");

// Controller functions for CRUD operations on instructors

// Get all instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new instructor
exports.createInstructor = async (req, res) => {
  const instructor = new Instructor({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const newInstructor = await instructor.save();
    res.status(201).json(newInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing instructor
exports.updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    instructor.name = req.body.name || instructor.name;
    instructor.email = req.body.email || instructor.email;

    const updatedInstructor = await instructor.save();
    res.json(updatedInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an instructor
exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    await instructor.remove();
    res.json({ message: "Instructor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
