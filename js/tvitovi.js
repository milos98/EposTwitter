var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer ");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

var tvit = $('.tvit').prop('outerHTML');
$("#tvitovi > #template-id").remove();

/*https://cors-anywhere.herokuapp.com/*/

function emputy() {
  let newHTML = tvit.replace('hide', '');
  newHTML = newHTML.replace('template-text', "Pokusajte sa unosom drugog pojma");
  newHTML = newHTML.replace('template-name', "Nema tvitova za zadati pojam");
  $('#tvitovi').append(newHTML);
  $("#link").remove();
}

function populate(res) {
  let statusi = JSON.parse(res);
  console.log(statusi);
  if (statusi["statuses"].length < 1) {
    emputy();
  } else {
    statusi["statuses"].forEach(element => {
        let newHTML = tvit.replace('hide', '');
        newHTML = newHTML.replace('template-text', element.text);
        newHTML = newHTML.replace('template-id', element.id);
        newHTML = newHTML.replace('template-name', element.user.name);
        newHTML = newHTML.replace('template-username', element.user.screen_name);
        newHTML = newHTML.replace('template-username', element.user.screen_name);
        newHTML = newHTML.replace('template-image', element.user.profile_image_url);
        $('#tvitovi').append(newHTML);
    });
  }
}

document.getElementById("search").addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('tvitovi').innerHTML = "";
  let word = document.getElementById("word").value
  console.log(word)
  if (word == "") emputy();
  else fetch("https://api.twitter.com/1.1/search/tweets.json?q=" + word + "&count=100", requestOptions)
    .then(response => response.text())
    .then(result => populate(result))
    .catch(error => console.log('error', error));
})