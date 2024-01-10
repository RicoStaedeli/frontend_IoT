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
            document.getElementById('gas_sensor_smoke').textContent = data.smoke;
            document.getElementById('gas_sensor_co').textContent = data.co;
            document.getElementById('gas_sensor_lpg').textContent = data.lpg;
            addDataToGasChart(data)
        }
        else if (data.type == "airQuality") {

        }
    } catch (error) {
        //console.error(error);
        var messages = document.getElementById('messages')
        var message = document.createElement('li')
        var content = document.createTextNode(event.data)
        message.appendChild(content)
        messages.appendChild(message)
    }
};

function sendBroadcast() {
    var input = document.getElementById("Broadcast").value
    ws.send(input)
}

function changeValues() {
    document.getElementById('weight_sensor').textContent = "69";
}

function getPopSocketMessage() {
    stringMessage = '{"ID_poop": 0, "weight": 77, "timestamp": "2024-01-10T07:40:48", "feeding_ID": 10, "type": "poop"}'
    data = JSON.parse(stringMessage);
    return data
}

function simulatePoopEntry() {
    data = getPopSocketMessage();
    let canvas = document.querySelector('#line-chart-poop');
    addDataToPoopChart(data);
}


function addDataToPoopChart(newData) {

    day = newData.timestamp.split('T')[0];
    weight = newData.weight
    PoopChart.data.labels.push(day);
    PoopChart.data.datasets[0].data.push(weight);

    PoopChart.update();
}

function addDataToWeightChart(newData) {

    //day =  newData.timestamp.split('T')[0];
    weight = newData.weight
    WeightChart.data.labels.push("WS");
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