import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Resume from "./components/Resume";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import { IconButton } from "@mui/material";
import "./App.scss";

// import AppBar from "./compononents/AppBar";

function App() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT;
  const TOKEN = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem(TOKEN);
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">Hello Beyond MD!</h1>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflowY: "scroll",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Stack spacing={1}>
            <Item>
              <Resume />
            </Item>
            {token ? (
              <div className="spotify">
                <IconButton
                  sx={{
                    color: "whitesmoke",
                    border: "blackh",
                    outline: "5px",
                    outlineColor: "red",
                  }}
                  onClick={logout}
                >
                  Logout
                </IconButton>
                <form onSubmit={searchArtists}>
                  <input
                    type="text"
                    fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    defaultValue={"Artist name here"}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <Button variant="outlined" size="small" type={"submit"}>
                    Search
                  </Button>
                </form>
              </div>
            ) : (
              <div className="App">
                <a
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${TOKEN}`}
                >
                  Login to Spotify
                </a>
                <h2 className="App">Please login</h2>
              </div>
            )}
            <Box
              sx={{
                marginTop: 3,
                width: 900,
                height: 1000,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                WebkitAlignContent: "center",
              }}
            >
              <ImageList
                variant="woven"
                cols={4}
                gap={8}
                sx={{ width: 800, height: 1000 }}
                rowHeight={300}
                marginleft="3"
                textAlign="center"
                position="below"
                alignItems="center"
                alignContent="center"
              >
                {renderArtists()}
              </ImageList>
            </Box>
          </Stack>
        </Box>
      </header>
    </div>
  );
}

export default App;
