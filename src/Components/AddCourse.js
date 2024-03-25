import React, { useState } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Snackbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import axiosService from "../shared/axiosService";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    level: "", // Initialize level state
    description: "",
    image: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosService
      .post("/course", courseData)
      .then((response) => {
        console.log("Course added:", response.data);
        // Show success Snackbar
        setSnackbarSeverity("success");
        setSnackbarMessage("Course added successfully!");
        setOpenSnackbar(true);
        // Clear form fields
        setCourseData({
          name: "",
          level: "",
          description: "",
          image: "",
        });
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        // Show error Snackbar
        setSnackbarSeverity("error");
        setSnackbarMessage("Error adding course. Please try again later.");
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ width: "50%", textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={courseData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="level-label">Level</InputLabel>
              <Select
                labelId="level-label"
                id="level"
                value={courseData.level}
                onChange={handleChange}
                name="level"
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={courseData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={courseData.image}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Add Course
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Snackbar for notification */}
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
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddCourse;
