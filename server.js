//Set Up ==============================

var express = require('express');
var app = express();                               //create our app with express
var mongoose = require('mongoose');                //mongoose for mondodb
var morgan = require('morgan');                    //log requests to the console (express4)
var bodyParser = require('bodyParser');            //pull information from  HTML post (express4)
var methodOverride = require('methodOverride');    //simulate DELETE and PUT (express4)

//Configuration =======================

mongoose.connect('mongodb://node:user@mongo.onmodulus.net:27017/uw03mypu'); // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                   // set the static files location /public/img will be for users
app.use(morgan('dev'));                                           // log ever request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));           // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                       // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));   // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) =======================
app.listen(8080);
console.log('App listening on port 8080')
