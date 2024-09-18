from .product import AddProductsApi, GetProduct, GetProducts, SearchProducts


def initialize_routes(api):
    api.add_resource(AddProductsApi, "/api/add-products")
    api.add_resource(GetProducts, "/api/products")
    api.add_resource(GetProduct, "/api/product/<id>")
    api.add_resource(SearchProducts, "/api/search")
