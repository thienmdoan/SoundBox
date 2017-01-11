var data = {
    "firstName":"Thien",
    "lastName":"Doan",
    "joined":"2017"
      };

document.getElementById("placeholder").innerHTML = data.firstName+" "+data.lastName+" "+data.joined;
const setup = () => {
  loadJSON('https://api.spotify.com/v1/search?query=phoenix&offset=0&limit=1&type=artist', gotData)
};
const gotData = (data) => {
  console.log(data);
};
