require('dotenv').config()

const express = require('express');
const request = require('request');
const mqtt = require('mqtt');
const crypto = require("crypto");

const app = express();

const mqttClient = mqtt.connect('mqtt://localhost');
const mqttTopic = 'dev1/envdata';

const port = process.env.PORT || 3001;

const openweathermapApiKey = process.env.OWMAPIKEY || 'xxxxxxxxxxxxx';
const openweathermapLocation = 'Zurich';

app.get('/', function (req, res) {
  
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${openweathermapLocation}&units=metric&appid=${openweathermapApiKey}`

  request(url, (err, response, body) => {
    if(err){
      res.send('Error, please try again');
    } else {
      let weather = JSON.parse(body)
      if(weather.main === undefined) {
        res.send('Error, please try again');
      } else {
        let id = crypto.randomBytes(3).toString('hex');
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let mqttPayload = '{"source": "fakedevice-'+id+'", "temp": '+weather.main.temp+', "hum": '+weather.main.humidity+', "light": '+100+'}'
        mqttClient.publish(mqttTopic, mqttPayload)
        res.send("Getting weather data:"+weatherText+"<br>sending JSON to mqtt broker: "+mqttPayload);
      }
    }
  });
})

app.listen(port, function () {
  console.log('listening on port: '+port)
})
