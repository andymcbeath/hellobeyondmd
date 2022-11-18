import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import TextField from "@mui/material/TextField";
import "../Styles/App.css";
import Stack from "@mui/system/Stack";

const SpotifyWebPlayer = () => {
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

  return (
    <Paper>
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
    </Paper>
  );
};

export default SpotifyWebPlayer;
