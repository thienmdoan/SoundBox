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
    $genres.textContent = 'Genre : ' + obj.genres[i].toUpperCase();

    $artist.setAttribute('class', 'artistInfo');
    $artist.setAttribute('id', 'removeList');
    $name.setAttribute('id', obj.id);
    $name.setAttribute('class', 'artName');
    $img.setAttribute('src', obj.images[i].url);
    $img.setAttribute('class', 'artistImg');
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
  var nameField = document.getElementById('artistName').value;
  var result = document.getElementById('results');
  var list = document.getElementById('list');
  if (nameField.length < 1) {
    result.textContent = 'artist name must contain at least 1 character';
}
  else {
    result.textContent = 'Search Results for: ' + nameField;
    const thenable = fetch('/artists/' + nameField);
    var newList = document.getElementById('removeList');
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

var subButton = document.getElementById('subButton');
subButton.addEventListener('click', getArtistName, false);


var artistName = document.querySelector('#artistName');
artistName.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      event.preventDefault();
      getArtistName();
  }
});


var list = document.getElementById('list');
var showID = list.addEventListener('click', myClick, false);


function myClick() {
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
    var $albumName = document.createElement('div');
    var $artistName = document.createElement('p');
    var $type = document.createElement('p');
    var $img = document.createElement('img');

    $albumName.textContent = obj.name;
    $artistName.textContent = 'Artist: ' + obj.artists[0].name;
    $type.textContent = 'Type: ' + obj.album_type.toUpperCase();

    $artist.setAttribute('class', 'artistInfo');
    $artist.setAttribute('id', 'removeList');
    $img.setAttribute('src', obj.images[0].url);
    $img.setAttribute('class', 'artistImg');

    $artist.appendChild($img);
    $artist.appendChild($albumName);
    $albumName.appendChild($type);
    $albumName.appendChild($artistName);
    albumList.appendChild($artist);
  }
  return results;
};
