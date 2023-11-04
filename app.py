from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sensors')
def sensors():
    return render_template('sensors.html')

@app.route('/weightsensor')
def weightsensor():
    return render_template('WeightSensor.html')

@app.route("/event/<action>")
def event(action):
    return {}, 200
