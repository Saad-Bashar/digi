b. So far I have worked on authentication for web services, I had to use access-token. Which I think is pretty good solution for the api to be secured. And it is also very easy to implement. So client needs to first login to the particular site and I need to get the token sent from the backend which I can store and use it for all the apis to be authenticated. It can be easily implemented in all the programming languages as well. I can send an extra header object for request which can contain the access-token like this

```
const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'your-token'
});

```
