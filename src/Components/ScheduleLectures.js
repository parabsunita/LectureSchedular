import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import axiosService from "../shared/axiosService";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 100,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ScheduleLectures = () => {
  const [lectureData, setLectureData] = useState({
    course: "",
    instructor: "",
    date: "",
  });
  const [selectedCourse, setselectedCourse] = useState("Select Course");
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch instructors
        const instructorsResponse = await axiosService.get("/instructors");
        setInstructors(instructorsResponse.data);

        // Fetch courses
        const coursesResponse = await axiosService.get("/course");
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackbarMessage("Error fetching data. Please try again later.");
        setOpenSnackbar(true);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!lectureData.course || !lectureData.instructor || !lectureData.date) {
      setAlertSeverity("error");
      setSnackbarMessage("Please fill in all required fields");
      setOpenSnackbar(true);
      return;
    }
    axiosService
      .post("/schedule-lecture", lectureData)
      .then((response) => {
        // Success handling
        console.log("Lecture scheduled successfully:", response.data);
        // Show success snackbar
        setSnackbarMessage("Lecture scheduled successfully!");
        setAlertSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        // Error handling
        console.error("Error scheduling lecture:", error);
        // Determine severity based on the error response
        const severity = error.response ? "error" : "warning";
        const message = error.response
          ? error.response.data.message
          : "Something went wrong. Please try again later.";
        setSnackbarMessage(message);
        setAlertSeverity(severity);
        setOpenSnackbar(true);
      });
  };

  const handleChange = (event) => {
    setSelectedInstructor(event.target.value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        margin: "0 auto",
        backgroundColor: "#ffffff", // Change background color here
        padding: "2rem", // Adjust padding as needed
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              gutterBottom
            >
              Schedule Lecture
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="course-label">Select Course</InputLabel>
              <Select
                labelId="course-label"
                id="course-select"
                value={lectureData.course}
              >
                {courses.map((course) => (
                  <MenuItem
                    key={course._id}
                    value={course._id}
                    id={course._id}
                    onClick={(e) => {
                      setLectureData({
                        ...lectureData,
                        course: e.target.id,
                      });
                      setselectedCourse(e.target.textContent);
                    }}
                  >
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <StyledFormControl fullWidth>
              <InputLabel id="instructor-label">Select Instructor</InputLabel>
              <Select
                labelId="instructor-label"
                id="instructor-select"
                value={selectedInstructor}
                label="Select Instructor"
                onChange={handleChange}
              >
                {instructors.map((instructor) => (
                  <MenuItem
                    key={instructor._id}
                    value={instructor._id}
                    id={instructor._id}
                    onClick={(e) => {
                      setLectureData({
                        ...lectureData,
                        instructor: e.target.id,
                      });
                    }}
                  >
                    {instructor.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              value={lectureData.date}
              onChange={(e) =>
                setLectureData({ ...lectureData, date: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Schedule Lecture
            </StyledButton>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: "100%" }}
          autoHideDuration={6000}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ScheduleLectures;
