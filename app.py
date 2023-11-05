from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# ###############################
# HTML Endpoints
# ###############################
@app.route('/')
def index():

    return render_template('index.html')

@app.route('/sensors')
def sensors():
    api_url = "https://jsonplaceholder.typicode.com/posts/"
    response = requests.get(api_url)
    if response.status_code == 200:
        sensordata = response.json()
        sensordata = getSnesorData()
        return render_template('sensors.html',actualValue=sensordata.get("value"),catWeight=sensordata.get("catweight"))
    else:
        return render_template('sensors.html',weightSensorValue='Fehler')

@app.route('/weightsensor')
def weightsensor():
    return render_template('WeightSensor.html')

# ###############################
# Helper Methods
# ###############################
def getSnesorData():
    response = {
        "sensorId": 564,
        "value": 12.156,
        "catweight": 3.12}
    return response