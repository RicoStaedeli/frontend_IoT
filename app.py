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
    api_url_poops = "https://poop-tracker-48b06530794b.herokuapp.com/poops/5"
    api_url_air = "https://poop-tracker-48b06530794b.herokuapp.com/air_qualities/5"
    try:
        response_poops = requests.get(api_url_poops)
        response_air = requests.get(api_url_air)
        if response_poops.status_code == 200 and response_air.status_code == 200:
            poops = response_poops.json()
            airs = response_air.json()
            return render_template('sensors.html',poops=poops,airs=airs, activeElement='Sensors')
        else:
            return render_template('sensors.html',poops=[], activeElement='Sensors')
    except:
        return render_template('sensors.html',poops=[], activeElement='Sensors')


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
    
@app.route('/cat')
def cats():
    api_url = "https://poop-tracker-48b06530794b.herokuapp.com/foods/"
    api_url_cats = "https://poop-tracker-48b06530794b.herokuapp.com/cats/"
    try:
        response = requests.get(api_url)
        response_cats = requests.get(api_url_cats)
        if response.status_code == 200 and response_cats.status_code == 200:
            foods = response.json()
            cats  = response_cats.json()
            return render_template('cats.html',foods=foods,cats=cats, activeElement='Cats')
        else:
            return jsonify({"message": "Failed to get data."}), 500
    except:
        print("An Error occured")
        return jsonify({"message": "Failed to get data."}), 500

@app.route('/feeding')
def feeding():
    api_url_foods = "https://poop-tracker-48b06530794b.herokuapp.com/foods/"
    api_url_cats = "https://poop-tracker-48b06530794b.herokuapp.com/cats/"
    api_url_feedings = "https://poop-tracker-48b06530794b.herokuapp.com/feedings/"
    try:
        response_food = requests.get(api_url_foods)
        response_cats = requests.get(api_url_cats)
        response_feedings = requests.get(api_url_feedings)
        if response_food.status_code == 200 and response_cats.status_code == 200 and response_feedings.status_code == 200:
            foods = response_food.json()
            cats = response_cats.json()
            feedings = response_feedings.json()
            return render_template('feeding.html',foods=foods,feedings=feedings,cats=cats, activeElement='Feeding')
        else:
            return jsonify({"message": "Failed to load data."}), 500
    except:
        print("An Error occured")
        return jsonify({"message": "Failed to load data."}), 500
    
@app.route('/analysis')
def analysis():
    api_url_poops = "https://poop-tracker-48b06530794b.herokuapp.com/poops/"
    api_url_feedings = "https://poop-tracker-48b06530794b.herokuapp.com/feedings/"
    try:
        response_poops= requests.get(api_url_poops)
        response_feedings= requests.get(api_url_feedings)
        if response_poops.status_code == 200:
            feedings = response_feedings.json()
            poops = response_poops.json()
            data = join_by_feeding_id(feedings,poops)
            health_infos = totalizePerFood(data)
            return render_template('analysis.html',poops=data, health_infos = health_infos, activeElement='Analysis')
        else:
            return jsonify({"message": "Failed to load data."}), 500
    except:
        print("An Error occured")
        return jsonify({"message": "Failed to load data."}), 500


# Function to join feedings and poops by feeding ID
def join_by_feeding_id(feedings, poops):
    feeding_dict = {feeding["ID_feeding"]: feeding for feeding in feedings}

    # Join poops with their corresponding feeding record, keeping both timestamps
    joined_data_with_timestamps = []
    for poop in poops:
        feeding_id = poop["feeding_ID"]
        if feeding_id in feeding_dict:
            # Renaming timestamps for clarity
            poop_with_renamed_timestamp = {
                "timestamp_poop": poop["timestamp"],
                **{k: v for k, v in poop.items() if k != "timestamp"}
            }
            feeding_with_renamed_timestamp = {
                "timestamp_feeding": feeding_dict[feeding_id]["timestamp"],
                **{k: v for k, v in feeding_dict[feeding_id].items() if k != "timestamp"}
            }

            # Create a new combined record
            combined_record = {**poop_with_renamed_timestamp, "feeding": feeding_with_renamed_timestamp}
            joined_data_with_timestamps.append(combined_record)

    return joined_data_with_timestamps

def totalizePerFood(data):
    total_weight_per_food = {}

    # Iterate through the data
    for entry in data:
        name = entry['feeding']['food']['name']
        weight = entry['weight']

        # Add the weight to the corresponding food ID
        if name in total_weight_per_food:
            total_weight_per_food[name] += weight
        else:
            total_weight_per_food[name] = weight

    # Print the total weight for each food ID
    for name, total_weight in total_weight_per_food.items():
        print(f"Total weight for Food ID {name}: {total_weight} grams")
        
    return total_weight_per_food
# ###############################
# Endpoints to push data
# ###############################
@app.route('/submit', methods=['POST'])
def submit():
    food_name = request.form['food_name']
    food_meat = request.form['food_meat']
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
    id_cat = request.form['cat_id']
    food_time = request.form['food_time']

    feeiding_entry = {
        'food_ID': id_food,
        'cat_ID': id_cat,
        'timestamp': food_time
    }
    

    # Post the data to the specified URL
    url = "https://poop-tracker-48b06530794b.herokuapp.com/feedings/"
    response = requests.post(url, json=feeiding_entry)

    if response.status_code == 200:
        return redirect(url_for('feeding'))
    else:
        return jsonify({"message": "Failed to post data."}), 500
    
@app.route('/submit_subscribing', methods=['POST'])
def submit_subscribing():
    subscriber_name = request.form['subscriber_name']
    subscriber_phone = request.form['subscriber_phone']

    subscriber_entry = {
        'name': subscriber_name,
        'telnr': subscriber_phone
    }

    # Post the data to the specified URL
    url = "https://poop-tracker-48b06530794b.herokuapp.com/telephone_numbers/"
    response = requests.post(url, json=subscriber_entry)

    if response.status_code == 200:
        return redirect(url_for('index'))
    else:
        return jsonify({"message": "Failed to post data."}), 500
    
@app.route('/submit_cat', methods=['POST'])
def submit_cat():
    cat_name = request.form['cat_name']
    cat_color = request.form['cat_color']
    cat_sex = request.form['cat_sex']
    cat_birthday = request.form['cat_birthday']
    cat_chip = request.form['cat_chip']


    cat_entry = {
        'name': cat_name,
        'gender': cat_sex,
        'birthdate': cat_birthday,
        'chipped': cat_chip,
        'color': cat_color
    }

    # Post the data to the specified URL
    url = "https://poop-tracker-48b06530794b.herokuapp.com/cats/"
    response = requests.post(url, json=cat_entry)

    if response.status_code == 200:
        return redirect(url_for('index'))
    else:
        return jsonify({"message": "Failed to post data."}), 500

