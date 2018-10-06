
**1st question**

Get - HTTTP method get is used for getting information. So let's say I want to retrieve all the digi employers information so in that scenerio I would just call a get method, something like this --

```
fetch('http://digi.com/employees')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  console.log(JSON.stringify(myJson));
});
```

Post - HTTTP method post is used for sending or posting information to a certain. So let's say I want to create a new user profile  so in that scenerio I would just call a post method, something like this --

```
// Example POST method implementation:

postData(`http://digi.com/newEmployee`, {employee: {name: 'saad', post: 'developer'})
  .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
  .catch(error => console.error(error));

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
}
```

Put - HTTP method put is used to create a new object or update an existing one. So in case of adding a new employee or updating an existing one, we can use put in that place. 

```
var request = new Request('https://digi.com/newOrEditEmployee', {
	method: 'PUT', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'Content-Type': 'text/plain'
	})
});

fetch(request).then(function() { /* handle response */ });
```

UPDATE - Not sure if there is any actual method called "UPDATE". As far as I know we use Patch to update a specified resources. In that case we just call patch to update an existing record. The code example should be exaclty same like the previous ones, but we just need to use method: PATCH

