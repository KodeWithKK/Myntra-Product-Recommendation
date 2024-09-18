import json

from database.models import Product
from flask import jsonify, request
from flask_restful import Resource


# Total Products: 14435
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
            product = Product(**item)
            products.append(product)

        batch_size = 5000
        for i in range(0, len(products), batch_size):
            batch = products[i : i + batch_size]
            try:
                Product.objects.insert(batch)
            except Exception as e:
                print(f"Error inserting products: {e}")

        return {"message": "Products added successfully"}, 200


class GetProducts(Resource):
    def get(self):
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 20))
        skip = (page - 1) * per_page
        products = Product.objects.skip(skip).limit(per_page)
        return jsonify(products)


class GetProduct(Resource):
    def get(self, id):
        product = Product.objects.get(p_id=id)
        return jsonify(product)


class SearchProducts(Resource):
    def get(self):
        query = request.args.get("q", "")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 20))
        skip = (page - 1) * per_page

        # Case-insensitive search in 'name'
        search_query = Product.objects.filter(name__icontains=query)
        results = search_query.skip(skip).limit(per_page)
        return jsonify(results)
