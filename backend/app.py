import os

from database.db import init_app
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from resources.routes import initialize_routes

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
api = Api(app)
load_dotenv()

app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
init_app(app)
initialize_routes(api)

if __name__ == "__main__":
    app.run(debug=False)
