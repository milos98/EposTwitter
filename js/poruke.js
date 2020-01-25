var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAGiyBwEAAAAAkOQlDtvIQBGJpnGq9nQy3y%2BpRms%3DlF9dYKaPysSdG7QvCUxKd0gHmo9JL6pFzZH8IajDFTrEE113xS");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

var tvit = $('.tvit').prop('outerHTML');
$("#tvitovi > #template-id").remove();

/*https://cors-anywhere.herokuapp.com/*/

function populate(res) {
  let statusi = JSON.parse(res);
  console.log(statusi);
  statusi["statuses"].forEach(element => {
      let newHTML = tvit.replace('hide', '');
        newHTML = newHTML.replace('template-text', element.text);
        newHTML = newHTML.replace('template-id', element.id);
        newHTML = newHTML.replace('template-username', element.user.screen_name);
        newHTML = newHTML.replace('template-username', element.user.screen_name);
        $('#tvitovi').append(newHTML);
    });
}

fetch("https://api.twitter.com/1.1/direct_messages/events/list.json", requestOptions)
    .then(response => response.text())
    .then(result => populate(result))
    .catch(error => console.log('error', error));