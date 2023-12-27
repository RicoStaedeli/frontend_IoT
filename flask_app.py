from flask import Flask, render_template, request, redirect, url_for, flash
import requests

app = Flask(__name__)

# ###############################
# HTML Endpoints
# ###############################
@app.route('/')
def index():
    return render_template('index.html', activeElement='Dashboard')

@app.route('/index')
def index2():
    return render_template('index.html', activeElement='Dashboard')

@app.route('/sensors')
def sensors():
    api_url = "https://pfistdo.pythonanywhere.com/poops/"
    try:
        response = requests.get(api_url)
        print(response)
        if response.status_code == 200:
            sensordata = response.json()
            return render_template('sensors.html',poops=sensordata, activeElement='Sensors')
        else:
            return render_template('sensors.html',poops=[], activeElement='Sensors')
    except:
        return render_template('sensors.html',poops=[], activeElement='Sensors')

@app.route('/weightsensor')
def weightsensor():
    api_url = "https://pfistdo.pythonanywhere.com/poop/1"
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            sensordata = response.json()
            return render_template('WeightSensor.html',poop=sensordata['weight'], activeElement='Sensors')
        else:
            return render_template('WeightSensor.html',weightSensorValue=0, activeElement='Sensors')
    except:
        print("An Error occured")
        return render_template('WeightSensor.html',weightSensorValue=0, activeElement='Sensors')

@app.route('/food')
def food():
    return render_template('food.html', activeElement='Food')

# ###############################
# Helper Methods
# ###############################



# ###############################
# Endpoints to push data
# ###############################
@app.route('/submit', methods=['POST'])
def submit():
    food_data = []
    food_name = request.form['food_name']
    food_weight = request.form['food_weight']
    food_category = request.form['food_category']
    food_brand = request.form['food_brand']
    food_time = request.form['food_time']

    food_entry = {
        'name': food_name,
        'weight': food_weight,
        'category': food_category,
        'brand': food_brand,
        'time': food_time
    }

    food_data.append(food_entry)
    print(food_data)
    return redirect(url_for('index'))
