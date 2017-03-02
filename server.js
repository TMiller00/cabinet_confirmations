var express = require("express");
var app     = express();
var path    = require("path");


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use("/", express.static(__dirname + '/'));
app.use("/css", express.static(__dirname + '/css'));

app.listen(5000);



console.log("Running at Port 5000");
