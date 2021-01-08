import time
import os
from flask import Flask, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder='../webshlomo/build', static_url_path='/')
app.secret_key = "kostya"
app.config['MONGO_URI'] = os.environ['MONGO_DB_LINK']
mongo = PyMongo(app)

def pipeline_builder(type_of_data, month, year):

    if type_of_data == "expenses" or type_of_data  == "income":
        pipeline = [
            {'$match': {'$and': [{'month': month}, {'year': year}]}},
            { '$group': { '_id': 'null', 'total': { '$sum': "$value" }}}
        ]
    if type_of_data == "mExpenses" or type_of_data  == "mIncome":

        pipeline = [
            {'$match': {'$and': [{'month': {'$elemMatch': {"$in": [month]}}}, {'year': {'$elemMatch': {"$in": [year]}}}]}},
            { '$group': { '_id': 'null', 'total': { '$sum': "$value" }}}
        ]

    return pipeline

def response_builder(type_of_data, month, year):
    if type_of_data == "expenses" or type_of_data  == "income":
        data = mongo.db[type_of_data].find({"month": month, "year": year})

    if type_of_data == "mExpenses" or type_of_data  == "mIncome":
        data = mongo.db[type_of_data].find()

    total = mongo.db[type_of_data].aggregate(pipeline_builder(type_of_data, month, year))
    total = dumps(total)

    #replace empty result with a valid json if the total is 0
    if total == '[]':
        total = '[{"_id": "null", "total": 0}]'

    return '{ "data": ' + dumps(data) + ', "total": ' + total + '}'

@app.route('/')
def index():
    return app.send_static_file('index.html')

#add a document to the collection of <type_of_data>
@app.route('/add/<type_of_data>', methods=['POST'])
def add_data(type_of_data):
    _json = request.json
    _name = _json['name']
    _value = int(_json['value'])
    _month = _json['month']
    _year = _json['year']

    if _name and _value and request.method == 'POST':
        id = mongo.db[type_of_data].insert(
            {'name': _name, 'value': _value, 'month': _month, 'year': _year})

    return response_builder(type_of_data, _month, _year) 

#fetch documents from the collection of <type_of_data>
@app.route('/fetch/<type_of_data>')
def fetch(type_of_data):

    _month = int(request.headers["month"])
    _year = int(request.headers["year"])

    return response_builder(type_of_data, _month, _year)

#delete document from the collection of <type_of_data> if specific id
@app.route('/delete/<type_of_data>', methods=['POST'])
def delete(type_of_data):
    _json = request.json
    _id = _json['id']
    _month = int(_json["month"])
    _year = int(_json["year"])

    id = mongo.db[type_of_data].delete_one({'_id': ObjectId(_id)})

    return response_builder(type_of_data, _month, _year)  

#update one document from <type_of_data> collection
@app.route('/update/<type_of_data>', methods=['POST'])
def update(type_of_data):
    _json = request.json
    _id = _json['id']
    
    _new_data = {}
    _new_data['name'] = _json['name']
    _new_data['value'] = int(_json['value'])
    _new_data['month'] = _json['month']
    _new_data['year'] = _json['year']


    id = mongo.db[type_of_data].update_one({'_id': ObjectId(_id)}, {'$set': _new_data})

    #required for mongodb pipelines for recurrent data
    if type(_new_data['month']) == list:
        _month = _json['selectedMonth']
    else:
        _month = _new_data['month']

    if type(_new_data['year']) == list:
        _year = _json['selectedYear']
    else:
        _year = _new_data['year']

    return response_builder(type_of_data, _month, _year)