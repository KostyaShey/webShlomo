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

    if type_of_data == "expenses" or type_of_data  == "income":
        data = mongo.db[type_of_data].find({"month": _month, "year": _year})

    if type_of_data == "mExpenses" or type_of_data  == "mIncome":
        data = mongo.db[type_of_data].find()

    response = dumps(data)
    return response  

#fetch documents from the collection of <type_of_data>
@app.route('/fetch/<type_of_data>')
def fetch(type_of_data):

    _month = int(request.headers["month"])
    _year = int(request.headers["year"])
    _type_of_data = type_of_data

    if _type_of_data == "expenses" or _type_of_data  == "income":
        data = mongo.db[type_of_data].find({"month": _month, "year": _year})
        pipeline = [
            {'$match': {'$and': [{'month': _month}, {'year': _year}]}},
            { '$group': { '_id': 'null', 'total': { '$sum': "$value" }}}
        ]

    if _type_of_data == "mExpenses" or _type_of_data  == "mIncome":
        data = mongo.db[type_of_data].find()
        pipeline = [
            {'$match': {'$and': [{'month': {'$elemMatch': {'$eq': _month}}}, {'year': {'$elemMatch': {'$eq': _year}}}]}},
            { '$group': { '_id': 'null', 'total': { '$sum': "$value" }}}
        ]

    total = mongo.db[type_of_data].aggregate(pipeline)

    response = '{ "data": ' + dumps(data) + ', "total": ' + dumps(total) + '}'

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
    
    _new_data = {}
    _new_data['name'] = _json['name']
    _new_data['value'] = int(_json['value'])
    _new_data['month'] = _json['month']
    _new_data['year'] = _json['year']

    id = mongo.db[type_of_data].update_one({'_id': ObjectId(_id)}, {'$set': _new_data})

    if type_of_data == "expenses" or type_of_data  == "income":
        data = mongo.db[type_of_data].find({"month": _json['month'], "year": _json['year']})
    if type_of_data == "mExpenses" or type_of_data  == "mIncome":
        data = mongo.db[type_of_data].find()

    response = dumps(data)
    return response  

@app.route('/summary')
def summary():
    _month = int(request.headers["month"])
    _year = int(request.headers["year"])

    pipeline = [
        {'$match': {'$and': [{'month': _month}, {'year': _year}]}},
        { '$group': { '_id': 'null', 'total': { '$sum': "$value" }}}
    ]

    pipeline_recurrent = [
        {'$match': {'$and': [{'month': {'$elemMatch': {'$eq': _month}}}, {'year': {'$elemMatch': {'$eq': _year}}}]}},
        { '$group': { '_id': 'null', 'total': { '$sum': "$value" }}}
    ]

    income = mongo.db.income.aggregate(pipeline)
    expenses = mongo.db.expenses.aggregate(pipeline)
    recurrent_income = mongo.db.mIncome.aggregate(pipeline_recurrent)
    recurrent_expenses = mongo.db.mExpenses.aggregate(pipeline_recurrent)

    balance = 0

    # To Do: find a solution to refactor this pain in the ass
    for document in income:
        balance += document['total']
    for document in recurrent_income:
        balance += document['total']
    for document in expenses:
        balance -= document['total']
    for document in recurrent_expenses:
        balance -= document['total']

    response = dumps(balance)
    return response  