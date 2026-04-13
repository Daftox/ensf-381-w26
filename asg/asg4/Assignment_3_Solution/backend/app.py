"""
Timothée Chuat UCID 30301255
Leo Zheng UCID 30263546
ENSF 381 - Assignment 4
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import bcrypt
import json
import os
from datetime import datetime
import re
import random

app = Flask(__name__)
CORS(app)

FLAVORS_FILE = 'flavors.json'
REVIEWS_FILE = 'reviews.json'
USERS_FILE = 'users.json'

@app.route('/')
def home():
    return "Sweet Scoop Backend is running!"

def save_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

def load_json(filename):
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return json.load(f)
    return []

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')


    if not (3 <= len(username) <= 20):
        return jsonify({"success": False, "message": "Username must be between 3 and 20 characters."}), 400
    
    if not re.match(r'^[a-zA-Z][a-zA-Z0-9_-]*$', username):
        return jsonify({"success": False, "message": "Username must start with a letter and contain only letters, numbers, underscores, or hyphens."}), 400

    if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
        return jsonify({"success": False, "message": "Invalid email format."}), 400

    if len(password) < 8:
        return jsonify({"success": False, "message": "Password must be at least 8 characters long."}), 400
    
    if not (re.search(r'[A-Z]', password) and 
            re.search(r'[a-z]', password) and 
            re.search(r'[0-9]', password) and 
            re.search(r'[!@#$%^&*(),.?":{}|<>]', password)):
        return jsonify({"success": False, "message": "Password must contain at least one uppercase, one lowercase, one number, and one special character."}), 400

    users = load_json(USERS_FILE)
    if any(u['username'] == username for u in users):
        return jsonify({"success": False, "message": "Username is already taken."}), 400
    
    if any(u['email'] == email for u in users):
        return jsonify({"success": False, "message": "Email is already registered."}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    new_user = {
        "id": len(users) + 1,
        "username": username,
        "email": email,
        "password_hash": hashed_pw.decode('utf-8'),
        "cart": [],
        "orders": []
    }

    users.append(new_user)
    save_json(USERS_FILE, users)

    return jsonify({"success": True, "message": "Registration successful."}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '')

    users = load_json(USERS_FILE)
    
    user = next((u for u in users if u['username'] == username), None)

    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            return jsonify({
                "success": True,
                "message": "Login successful.",
                "userId": user["id"],
                "username": user["username"]
            }), 200

    return jsonify({
        "success": False,
        "message": "Invalid username or password."
    }), 401

@app.route('/reviews', methods=['GET'])
def get_reviews():
    try:
        all_reviews = load_json(REVIEWS_FILE)
        
        if len(all_reviews) >= 2:
            selected_reviews = random.sample(all_reviews, 2)
        else:
            selected_reviews = all_reviews

        return jsonify({
            "success": True,
            "message": "Reviews loaded.",
            "reviews": selected_reviews
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error loading reviews: {str(e)}"
        }), 500

@app.route('/flavors', methods=['GET'])
def get_flavors():
    flavors = load_json(FLAVORS_FILE)
    return jsonify({
        "success": True,
        "message": "Flavors loaded.",
        "flavors": flavors
    }), 200

@app.route('/cart', methods=['GET'])
def get_cart():
    user_id = request.args.get('userId', type=int) 
    users = load_json(USERS_FILE)
    user = next((u for u in users if u['id'] == user_id), None)
    
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404
    
    return jsonify({
        "success": True, 
        "message": "Cart loaded.",
        "cart": user.get('cart', [])
    }), 200

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data.get('userId')
    flavor_id = data.get('flavorId')
    users = load_json(USERS_FILE)
    flavors = load_json(FLAVORS_FILE)
    user = next((u for u in users if u['id'] == user_id), None)
    flavor = next((f for f in flavors if f['id'] == flavor_id), None)

    if not user or not flavor:
        return jsonify({"success": False, "message": "User or Flavor not found"}), 404

    if any(item['flavorId'] == flavor_id for item in user['cart']):
        return jsonify({
            "success": False, 
            "message": "Flavor already in cart. Use PUT to update quantity."
        }), 400

    new_item = {
        "flavorId": flavor['id'],
        "name": flavor['name'],
        "price": float(str(flavor['price']).replace('$', '')),
        "quantity": 1
    }
    user['cart'].append(new_item)
    save_json(USERS_FILE, users)
    
    return jsonify({"success": True, "message": "Flavor added to cart.", "cart": user['cart']}), 201

@app.route('/cart', methods=['PUT'])
def update_cart_quantity():
    data = request.get_json()
    user_id = data.get('userId')
    flavor_id = data.get('flavorId')
    new_quantity = data.get('quantity')

    if new_quantity < 1:
        return jsonify({"success": False, "message": "Quantity must be at least 1"}), 400

    users = load_json(USERS_FILE)
    user = next((u for u in users if u['id'] == user_id), None)

    if user:
        for item in user['cart']:
            if item['flavorId'] == flavor_id:
                item['quantity'] = new_quantity
                save_json(USERS_FILE, users)
                return jsonify({"success": True, "message": "Cart updated successfully.", "cart": user['cart']}), 200

    return jsonify({"success": False, "message": "Item not found in cart"}), 404

@app.route('/cart', methods=['DELETE'])
def remove_from_cart():
    data = request.get_json()
    user_id = data.get('userId')
    flavor_id = data.get('flavorId')

    users = load_json(USERS_FILE)
    user = next((u for u in users if u['id'] == user_id), None)

    if user:
        user['cart'] = [item for item in user['cart'] if item['flavorId'] != flavor_id]
        save_json(USERS_FILE, users)
        return jsonify({"success": True, "message": "Flavor removed from cart.", "cart": user['cart']}), 200

    return jsonify({"success": False, "message": "User not found"}), 404

@app.route('/orders', methods=['POST'])
def place_order():
    data = request.get_json()
    user_id = data.get('userId')

    users = load_json(USERS_FILE)
    user = next((u for u in users if u['id'] == user_id), None)

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    if not user['cart']:
        return jsonify({"success": False, "message": "Cart is empty"}), 400

    total = 0
    for item in user['cart']:
        price_val = float(str(item['price']).replace('$', ''))
        total += price_val * item['quantity']

    new_order = {
        "orderId": len(user['orders']) + 1,
        "items": list(user['cart']),
        "total": round(total, 2),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    user['orders'].append(new_order)
    user['cart'] = [] 

    save_json(USERS_FILE, users)

    return jsonify({
        "success": True, 
        "message": "Order placed successfully!",
        "order": new_order
    }), 201

@app.route('/orders', methods=['GET'])
def get_order_history():
    user_id = request.args.get('userId', type=int)
    users = load_json(USERS_FILE)
    user = next((u for u in users if u['id'] == user_id), None)

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    return jsonify({
        "success": True,
        "message": "Order history loaded.",
        "orders": user.get('orders', [])
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)