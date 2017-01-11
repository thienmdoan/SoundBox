
const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
 clientId: "ae85dc567f624d11b90b2f3ccf5ed96f",
 clientSecret: "e1c7b305a8b64f21bca25dc0bfacd306",
 redirectUri: "http://www.example.com/callback"
});

const app = express();

app.use(express.static('public'));


app.listen(3000, () => {
  console.log('listening to port 3000');
});


spotifyApi.getArtistAlbums("2mV8aJphiSHYJf43DxL7Gt", { limit: 5, offset: 0 }).then(function(data) {
 console.log("Artist albums", data.body);
}, function(err) {
 console.error(err);
});

spotifyApi
 .getAlbumTracks("7iZU6KMPD0iT7QqtMkTmL1", { limit: 5, offset: 0 })
 .then(
   function(data) {
     console.log(data.body);
   },
   function(err) {
     console.log("Something went wrong!", err);
   }
 );

//https://api.spotify.com/v1/search?query=phoenix&offset=0&limit=20&type=artist
