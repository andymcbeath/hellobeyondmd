import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Resume from "./components/Resume";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import TextField from "@mui/material/TextField";
import "./Styles/App.css";
import Stack from "@mui/system/Stack";



  return (
    <div className="App">
      <h1>Hello Beyond MD!</h1>
      <Paper>
        <Resume />
      </Paper>
      {token ? (
        <Paper className="spotify">
          <form onSubmit={searchArtists}>
            <TextField
              id="filled-basic"
              label="Search Artist"
              variant="filled"
              paddingBottom="20px"
              type="text"
              fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <Stack alignItems={"center"} paddingBottom="20px" paddingTop="20px">
              <Button
                variant="outlined"
                sx={{
                  fontSize: "large",
                  fontFamily:
                    "Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                }}
                onClick={logout}
              >
                Logout
              </Button>
            </Stack>
          </form>
        </Paper>
      ) : (
        <div className="login">
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${TOKEN}`}
          >
            Login to Spotify
          </a>
          <p>Please login</p>
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: "100%",
            position: "center",
          },
        }}
      >
        <ImageList
          variant="woven"
          cols={4}
          gap={8}
          sx={{ width: 500, height: 450 }}
          rowHeight={300}
          textalign="center"
          alignitems="center"
          aligncontent="center"
          alignproperty="center"
        >
          {renderArtists()}
        </ImageList>
      </Box>
    </div>
  );
}

export default App;
