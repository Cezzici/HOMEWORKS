from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)

@app.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    result = [{'id': product.id, 'name': product.name, 'price': product.price} for product in products]
    return jsonify(result)

@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(name=data['name'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully!'})

# ... Alte funcționalități CRUD ...

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
