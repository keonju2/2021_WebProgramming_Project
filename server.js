const express = require('express');
const app = express();

app.get('',function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
  })

app.listen(8000, function(){
  console.log('Listening at 8000');
});