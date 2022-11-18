import React from "react";
import Resume from "./components/Resume";
import Paper from "@mui/material/Paper";
import "./Styles/App.css";
import SpotifyWebPlayer from "./components/SpotifyPlayer";
import Toolbar from "@mui/material/Toolbar";

function App() {
  return (
    <div className="App">
      <Toolbar
        sx={{
          background: "white",
          justifyContent: "space-between",
          alignContent: "center",
          textAlign: "center",
          fontSize: "xx-large",
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
      >
        Andy McBeath
        <h1>Hello BeyondMD!</h1>
        <img
          marginleft="50px"
          src="https://photos.angel.co/startups/i/8567737-8ea3d65202e732cbc811253294a3d8f6-medium_jpg.jpg?buster=1635194583"
          alt="Kitten"
          height="80"
          width="90"
        />
      </Toolbar>
      <Paper elevation={6}>
        <Resume />
      </Paper>
      <Paper elevation={6}>
        <SpotifyWebPlayer />
      </Paper>
    </div>
  );
}

export default App;
