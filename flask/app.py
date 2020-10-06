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

    return dumps({'success':True}), 200, {'ContentType':'application/json'} 

#fetch documents from the collection of <type_of_data>
@app.route('/fetch/<type_of_data>')
def new_fetch(type_of_data):

    _month = int(request.headers["month"])
    _year = int(request.headers["year"])

    data = mongo.db[type_of_data].find({"month": _month, "year": _year})

    response = dumps(data)
    return response    

#delete document from the collection of <type_of_data> if specific id
@app.route('/delete/<type_of_data>', methods=['POST'])
def delete(type_of_data):
    _json = request.json
    _id = _json['id']
    id = mongo.db[type_of_data].delete_one({'_id': ObjectId(_id)})

    return dumps({'success':True}), 200, {'ContentType':'application/json'} 