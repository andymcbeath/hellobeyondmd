import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SearchAppBar from "./compononents/AppBar";
import Resume from "./compononents/Resume";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import { IconButton } from "@mui/material";

function App() {
  const CLIENT_ID = "b3a9f5cec1614bc4958ff8febc440e24";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

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
    window.localStorage.removeItem("token");
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
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        alignItems: "center",
      }}
    >
      <Stack spacing={2}>
        <Item>
          <SearchAppBar />
        </Item>
        <Item>
          <Resume />
        </Item>
        <div className="App">
          <header className="App-header">
            <h1>Hello Beyond MD!</h1>
            {!token ? (
              <a
                href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              >
                Login to Spotify
              </a>
            ) : (
              <IconButton
                sx={{
                  color: "white",
                  border: "black",
                  outline: "5px",
                  outlineColor: "red",
                }}
                onClick={logout}
              >
                Logout
              </IconButton>
            )}

            {token ? (
              <form onSubmit={searchArtists}>
                <input
                  type="text"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <Button variant="outlined" size="small" type={"submit"}>
                  Search
                </Button>
              </form>
            ) : (
              <h2>Please login</h2>
            )}
            <Box
              sx={{
                marginTop: 3,
                width: 500,
                height: 400,
                overflowY: "scroll",
                alignItems: "center",
              }}
            >
              <ImageList
                variant="woven"
                cols={3}
                gap={8}
                sx={{ width: 500, height: 450 }}
                rowHeight={300}
                textAlign="center"
                position="below"
                alignItems="center"
              >
                {renderArtists()}
              </ImageList>
            </Box>
          </header>
        </div>
      </Stack>
    </Box>
  );
}

export default App;
