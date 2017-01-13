
const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require('body-parser');

const spotifyApi = new SpotifyWebApi({
 clientId: "ae85dc567f624d11b90b2f3ccf5ed96f",
 clientSecret: "e1c7b305a8b64f21bca25dc0bfacd306",
 redirectUri: "http://www.example.com/callback"
});

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('listening to port 3000');
});


app.get('/artists/:name', (req,res) => {
const search = req.params.name;
const name = JSON.stringify(search);
   spotifyApi
    .searchArtists(name,{ limit: 5, offset: 0 })
    .then(data => data.body.artists.items)
    .then(data => res.json(data));
});


app.get('/data', (req, res) => {
   res.json({ data: 'This is my Data'});
 });




//https://api.spotify.com/v1/search?query=phoenix&offset=0&limit=20&type=artist
