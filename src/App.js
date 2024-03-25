import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./shared/sidebar";
import Home from "./Components/Home";
import AddCourse from "./Components/AddCourse";
import ScheduleLectures from "./Components/ScheduleLectures";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/schedule-lectures" element={<ScheduleLectures />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
