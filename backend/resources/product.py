import json

from database.db import dbi
from flask import jsonify, request
from flask_restful import Resource


# Total Products: 14268
class AddProductsApi(Resource):
    def post(self):
        body = request.get_json()
        start = body.get("start")
        end = body.get("end")

        if "start" not in body or "end" not in body:
            return {
                "message": "Provide Start and End position to avoid BulkWrite Error."
            }, 400

        with open("./data/cleaned_myntra_dataset_frontend.json") as f:
            data = json.load(f)

        products = []

        for item in data[int(start) : int(end)]:
            if item["p_attributes"] == "undefined":
                item["p_attributes"] = {}
            products.append(item)

        try:
            dbi.db.products.insert_many(products)
        except Exception as e:
            return {"error": f"Error inserting products: {e}"}, 500

        return {"message": "Products added successfully"}, 200


class GetProducts(Resource):
    def get(self):
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 20))
        skip = (page - 1) * per_page

        products = (
            dbi.db.products.find({"ratingCount": {"$exists": True, "$ne": ""}})
            .sort("ratingCount", -1)
            .skip(skip)
            .limit(per_page)
        )

        products_list = list(products)
        for product in products_list:
            product["_id"] = str(product["_id"])

        return jsonify(products_list)


class GetProduct(Resource):
    def get(self, id):
        try:
            product = dbi.db.products.find_one({"p_id": int(id)})

            if product:
                product["_id"] = str(product["_id"])
                return jsonify(product)
            else:
                return {"message": "Product not found"}, 404

        except Exception as e:
            return {"error": f"Error fetching product: {e}"}, 500


class SearchProducts(Resource):
    def get(self):
        query = request.args.get("q", "")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 20))
        skip = (page - 1) * per_page

        search_query = {"name": {"$regex": query, "$options": "i"}}
        results = dbi.db.products.find(search_query).skip(skip).limit(per_page)

        results_list = list(results)
        for result in results_list:
            result["_id"] = str(result["_id"])

        return jsonify(results_list)
