import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import axiosService from "../shared/axiosService";

const Home = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosService.get("/schedule-lecture");
        setLectures(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5" gutterBottom>
        Scheduled Lectures
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="lecture table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lectures.map((lecture) => (
              <TableRow key={lecture._id}>
                <TableCell>{lecture.date}</TableCell>
                <TableCell>{lecture.instructor}</TableCell>
                <TableCell>{lecture.course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  
  );
};

export default Home;
