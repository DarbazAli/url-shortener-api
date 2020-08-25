const express = require('express')
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Schema = mongodb.Schema;

require('dotenv').config();

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
  Create a MongoDB database on MongoDB Atlas. -> DONE
  Install all the required npm packages. -> DONE
  Define the environment variables. -> DONE
  Create an express server. -> DONE
  Connect to the database. -> DONE
  Create the URL Model.
  Create the API routes post and get methods.
 */


 /*============= 1. Create a MongoDB database on MongoDB Atlas. ===========*/
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})



 /*============= 2. CCreate the URL Model ===========*/
const urlSchema = new Schema({
    original_url: String,
    short_url: String
})

const URL = mongoose.model('URL', urlSchema);

