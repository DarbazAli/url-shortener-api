const express = require('express')

const app = express();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use(express.static(__dirname + '/public'));

// create the home url
app.get('/', (req, res) => {
    res.render('index', {title: 'Home', message: "Hello There"})
})

app.get('/about', (req, res) => {
    res.render('about')
})

/*============= OUTLINE ===========*/
/* 
  Create a MongoDB database on MongoDB Atlas.
  Install all the required npm packages.
  Define the environment variables.
  Create an express server.
  Connect to the database.
  Create the URL Model.
  Create the API routes post and get methods.
 */

 // 1. Create a MongoDB database on MongoDB Atlas.

 