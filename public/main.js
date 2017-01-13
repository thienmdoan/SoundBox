var getArtistName = () => {
  var nameField = document.getElementById('artistName').value;
  var result = document.getElementById('results');
  if (nameField.length < 1) {
    result.textContent = 'artist name must contain at least 1 character';
} else {
    result.textContent = 'Search Results for: ' + nameField;
    const thenable = fetch('/artists/' + nameField);

    thenable
      .then(result => result.json())
      .then(result => (result))
      .then(result => console.log( data = result))
      .catch(error => console.error(error));


      //document.body.textContent = data;
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

function renderArtists(artistName) {
  let element = [];
  for (let i = 0; i < artistName.length; i++) {
    const {name, popularity} = artistName[i];
    const $artist = document.createElement('div');
    const $name = document.createElement('p');
    const $popularity = document.createElement('p');

    $name.textContent = name;
    $popularity.textContent = popularity;

    $artist.appendChild($name);
    $artist.appendChild($popularity);
    elements.push($artists);
  }
  return element
}

for (let i = 0; i < artistName.length; i++) {
  results.appendChild(renderArtists(artistName)[i]);
}



var thenable = fetch('/data');

thenable
  .then((result) => result.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error))


/*
    var map = (collection, transform) => {
      let obj = [];
      for (let i = 0; i < collection.length; i++){
      obj.push(renderDetails(collection[i]));
      }
      return obj;
    }


var renderDetails = (results) => {
    var $items = document.createElement('div');
    var $name = document.createElement('p');
    var $genres = document.createElement('p');
    var $popularity = document.createElement('p');

    $name.textContent = name;
    $genres.textContent = genres;
    $popularity.textContent = popularity;

    body.appendChild($items);
    items.appendChild($name);
    items.appendChild($genres);
    items.appendChild($popularity);
  };
*/
