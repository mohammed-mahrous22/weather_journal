// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 3333;

const server = app.listen(port, (console.log(`listening on http://localhost:${port}`)));

app.get('/all', sendData)

function sendData (req,res){
    console.log(projectData);
    res.send(projectData);
}

app.post('/postData',storeData)

function storeData (req,res){
projectData=req.body;
console.log(projectData);
res.send({ succsess: 'post recived successfully'});
}