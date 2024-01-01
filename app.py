from flask import Flask, render_template, request, redirect, url_for, jsonify
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
    api_url = "https://poop-tracker-48b06530794b.herokuapp.com/poops/"
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
    api_url = "https://poop-tracker-48b06530794b.herokuapp.com/poop/1"
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
    api_url = "https://poop-tracker-48b06530794b.herokuapp.com/foods/"
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            foods = response.json()
            return render_template('food.html',foods=foods, activeElement='Food')
        else:
            return jsonify({"message": "Failed to post data."}), 500
    except:
        print("An Error occured")
        return jsonify({"message": "Failed to post data."}), 500

@app.route('/feeding')
def feeding():
    api_url_foods = "https://poop-tracker-48b06530794b.herokuapp.com/foods/"
    try:
        response_food = requests.get(api_url_foods)
        if response_food.status_code == 200:
            foods = response_food.json()
            return render_template('feeding.html',foods=foods, activeElement='Feeding')
        else:
            return jsonify({"message": "Failed to load data."}), 500
    except:
        print("An Error occured")
        return jsonify({"message": "Failed to load data."}), 500

# ###############################
# Helper Methods
# ###############################



# ###############################
# Endpoints to push data
# ###############################
@app.route('/submit', methods=['POST'])
def submit():
    food_name = request.form['food_name']
    food_weight = request.form['food_weight']
    food_meat = request.form['food_meat']
    food_brand = request.form['food_brand']
    food_time = request.form['food_time']
    food_protein = request.form['food_protein']
    food_fat = request.form['food_fat']
    food_ash = request.form['food_ash']
    food_fibres = request.form['food_fibres']
    food_moisture = request.form['food_moisture']


    food_entry = {
        'name': food_name,        
        'meat': food_meat,
        'protein': food_protein,
        'fat': food_fat,
        'ash': food_ash,
        'fibres': food_fibres,
        'moisture': food_moisture,
        'time': food_time
    }

    # Post the data to the specified URL
    url = "https://poop-tracker-48b06530794b.herokuapp.com/foods/"
    response = requests.post(url, json=food_entry)

    if response.status_code == 200:
        return redirect(url_for('food'))
    else:
        return jsonify({"message": "Failed to post data."}), 500
    

@app.route('/submit_feeding', methods=['POST'])
def submit_feeding():
    id_food = request.form['food_id']
    food_time = request.form['food_time']

    feeiding_entry = {
        'ID_feeding': id_food,
        'time': food_time
    }

    # Post the data to the specified URL
    url = "https://poop-tracker-48b06530794b.herokuapp.com/feeding/"
    response = requests.post(url, json=feeiding_entry)

    if response.status_code == 200:
        return redirect(url_for('feeding'))
    else:
        return jsonify({"message": "Failed to post data."}), 500
    
@app.route('/submit_subscribing', methods=['POST'])
def submit_subscribing():
    subscriber_name = request.form['subscriber_name']
    subscriber_phone = request.form['subscriber_phone']

    feeiding_entry = {
        'subscriber_name': subscriber_name,
        'subscriber_phone': subscriber_phone
    }

    # Post the data to the specified URL
    url = "https://poop-tracker-48b06530794b.herokuapp.com/feeding/"
    response = requests.post(url, json=feeiding_entry)

    if response.status_code == 200:
        return redirect(url_for('feeding'))
    else:
        return jsonify({"message": "Failed to post data."}), 500
