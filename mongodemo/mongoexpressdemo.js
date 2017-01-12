var express = require('express');
var app = express();
var _ = require('underscore');
var bp = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'))
app.use(bp.json());

var mydata = [];
var nextId = 1;

var db;
MongoClient.connect('mongodb://admin:admin@ds161028.mlab.com:61028/atindb', (err, database) => {
  if(err) return console.log(err);
  db = database
})

app.post('/postmydatatodb', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if(err) return console.log(err);
    console.log('Yay!! Saved to mongo database');
    res.status(200).send();
  })
})


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
  debugger;
  res.json(mydata);
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

app.put('/updatemydata/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(mydata, {id: todoId});
	var body = _.pick(req.body, 'description', 'status');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('status') && _.isBoolean(body.status)) {
		validAttributes.status = body.status;
	} else if (body.hasOwnProperty('status')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);
});

app.listen(3000, function() {
  console.log("Express is started!");
})
