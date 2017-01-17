
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

    $name.textContent = 'Artist : ' + obj.name;
    $popularity.textContent = 'Popularity: ' + obj.popularity;
    $genres.textContent = 'Genre: ' + obj.genres[i];

    $artist.setAttribute('class', 'artistInfo');
    $artist.setAttribute('id', 'removeList');
    $name.setAttribute('id', 'artistDeets');
    $img.setAttribute('src', obj.images[i].url);
    $img.setAttribute('class', 'artistImg');

    $artist.appendChild($img);
    $artist.appendChild($name);
    $name.appendChild($popularity);
    $name.appendChild($genres);
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
} else {
    result.textContent = 'Search Results for: ' + nameField;
    const thenable = fetch('/artists/' + nameField);
    var newList = document.getElementById('removeList');
    while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

    thenable
      .then(result => result.json())
      .then(showResults)
      .then(result => console.log(result))
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
