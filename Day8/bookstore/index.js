var mysql = require('mysql');
var http = require('http');
var express = require('express');
var request = require('request')

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

  app.get('/NAMES', function (req, res) { 

var query = con.query("SELECT FIRSTNAME, LASTNAME from Author",function(err, result){
    if (err) throw err;
    console.log(result);
    res.send(result);
}
);
})

app.get('/BOOKSTEST/:id', function (req, res) { 

  var id = req.params.id;
  console.log(id);
  var query = con.query("SELECT * from Books where bookname = '" + id + "'" ,function(err, result){
      if (err) throw err;
      console.log(result);
      res.send(result);
  }
  );
  })


app.get('/BOOKS', function (req, res) { 

var query = con.query("SELECT bookname from Books",function(err, result){
    if (err) throw err;
    console.log(result);
    res.send(result);
}
);
})
app.get('/All', function (req, res) { 

  var query = con.query("select a.FIRSTNAME, a.LASTNAME, a.AGE, a.COUNTRY,a.CreatedDate, b.bookname, b.price, b.pages FROM Author a INNER JOIN Books b ON a.ID = b.Author_ID",function(err, result){
      if (err) throw err;
      console.log(result);
      res.send(result);
  }
  );
  })

console.log("Connected!");
});

    var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
  })