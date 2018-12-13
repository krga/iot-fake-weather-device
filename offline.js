require('dotenv').config();

const express = require('express');
const crypto = require("crypto");
const mqtt = require('mqtt');

const app = express();
const mqttClient = mqtt.connect('mqtt://localhost');

const mqttTopic = 'dev1/envdata';
const port = process.env.PORT || 3001;


app.get('/', function (req, res) {
  let id = crypto.randomBytes(3).toString('hex');
  let temp = Math.floor(Math.random() * 11)+10;
  let hum = Math.floor(Math.random() * 26)+75;
  let mqttPayload = '{"source": "fakedevice-'+id+'", "temp": '+temp+', "hum": '+hum+', "light": '+95+'}'
  mqttClient.publish(mqttTopic, mqttPayload)
  res.send(mqttPayload);
})

app.listen(port, function () {
  console.log('listening on port: '+port)
})