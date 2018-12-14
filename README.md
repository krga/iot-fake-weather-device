# iot-fake-weather-device

A simple IoT fake device which provides temprature, humidity and light data by obtaining it from the openweathermap API and sending it to a MQTT broker. It can be used to test MQTT setups without having a physical smart device at hand.

## Getting Started

Provide a valid openweathermap API key in the .env file where you can also define the port the app is listening

```
OWMAPIKEY='your api key here'
PORT=3001
```

Open the URL with the respective port of the app with the browser to trigger the MQTT message:

```
http://localhost:3001/
```

### Prerequisites

A functioning node.js installation and a running MQTT broker like

[Eclipse Mosquitto](https://projects.eclipse.org/projects/technology.mosquitto)

### Usage

Install the needed node.js modules and start the app:

```
npm install
node index.js
```

## Authors

* **Kristian Gavran** - *Initial work* - [krga](https://github.com/krga)

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details
