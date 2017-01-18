
//Function to create DOM elements for artist data.
var showResults = (results) => {
  var resSearch = document.getElementById('list')
    for (let i = 0; i < results.length; i++) {
      var obj = results[i];
      var $artist = document.createElement('div');
      var $name = document.createElement('p');
      var $popularity = document.createElement('p');
      var $genres = document.createElement('p');
      var $img = document.createElement('img');
      var $artDeets = document.createElement('div');

      $name.textContent = 'Artist : ' + obj.name;
      $popularity.textContent = 'Popularity : ' + obj.popularity;
      var genres = '';
      if (obj.genres[i]===undefined) {
        genres = 'No genres listed';
      }
      else {
        genres = obj.genres[i];
      }
      $genres.textContent = 'Genre : ' + genres.toUpperCase();

      $artist.setAttribute('class', 'artist-info');
      $artist.setAttribute('id', 'remove-list');
      $name.setAttribute('id', obj.id);
      $name.setAttribute('class', 'artist-name');

      var img = '';
      if (obj.images[i] === undefined) {
        img = 'https://cdn4.iconfinder.com/data/icons/music-icon-5/24/You-Rock-512.png';
      }
      else {
        img = obj.images[i].url;
      }
      $img.setAttribute('src', img);
      $img.setAttribute('class', 'artist-img');
      $artDeets.setAttribute('class', 'details');

      $artist.appendChild($img);
      $artist.appendChild($artDeets);
      $artDeets.appendChild($name);
      $artDeets.appendChild($popularity);
      $artDeets.appendChild($genres);
      resSearch.appendChild($artist);
  }
  return results;
};

//Function to create the fetch request
var getArtistName = () => {
  var nameField = document.getElementById('artist-name').value;
  var result = document.getElementById('results');
  var list = document.getElementById('list');
  if (nameField.length < 1) {
    result.textContent = 'artist name must contain at least 1 character';
}
  else {
    result.textContent = 'Search Results for: ' + nameField;
    const thenable = fetch('/artists/' + nameField);
    var newList = document.getElementById('remove-list');
    while (list.firstChild) {
    list.removeChild(list.firstChild);
    }
    thenable
      .then(result => result.json())
      .then(showResults)
      .then(results => console.log(results))
      .catch(error => console.error(error));
    }
};

var subButton = document.getElementById('sub-button');
subButton.addEventListener('click', getArtistName, false);


var artistName = document.querySelector('#artist-name');
artistName.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      event.preventDefault();
      getArtistName();
  }
});


var list = document.getElementById('list');
var showID = list.addEventListener('click', nameSubmit, false);

var showAlTracks = list.addEventListener('click', tracksRequest, false);

function nameSubmit() {
  if(event.target.id.length === 22) {
    const thenable = fetch('/albums/' + event.target.id);
    while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
    thenable
      .then(result => result.json())
      .then(showAlbums)
      .then(results => console.log(results))
      .catch(error => console.error(error));
    console.log(event.target.id);
  }
}

var showAlbums = (results) => {
  var albumList = document.getElementById('list')

  for (let i = 0; i < results.length; i ++) {
    var obj = results[i];
    var $artist = document.createElement('div');
    var $info = document.createElement('div')
    var $albumName = document.createElement('p');
    var $artistName = document.createElement('p');
    var $type = document.createElement('p');
    var $img = document.createElement('img');

    $albumName.textContent = obj.name;
    $artistName.textContent = 'Artist: ' + obj.artists[0].name;
    $type.textContent = 'Type: ' + obj.album_type;//.toUpperCase();

    $artist.setAttribute('class', 'artist-info');
    $artist.setAttribute('id', 'remove-list');
    $img.setAttribute('src', obj.images[0].url);
    $img.setAttribute('class', 'artist-img');
    $albumName.setAttribute('class', 'album-name');
    $albumName.setAttribute('id', obj.id);

    $artist.appendChild($img);
    $artist.appendChild($info);
    $info.appendChild($albumName);
    $info.appendChild($type);
    $info.appendChild($artistName);
    albumList.appendChild($artist);
  }
  return results;
};


function tracksRequest() {
  if(event.target.id.length === 22) {
    const thenable = fetch('/tracks/' + event.target.id);
    while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
    thenable
      .then(result => result.json())
      .then(showTracks)
      .then(results => console.log(results))
      .catch(error => console.error(error));
    console.log(event.target.id);
  }
}

var showTracks = (results) => {
  var albumList = document.getElementById('list')

  for (let i = 0; i < results.length; i ++) {
    var obj = results[i];
    var $artist = document.createElement('div');
    var $trackName = document.createElement('span');
    var $artistName = document.createElement('span');
    var $type = document.createElement('span');
    var $trackDetails = document.createElement('div');
    //var $img = document.createElement('img');

    $trackName.textContent = obj.name;
    $artistName.textContent = ' ' + obj.artists[0].name;
    $type.textContent = ' ' + obj.type.toUpperCase() + ' by: ';

    $artist.setAttribute('class', 'artist-info');
    $artist.setAttribute('id', 'remove-list');
    $trackName.setAttribute('class', 'track-name');
    $trackDetails.setAttribute('class', 'track-info');
    $artistName.setAttribute('class', 'track-artist');
    //$img.setAttribute('src', obj.images[0].url);
    //$img.setAttribute('class', 'artist-img');

    //$artist.appendChild($img);
    $artist.appendChild($trackDetails);
    $trackDetails.appendChild($trackName);
    $trackDetails.appendChild($type);
    $trackDetails.appendChild($artistName);
    albumList.appendChild($artist);
  }
  return results;
};
