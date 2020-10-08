import time
import os
from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder='../webshlomo/build', static_url_path='/')
app.secret_key = "kostya"
app.config['MONGO_URI'] = os.environ['WEBSITE_SITE_NAME']
mongo = PyMongo(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

#add a document to the collection of <type_of_data>
@app.route('/add/<type_of_data>', methods=['POST'])
def add_data(type_of_data):
    _json = request.json
    _name = _json['name']
    _value = _json['value']
    _month = _json['month']
    _year = _json['year']

    if _name and _value and request.method == 'POST':
        id = mongo.db[type_of_data].insert(
            {'name': _name, 'value': _value, 'month': _month, 'year': _year})

    data = mongo.db[type_of_data].find({"month": _month, "year": _year})

    response = dumps(data)
    return response  

#fetch documents from the collection of <type_of_data>
@app.route('/fetch/<type_of_data>')
def fetch(type_of_data):

    _month = int(request.headers["month"])
    _year = int(request.headers["year"])
    _typeOfData = request.headers["typeOfData"]

    if _typeOfData == "expences" or _typeOfData  == "income":
        data = mongo.db[type_of_data].find({"month": _month, "year": _year})

    if _typeOfData == "mExpences" or _typeOfData  == "mIncome":
        data = mongo.db[type_of_data].find({"month": { "$in": [_month] }, "years": { "$in": [_year] }})

    response = dumps(data)
    return response    

#delete document from the collection of <type_of_data> if specific id
@app.route('/delete/<type_of_data>', methods=['POST'])
def delete(type_of_data):
    _json = request.json
    _id = _json['id']
    _month = int(_json["month"])
    _year = int(_json["year"])

    id = mongo.db[type_of_data].delete_one({'_id': ObjectId(_id)})

    data = mongo.db[type_of_data].find({"month": _month, "year": _year})

    response = dumps(data)
    return response  

#update one document from <type_of_data> collection
@app.route('/update/<type_of_data>', methods=['POST'])
def update(type_of_data):
    _json = request.json
    _id = _json['id']
    _name = _json['name']
    _value = _json['value']
    _month = int(_json["month"])
    _year = int(_json["year"])

    id = mongo.db[type_of_data].update_one({'_id': ObjectId(_id)}, {'$set': {'name': _name, 'value': _value}})

    data = mongo.db[type_of_data].find({"month": _month, "year": _year})

    response = dumps(data)
    return response  
