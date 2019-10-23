var http = require('http');
var uc = require('upper-case');
var express = require('express');
app = express();
var companies =[{"CompanyName":"Apple", "CompanySize" : 50000, "Profit": "10000000", "DateCreated": new Date('2001-06-28') , "AverageSalary": "800000"},
{"CompanyName":"Microsoft", "CompanySize" : 10, "Profit": "200", "DateCreated": new Date('1998-06-28') , "AverageSalary": "20000"}]
//Api commands here
app.get('/', function (req, res) {
   
    res.send(companies);
 })
 app.get('/CompanySize50', function (req, res) {
   //create a new empty array for storing all companies that meet a criteria
   var newcompanies = [];
   for(var i =0;i<companies.length;i++)
   {
      //only if companies is greaer than 50 
      if(parseInt(companies[i].CompanySize) > 50)
      {
         //push or add them to the newcompanies array
         newcompanies.push(companies[i]);
      }
   }
    res.send(newcompanies);
 })
 app.get('/CompanySalary', function (req, res) {
    //similar to the route above, just need to test for salary instead

    var newcompanies = [];
   for(var i =0;i<companies.length;i++)
   {
      //only if companies is greaer than 50 
      if(parseInt(companies[i].AverageSalary) > 1000)
      {
         //push or add them to the newcompanies array
         newcompanies.push(companies[i]);
      }
   }

    res.send(newcompanies);
 })
app.get('/CompanyDate', function (req, res) {
   const sortedDates = companies.sort((a, b) => b.DateCreated - a.DateCreated)
   res.send(sortedDates);
})
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })





