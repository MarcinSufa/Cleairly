//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');


const app = express();
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
//

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/check", function(req, res){

  request("https://api.waqi.info/feed/here/?token=af07c901773851274061da1a6893d13c27574486", function(error, response, body){

    let airData = JSON.parse(body);
    let pm10Q = airData.data.iaqi.pm10.v;
    let pm25Q = airData.data.iaqi.pm25.v;
    let temp =  airData.data.iaqi.t.v;
    let timeMesure = airData.data.time.s;
    let city = airData.data.city.name;

    if (temp == null) {
      temp == 'no data';
      res.render("clearly", {cityName:city, pm10Value:pm10Q, pm25Value: pm25Q, tempValue: temp, timeValue:timeMesure});
      console.log(pm10Q, city,  timeMesure, pm25Q, temp);
    }else {
      res.render("clearly", {cityName:city, pm10Value:pm10Q, pm25Value: pm25Q, tempValue: temp, timeValue:timeMesure});
      console.log(pm10Q, city,  timeMesure, pm25Q, temp);
    }
    });

});


app.post("/check", function (req, res){
});

app.post("/", function (req, res){
});





app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
