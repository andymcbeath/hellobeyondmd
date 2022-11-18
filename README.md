## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Code Examples](#code-examples)
* [Final Product](#final-product)
## General Info

This is the take home app prompt #2 for BeyondMD. I created a React page that displays my resume and images from an artist search through the Spotify API. I used Material UI to style everything, created a basic test, and followed security guidelines by securing the API key in an .env file. I was also able to Dockerize the project which can be found in mcbeath1/app-prod. If you need access to the Spotify Developer account or any other questions or concerns please email me at mcbeath1@gmail.com.

## Technologies
Project is created with:
* React version: 17.02
* React-spotify-web-playback version: 0.10.0
* sass version: 1.56.1
* Material UI version: 5.10.14 

## Setup
In order to run this application you will need a Spotify Account to see the artist images. You do not need a paid account. You should see this at the bottom of the page:

![Screenshot 2022-11-18 at 1 37 25 PM](https://user-images.githubusercontent.com/107561577/202788178-97206774-989b-43e7-8c2d-eb8e407720e9.png)

Click login to Spotify which will bring you here:
![Screenshot 2022-11-18 at 1 38 20 PM](https://user-images.githubusercontent.com/107561577/202788355-4f848555-cc6b-48c5-bd3f-adc80214cb28.png)

You then login with your spotify account and then you should be able to search titles.

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Code Examples
Spotify API:
```
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
```
Testing:
```
import { render, screen } from "@testing-library/react";
import App from "../App.js";

test("renders the landing page", () => {
  render(<App />);

  expect(screen.getByRole("link")).toHaveTextContent("Login to Spotify");
  expect(screen.getByRole("heading")).toHaveTextContent(/Hello BeyondMD!/);
});
```
App.js file:
```
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
```
Resume:
```
import resume from "./AndyMcBeathResume.pdf";

const Resume = () => {
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return <iframe height="1100" width="100%" src={resume} />;
};

export default Resume;
```
## Final Product
![Screenshot 2022-11-18 at 2 25 22 PM](https://user-images.githubusercontent.com/107561577/202796065-4f0ddb7b-f932-41b3-9915-4c2fd7b1c6b2.png)

