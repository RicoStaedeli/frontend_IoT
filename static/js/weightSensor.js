//var socket = io.connect('http://127.0.0.1:5001');
var socket = io.connect('https://poop-tracker-48b06530794b.herokuapp.com');

socket.on('connect', function () {
    console.log('Connected to the backend!');
});

socket.on('sensor_data', function (msg) {
    document.getElementById('sensorValue').textContent = msg.data + " grams";
});