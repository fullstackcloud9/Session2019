var mysql = require("mysql");
var http = require('http');
var express = require('express');

app = express();


var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'Cars'
});

con.connect(function(err) {
  if (err) throw err;
  //Read data
  //insert using json object

  app.get('/', function (req, res) { 

    var query = con.query("SELECT Model, CarName, CarYear from Car_Models",function(err, result){

      if(err) throw err;

      console.log(result);
      res.send(result);
  }
  );

    
})


app.get('/toyota', function (req, res) { 

  var query = con.query("SELECT Model, CarName, CarYear from Car_Models where CarName = 'Toyota'",function(err, result){

    if(err) throw err;

    console.log(result);
    res.send(result);
}
);

  
})


  /*
  var query = con.query(
    "INSERT INTO Car_Models SET ?",
    {
      Model: "X3",
      CarName: "BMW",
      CarYear: 2001
    },
    function(err, res) {
      if(err) throw err;
      console.log(res.affectedRows + " car inserted!\n");
     
    }
  );

  */
  console.log("Connected!");
});


var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)
})