var submit = document.getElementById('submit');
var name = document.getElementById('artist');

submit.addEventListener('click', function(event) {
  event.preventDefault();
  //console.log(event.target.nodeName);
  if(event.target.nodeName === BUTTON) {
     var
     }
}

const thenable = fetch('/artists/:name');

thenable
  .then((result) => result.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error))


  const thenable1 = fetch('/data');


  thenable1
    .then((result) => result.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
