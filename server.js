// Set Up ==============================

var express = require('express');
var app = express();                               // create our app with express
var mongoose = require('mongoose');                // mongoose for mondodb
var morgan = require('morgan');                    // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from  HTML post (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express4)

// Configuration =======================

mongoose.connect('mongodb+srv://alex:<db-password>@mean-todo-bpbyr.mongodb.net/test?retryWrites=true&w=majority'
); // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                   // set the static files location /public/img will be for users
app.use(morgan('dev'));                                           // log ever request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));           // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                       // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));   // parse application/vnd.api+json as json
app.use(methodOverride());

// define model

var Todo = mongoose.model('Todo', {
  text: String
})

// routes

app.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if (err)
      res.send(err)

    res.json(todos);
  });
});

app.post('/api/todos',  function(req, res){

  // create a todo, information comes from Ajax request from Angular
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo){
      if(err)
        res.send(err);

      // get and return all the todos after you create another
      Todo.find(function(err, todos){
        if (err)
          res.send(err)
        res.json(todos);
      });
    });

});

app.delete('/api/todos/:todo.id', function(req, res){
  Todo.remove({
    _id : req.params.todo_id
  },  function(err, todo){
        if (err)
          res.send(err);


        Todo.find(function(err, todos){
          if (err)
            res.send(err)
          res.json(todos);
        });
      });
});

// listen (start app with node server.js) =======================
app.listen(8080);
console.log('App listening on port 8080')
