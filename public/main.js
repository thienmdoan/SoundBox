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
//Event listener for the submit button for the artist search.
var subButton = document.getElementById('sub-button');
subButton.addEventListener('click', getArtistName, false);
//Event listener for the enter button to search for artist.
var artistName = document.querySelector('#artist-name');
artistName.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      event.preventDefault();
      getArtistName();
  }
});
//Event listener for when clicking on the artist to show album.
var list = document.getElementById('list');
var showID = list.addEventListener('click', nameSubmit, false);
//Event listener for click on an album
var showAlTracks = list.addEventListener('click', tracksRequest, false);
//Saves the artist's name as a variable to send a get request for that item.
function nameSubmit() {
  if(event.target.className == "artist-name"){
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
//Renders albums by a selected artist.
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
    $type.textContent = 'Type: ' + obj.album_type.toUpperCase();

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
//Sends a request for the albums tracks.
function tracksRequest() {
  if(event.target.className == "album-name"){
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
//Renders tracks from selected album.
var showTracks = (results) => {
  var albumList = document.getElementById('list')

  for (let i = 0; i < results.length; i ++) {
    var obj = results[i];
    var $artist = document.createElement('div');
    var $trackName = document.createElement('span');
    var $artistName = document.createElement('span');
    var $type = document.createElement('span');
    var $trackDetails = document.createElement('div');
    var $audio = document.createElement('audio');
    var $aSource = document.createElement('source');

    $trackName.textContent = obj.name;
    $artistName.textContent = ' ' + obj.artists[0].name;
    $type.textContent = ' ' + obj.type + ' by: ';

    $artist.setAttribute('class', 'artist-track-info');
    $artist.setAttribute('id', 'remove-list');
    $trackName.setAttribute('class', 'track-name');
    $trackDetails.setAttribute('class', 'track-info');
    $artistName.setAttribute('class', 'track-artist');
    $artistName.setAttribute('id', obj.artists[0].name);
    $audio.setAttribute('controls', 'controls');
    $aSource.setAttribute('src', obj.preview_url);
    $trackName.setAttribute('id', obj.id);

    $artist.appendChild($trackDetails);
    $trackDetails.appendChild($trackName);
    $trackDetails.appendChild($type);
    $trackDetails.appendChild($artistName);
    albumList.appendChild($artist);
    $artist.appendChild($audio);
    $audio.appendChild($aSource);
  }
  return results;
};
//Event listener for pause other tracks when another is played.
document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);


//Event listener for adding tracks to favorites and seaching for
list.addEventListener('click',function() {
  if(event.target.className == 'track-name') {
    console.log(event.target.id);
  }
  else if(event.target.className == 'track-artist') {
    const thenable = fetch('/artists/' + event.target.id);
    var newList = document.getElementById('remove-list');
    while (list.firstChild) {
    list.removeChild(list.firstChild);
    }
    thenable
      .then(result => result.json())
      .then(showResults)
      .then(results => console.log(results))
      .catch(error => console.error(error));
    console.log(event.target.id);
  }
}, false);


/*
var $main = document.getElementById('main')

function show(view, item) {
  var $active = view.getElementsByClassName('active')[0]
  $active.classList.add('hidden')
  $active.classList.remove('active')
  item.classList.remove('hidden')
  item.classList.add('active')
}

var $navigation = document.getElementById('navigation')
$navigation.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    var id = event.target.dataset.id
    var $item = document.getElementById(id)
    var $main = document.getElementById('main')
    show($main, $item)
  }
})
*/
