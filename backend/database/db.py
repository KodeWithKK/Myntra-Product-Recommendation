from flask_pymongo import PyMongo

# Create a PyMongo instance
dbi = PyMongo()


def init_app(app):
    # Initialize the PyMongo instance with the app
    dbi.init_app(app)
