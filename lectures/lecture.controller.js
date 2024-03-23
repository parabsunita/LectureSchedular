// lecture.controller.js

const Lecture = require("../model/lecture.model");

// Controller functions for CRUD operations on lectures

// Get all lectures
exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single lecture by ID
exports.getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.json(lecture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new lecture
exports.createLecture = async (req, res) => {
  const lecture = new Lecture({
    date: req.body.date,
    instructor: req.body.instructor,
    course: req.body.course,
  });

  try {
    const newLecture = await lecture.save();
    console.log("dh");
    res.status(201).json({ message: "Lecture assigned successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing lecture
exports.updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    lecture.date = req.body.date || lecture.date;
    lecture.instructor = req.body.instructor || lecture.instructor;
    lecture.course = req.body.course || lecture.course;

    const updatedLecture = await lecture.save();
    res.json(updatedLecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a lecture
exports.deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    await lecture.remove();
    res.json({ message: "Lecture deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
