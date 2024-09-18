from .db import db


class Product(db.Document):
    p_id = db.IntField(required=True, unique=True)
    name = db.StringField(required=True)
    price = db.IntField(required=True)
    colour = db.StringField(required=True)
    brand = db.StringField(required=True)
    img = db.URLField(required=True)
    ratingCount = db.IntField(required=True)
    avg_rating = db.IntField(required=True)
    description = db.StringField(required=True)
    p_attributes = db.DictField(required=True)
