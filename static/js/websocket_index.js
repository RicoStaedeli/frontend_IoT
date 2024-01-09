var client_id = Date.now()

var ws = new WebSocket(`ws://poop-tracker-48b06530794b.herokuapp.com/ws/${client_id}`);

ws.onmessage = function (event) {
    console.log(event.data)
    try {
        data = JSON.parse(event.data);
        if (data.type == "weightSensorValue") {

        }
        if (data.type == "gasSensorValue") {

        }
    } catch (error) {
        console.error(error);
    }


};

function sendMessage() {
    var input = "testmessage"
    ws.send(input)
}
