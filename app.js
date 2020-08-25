const express = require('express')
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const validUrl = require('valid-url');
const shortID = require('shortid');
const bodyParser = require('body-parser');
const cors = require('cors')

const URL = require('./Schema').URL;

require('dotenv').config();

const app = express();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

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



 /*============= 2. Create the URL Model ===========*/



 /*============= 3. Create the API routes post and get methods. ===========*/
// post to new url

app.post('/api/shorturl/new', (req, res) => {

    const url = req.body.url_input;
    const urlCode = shortID.generate();

    // check if url is valid or not
    if ( !validUrl.isWebUri(url) ) {
        res.status(401).json({ error: "invalid URL"})
    } else {
        // save to databse
        const newURL = new URL({
            original_url: url,
            short_url: urlCode
        })

        newURL.save((err, data) => {
            if (err) res.send(err)
            // res.send("success")
            res.redirect('/list')
        })
    }
})


 /*============= 3. Create the API routes post and get methods. ===========*/
// get method

app.get('/api/shorturl/:url', ( req, res) => {
    
    let input_url = req.params.url;
    // console.log(input_url);

    // search in the databes 
    // find one by short_url
    // retrive data

    // redicred the user to the correspoing original url

    URL.findOne({short_url: input_url}, (err, data) => {
        if (err) res.send(err)
        // console.log(data);
        res.redirect(data.original_url)
    })
})


 /*============= GET URL LIST ===========*/
 app.get('/list', (req, res) => {
     URL.find((err, data) => {
         err ? res.send(err): null;
         res.render('index', {data: data})
     })
 })