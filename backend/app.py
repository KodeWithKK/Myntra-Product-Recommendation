import os

from database.db import init_app
from dotenv import load_dotenv
import logging
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from mangum import Mangum
from resources.routes import initialize_routes

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)
CORS(app, origins=[os.getenv("FRONTEND_URL")])
api = Api(app)

# Configure DB and routes
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
init_app(app)
initialize_routes(api)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Entry point for local development
if __name__ == "__main__":
    app.run(debug=False)

# Entry point for AWS Lambda
lambda_handler = Mangum(app)
