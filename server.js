// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, function() {
    console.log("server running");
    console.log(`listening from port ${port}`);
});


// Post Route for url "/addweather"
app.post("/addWeather", function(req,res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feeling = req.body.feeling;
    console.log("posted succesfully");
})


// Get route for url "/all"
app.get("/all", function(req, res) {
    res.send(projectData);
    console.log("responded succesfully");
});