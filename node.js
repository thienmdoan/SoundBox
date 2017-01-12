
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
    .then(data => console.log('Search artists', data.body.artists.items[0]))
    .then(data => res.json(data))
    res.json(data)
    /*
    var map = (collection, transform) => {
      let obj = [];
      for (let i = 0; i < collection.length; i++){
      obj.push(transform(collection[i]));
      }
      return obj;
    }
    var $items = document.createElement('div');
    var $name = document.createElement('p');
    var $genres = document.createElement('p');
    var $popularity = document.createElement('p');
    $items.textContent = items;
    $name.textContent = name;
    $genres.textContent = genres;
    $popularity.textContent = popularity;
    body.appendChild($items);
    items.appendChild($name);
    items.appendChild($genres);
    items.appendChild($popularity);
    */
});


app.get('/data', (req, res) => {
   res.json({ data: 'This is my Data'});
 });




//https://api.spotify.com/v1/search?query=phoenix&offset=0&limit=20&type=artist
