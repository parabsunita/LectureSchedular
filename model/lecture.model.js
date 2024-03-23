const mongoose = require("mongoose");
const { Schema } = mongoose;

const lectureSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

// Define a pre-save middleware to check for scheduling clashes
lectureSchema.pre("save", async function (next) {
  try {
    const { date, instructor, _id } = this;
    console.log(date);
    const clashes = await this.model("Lecture").find({
      instructor,
      date: date,
      _id: { $ne: _id }, // Exclude current lecture from the query
    });
    console.log(clashes);
    if (clashes.length > 0) {
      throw new Error(
        "Scheduling clash: Instructor is already booked for another lecture on this date."
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
