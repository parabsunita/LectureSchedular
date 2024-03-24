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
    <Container textAlign="center" mt={2}>
      <Typography  variant="h5" fontWeight="bold" gutterBottom>
        Scheduled Lectures
      </Typography>
      <Box height="70vh" overflow="auto"  bgcolor="grey" color="white">
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
    </Container>
  );
};

export default Home;
