import React from "react";
import { Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Panel
      </Typography>
      <Typography variant="body1" paragraph>
        This is the home page of the admin panel.
      </Typography>
      <Typography variant="body1">
        You can use the sidebar to navigate to different sections.
      </Typography>
    </Container>
  );
};

export default Home;
