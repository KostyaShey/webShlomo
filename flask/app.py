import time
from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "kostya"
app.config['MONGO_URI'] = 'mongodb://localhost:27017/webShlomo'
mongo = PyMongo(app)


@app.route('/time')
def get_current_time():
    return {'time': str(time.time()) + " hello"}


@app.route('/sayHello')
def say_hello():
    return 'Hello'


@app.route('/add', methods=['POST'])
def add_data():
    _json = request.json
    _name = _json['name']
    _value = _json['value']

    if _name and _value and request.method == 'POST':
        id = mongo.db.AUG2020.insert({'name': _name, 'value': _value})
        response = jsonify('Operation success')
        response.status_code = 200

@app.route('/fetch')
def fetch():
    data = mongo.db.AUG2020.find()
    response = dumps(data)
    return response

if __name__ == '__main__':
    app.run(debug=True)
