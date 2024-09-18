import os

from database.db import initialize_db
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from resources.routes import initialize_routes

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
api = Api(app)
load_dotenv()


app.config["MONGODB_SETTINGS"] = {"host": os.getenv("MONGODB_URI")}


initialize_db(app)
initialize_routes(api)


app.run(debug=False)
