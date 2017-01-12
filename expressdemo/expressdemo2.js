var express = require('express');
var app = express();

app.use(express.static('public'))

var bp = require('body-parser');
app.use(bp.json());

var mydata = [];
var nextId = 1;

app.get('/getmydata', function(req, res) {
  res.json(mydata);
})

app.post('/postmydata', (req, res) => {
  var body = req.body;
  body.id = nextId++;
  mydata.push(body);
  res.json(body);
})

app.listen(3000, function() {
  console.log("Express is started!");
})
