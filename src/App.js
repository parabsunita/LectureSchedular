import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./shared/sidebar";
import Home from "./Components/Home";
import AddCourse from "./Components/AddCourse";
import ScheduleLectures from "./Components/ScheduleLectures";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
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
      </main>
    </ThemeProvider>
  );
}

export default App;
