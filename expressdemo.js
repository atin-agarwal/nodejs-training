var express = require('express');
var app = express();

app.use(express.static('public'))

var mydata = [
  {
    description:  'This is the correct one',
    status: true
  },
  {
    description:  'I am the defaulter',
    status: 403
  }
];

app.get('/getmydata', function(req, res) {
  res.json(mydata);
})

app.listen(3000, function() {
  console.log("Express is started!");
})
