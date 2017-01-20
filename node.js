
const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require('body-parser');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'occs',
    database: 'soundbox'
  }
});

const spotifyApi = new SpotifyWebApi({
 clientId: process.env.MY_ID,
 clientSecret: process.env.MY_SECRET_NUMBER,
 redirectUri: "http://www.example.com/callback"
});

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var PORT = process.env.MY_PORT;

app.get('/artists/:name', (req, res) => {
  const search = req.params.name;
  const name = JSON.stringify(search);
     spotifyApi
      .searchArtists(name,{ limit: 10, offset: 0 })
      .then(data => data.body.artists.items)
      .then(data => res.json(data))
      .catch(error => console.error(error));
});

app.get('/albums/:id', (req, res) => {
  var id = req.params.id;
  spotifyApi
    .getArtistAlbums(id, { limit: 20, offset: 1 })
    .then(data => data.body.items)
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

app.get('/tracks/:id', (req, res) => {
  var id = req.params.id;
  spotifyApi
    .getAlbumTracks(id)
    .then(data => data.body.items)
    .then(data => res.json(data))
    .catch(error => console.error(error));
});


app.get('/related/:id', (req, res) => {
  var id = req.params.id;
  spotifyApi
    .getArtistRelatedArtists(id)
    .then(data => data.body.artists)
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

app.listen(PORT || 3000, function () {
  console.log('listening on port ' + PORT);
});
