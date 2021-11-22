const express = require('express');
const app = express();

app.get('',function (req, res) {
    res.sendFile(__dirname + '/../public/main.html');
  })

app.listen(3000, function(){
  console.log('Listening at 3000');
});