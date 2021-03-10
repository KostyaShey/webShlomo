import time
import os
from flask import Flask, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

#imports for oauth
import json
from flask import redirect, url_for
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
    UserMixin
)
from oauthlib.oauth2 import WebApplicationClient
import requests

#app setup
app = Flask(__name__, static_folder='../webshlomo/build', static_url_path='/')
app.secret_key = os.environ.get("SECRET_KEY", None)
app.config['MONGO_URI'] = os.environ['MONGO_DB_LINK']
mongo = PyMongo(app)

#oauth config
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
client = WebApplicationClient(GOOGLE_CLIENT_ID)
# User session management setup
# https://flask-login.readthedocs.io/en/latest
login_manager = LoginManager()
login_manager.init_app(app)
# Flask-Login helper to retrieve a user from our db
@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

#class for user management
class User(UserMixin):
    def __init__(self, id_, name, email):
        self.id = id_
        self.name = name
        self.email = email

    @staticmethod
    def get(user_id):
        user = mongo.db.users.find_one({"id_": user_id})
        print(user)
        print(type(user))
        if user == None:
            return None

        user = User(
            id_=user["id_"], name=user["name"], email=user["email"]
        )
        return user

    @staticmethod
    def create(id_, name, email):
        mongo.db.users.insert(
            {'id_': id_, 'name': name, 'email': email})


def get_google_provider_cfg():
    try:
        return requests.get(GOOGLE_DISCOVERY_URL).json()
    except Exception as e:
        print(e)


@app.route("/login")
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@app.route("/login/callback")
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send a request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    # Create a user in your db with the information provided
    # by Google
    user = User(
        id_=unique_id, name=users_name, email=users_email
    )

    # Doesn't exist? Add it to the database.
    if User.get(unique_id) == None:
        User.create(unique_id, users_name, users_email)

    # Begin user session by logging the user in
    login_user(user)

    # Send user back to homepage
    return redirect(url_for("index"))

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))



#helper function for response_builder function
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

#helper function for CRUD operations
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

if __name__ == "__main__":
    app.run(ssl_context="adhoc")