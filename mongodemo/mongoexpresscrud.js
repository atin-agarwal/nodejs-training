var express = require('express');
var bp= require('body-parser');
var _ = require('underscore');

var MongoClient= require('mongodb').MongoClient

var app= express();
app.use(bp.json());
var db

MongoClient.connect('mongodb://admin:admin@ds161028.mlab.com:61028/atindb',(err , database) => {
    if( err) return console.log(err)
db =database
})

app.post('/adduser' , (req,res) => {
db.collection('users').save(req.body , (err,result) => {
if(err) return console.log(err)
    console.log('saved to database')
    res.status(200).send('record added');
})

})

app.delete('/deleteuser', (req, res) => {
  db.collection('users').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('record deleted')
  })
})


app.put('/updateuser', (req, res) => {
  db.collection('users')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      name: req.body.name,
      email: req.body.email
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


  app.listen(3000, () =>
      {
      console.log('we are connected')
      })
