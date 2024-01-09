var client_id = Date.now()

var ws = new WebSocket(`wss://poop-tracker-48b06530794b.herokuapp.com/ws/${client_id}`);

ws.onmessage = function (event) {
    console.log(event.data)
    try {
        data = JSON.parse(event.data);
        if (data.type == "poop") {

        }
        else if (data.type == "liveWeight") {
            document.getElementById('weight_sensor').textContent = data.weight;
        }
        else if (data.type == "liveGasValue") {
            document.getElementById('gas_sensor_smoke').textContent = data.smoke;
            document.getElementById('gas_sensor_co').textContent = data.co;
            document.getElementById('gas_sensor_lpg').textContent = data.lpg;
        }
        else if (data.type == "airQuality") {

        }
    } catch (error) {
        //console.error(error);
    }
};

function sendMessage() {
    var input = "testmessage"
    ws.send(input)
}

function changeValues(){
    document.getElementById('weight_sensor').textContent = "69";
}