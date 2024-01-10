var client_id = Date.now()

var ws = new WebSocket(`wss://poop-tracker-48b06530794b.herokuapp.com/ws/${client_id}`);

ws.onmessage = function (event) {
    console.log(event.data)
    try {
        data = JSON.parse(event.data);
        if (data.type == "poop") {
            addDataToPoopChart(data)
        }
        else if (data.type == "liveWeight") {
            document.getElementById('weight_sensor').textContent = data.weight;
            addDataToWeightChart(data)
        }
        else if (data.type == "liveGasValue") {
            document.getElementById('gas_sensor_smoke').textContent = data.smoke + "‰";
            document.getElementById('gas_sensor_co').textContent = data.co + "‰";
            document.getElementById('gas_sensor_lpg').textContent = data.lpg + "‰";
            addDataToGasChart(data)
        }
        else if (data.type == "airQuality") {

        }
        else if (data.type == "message"){
            var messages = document.getElementById('messages')
            var message = document.createElement('li')
            textMessage = "Client " + data.client_id + " sais: " + data.message;
            var content = document.createTextNode(textMessage)
            message.appendChild(content)
            messages.appendChild(message)
        }
    } catch (error) {
        console.error(error);
    }
};

function sendBroadcast() {
    var input = document.getElementById("Broadcast").value
    ws.send(input)
}


function addDataToPoopChart(newData) {

    day = newData.timestamp;
    weight = newData.weight
    PoopChart.data.labels.push(day);
    PoopChart.data.datasets[0].data.push(weight);

    PoopChart.update();
}

function addDataToWeightChart(newData) {

    //day =  newData.timestamp.split('T')[0];
    weight = newData.weight
    day = newData.timestamp;
    WeightChart.data.labels.push(day);
    WeightChart.data.datasets[0].data.push(weight);

    WeightChart.update();
}

function addDataToGasChart(newData) {

    day = newData.timestamp;
    lpg = newData.lpg;
    smoke = newData.smoke;
    co = newData.co;

    GasChart.data.labels.push(day);
    GasChart.data.datasets[0].data.push(co);
    GasChart.data.datasets[1].data.push(smoke);
    GasChart.data.datasets[2].data.push(lpg);

    GasChart.update();
}