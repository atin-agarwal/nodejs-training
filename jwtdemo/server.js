var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

var authCheck = jwt({
  secret: new Buffer('vjEWYAdkU4zeXt1X2Iz0zIvWXPEAb7oK2O_tmqXylxCYHHmdLiiBCWzVFZJgY9r4', 'base64'),
  audience: 'Sdg9T7U4PHAasFZEGNA4VkaBzGSD3yoW'
});

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authCheck, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');
