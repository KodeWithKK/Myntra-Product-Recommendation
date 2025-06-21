import os

from database.db import init_app
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api
from mangum import Mangum
from resources.routes import initialize_routes

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=[os.getenv("FRONTEND_URL")])
api = Api(app)

app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
init_app(app)
initialize_routes(api)


@app.route("/")
def hello():
    return jsonify({"message": "Hello from Myntra"})


# ✅ Lambda-compatible handler (used by SAM or real Lambda)
handler = Mangum(app)

# ✅ Only run server if run locally (not when SAM invokes it)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
