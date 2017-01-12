var express = require('express');
var app = express();
var _ = require('underscore');

app.use(express.static('public'))

var bp = require('body-parser');
app.use(bp.json());

var mydata = [];
var nextId = 1;

app.get('/getmydata/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  var matchedToDo = _.findWhere(mydata,{id:todoId});
  if(matchedToDo) {
    res.json(matchedToDo);
  } else {
    res.status(403).send();
  }
});

app.get('/getmydata', function(req, res) {
  res.json(mydata);
})

app.post('/postmydata', (req, res) => {
  var body = req.body;
  body.id = nextId++;
  mydata.push(body);
  res.json(body);
})

app.delete('/deletemydata/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  var matchedToDo = _.findWhere(mydata,{id:todoId});
  if(matchedToDo) {
    mydata = _.without(mydata, matchedToDo);
    res.json(matchedToDo);
  } else {
    res.status(404).json({"error":"Id not found"});
  }
});

app.listen(3000, function() {
  console.log("Express is started!");
})
