from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# ###############################
# HTML Endpoints
# ###############################
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index')
def index2():
    return render_template('index.html')

@app.route('/sensors')
def sensors():
    api_url = "https://pfistdo.pythonanywhere.com/poops/"
    response = requests.get(api_url)
    print(response)
    if response.status_code == 200:
        sensordata = response.json()
        return render_template('sensors.html',poops=sensordata)
    else:
        return render_template('sensors.html',weightSensorValue='Fehler')


@app.route('/weightsensor')
def weightsensor():
    api_url = "https://pfistdo.pythonanywhere.com/poop/1"
    response = requests.get(api_url)
    print(response)
    if response.status_code == 200:
        sensordata = response.json()
        return render_template('WeightSensor.html',poop=sensordata['weight'])
    else:
        return render_template('WeightSensor.html',weightSensorValue='Fehler')

# ###############################
# Helper Methods
# ###############################



# ###############################
# Endpoints to push data
# ###############################

