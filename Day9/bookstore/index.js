var mysql = require('mysql');
var http = require('http');
var express = require('express');
var request = require('request')
var bodyParser =  require("body-parser");
var path = require('path');

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bookstore'
});

con.connect(function(err) {
  if (err) throw err;


  app.post('/signup',function(req,res){

    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+ password);

    var sql = "INSERT INTO User (username, password) VALUES ('" + user_name + "','" + password + "')";
    console.log(sql);

    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send("welcome.html");

       });

    
  
  });

  app.post('/addbook',function(req,res){

    var bookname=req.body.bookname;
    var price=req.body.price;
    var pages = req.body.pages;
    var year = req.body.year;
    
    var sql = "INSERT INTO Books (bookname, price,author_id, pages, year_published) VALUES ('" + bookname + "','" + price + "',1," + pages + "," + year + ")";
    console.log(sql);

    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 book record inserted");
    res.send("welcome.html");

       });

    
  
  });


  app.post('/login',function(req,res){

    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+ password);
    res.sendFile(path.join(__dirname, './views', 'home.html'));
  
  });

  app.post('/bookdelete', function (req, res) { 

    var id = req.body.id;
    console.log(id);
    var query = con.query("delete from Books where id = '" + id + "'" ,function(err, result){
        if (err) throw err;
        console.log(result);
        res.end("book deleted");
    }
    );
    })


  app.get('/NAMES', function (req, res) { 

var query = con.query("SELECT FIRSTNAME, LASTNAME from Author",function(err, result){
    if (err) throw err;
    console.log(result);
    res.end("Logged in");
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


  app.get('/GetBookById/:id', function (req, res) { 

    var id = req.params.id;
    console.log(id);
    var query = con.query("SELECT bookname, price, pages, year_published  from Books where id = '" + id + "'" ,function(err, result){
        if (err) throw err;
        console.log(result);
        res.send(result);
    }
    );
    })


    app.post('/editbook',function(req,res){

      var id = req.body.id;
      var bookname=req.body.book;
      var price=req.body.price;
      var year=req.body.year;
      var pages=req.body.pages;
      
      var sql = "Update Books set bookname = '" + bookname + "', price = " + price + ",pages=" + pages + ",year_published=" + year + " where id = '" + id + "';"
    
      console.log(sql);
  
      con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 book record updated");
      res.send("success");
  
         });
  
      
    
    });

app.get('/BOOKS', function (req, res) { 

var query = con.query("SELECT id,bookname,price, year_published,pages  from Books",function(err, result){
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

  app.get('/Authors', function (req, res) { 

    var query = con.query("select ID, FIRSTNAME, LASTNAME FROM Author",function(err, result){
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