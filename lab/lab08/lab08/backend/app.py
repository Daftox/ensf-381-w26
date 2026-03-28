from copy import deepcopy
from pathlib import Path

import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

SEEDED_USERS = {
    "1": {"id": "1", "first_name": "Ava", "user_group": 11},
    "2": {"id": "2", "first_name": "Ben", "user_group": 22},
    "3": {"id": "3", "first_name": "Chloe", "user_group": 33},
    "4": {"id": "4", "first_name": "Diego", "user_group": 44},
    "5": {"id": "5", "first_name": "Ella", "user_group": 55},
}

MODEL_PATH = Path(__file__).resolve().parent / "src" / "random_forest_model.pkl"
PREDICTION_COLUMNS = [
    "city",
    "province",
    "latitude",
    "longitude",
    "lease_term",
    "type",
    "beds",
    "baths",
    "sq_feet",
    "furnishing",
    "smoking",
    "cats",
    "dogs",
]

app = Flask(__name__)
# For this lab, allow cross-origin requests from the React dev server.
# This broad setup keeps local development simple and is not standard
# production practice.
CORS(app)
users = deepcopy(SEEDED_USERS)


# TODO: Define these Flask routes with @app.route():
# - GET /users
#   Return 200 on success. The frontend still expects a JSON array,
#   so return list(users.values()) instead of the dict directly.
# - POST /users
#   Return 201 for a successful create, 400 for invalid input,
#   and 409 if the id already exists. Since users is a dict keyed by
#   id, use the id as the lookup key when checking for duplicates.
# - PUT /users/<user_id>
#   Return 200 for a successful update, 400 for invalid input,
#   and 404 if the user does not exist. Update the matching record
#   with users[user_id] = {...} after confirming the key exists.
# - DELETE /users/<user_id>
#   Return 200 for a successful delete and 404 if the user does not
#   exist. Delete with del users[user_id] after confirming the key
#   exists.

### exercise 1

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(list(users.values())), 200


@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    if not data or not all(k in data for k in ('id', 'first_name', 'user_group')):
        return jsonify({"message": "missing id, first_name or user_group."}), 400
    
    user_id = str(data['id'])
    
    if user_id in users:
        return jsonify({"message": f"User {user_id} already exists."}), 409
    
    users[user_id] = data
    response_body = deepcopy(data)
    response_body["message"] = f"Created user {user_id}."
    return jsonify(response_body), 201


@app.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    if user_id not in users:
        return jsonify({"message": f"User {user_id} was not found."}), 404
        
    if not data or not all(k in data for k in ('first_name', 'user_group')):
        return jsonify({"message": "request body is invalid."}), 400
    
    users[user_id].update({
        "first_name": data['first_name'],
        "user_group": data['user_group']
    })
    
    response_body = deepcopy(users[user_id])
    response_body["message"] = f"Updated user {user_id}."
    return jsonify(response_body), 200


@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    if user_id not in users:
        return jsonify({"message": f"User {user_id} was not found."}), 404
    
    del users[user_id]
    return jsonify({"message": f"Deleted user {user_id}."}), 200


#   Exercise2
# - POST /predict_house_price

@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    try:
        # 5. Inside this route, read the request body from Flask and load the model with
        model = joblib.load(MODEL_PATH)

        # 6. Use the request data to build a sample_data list in the exact order expected by the model.
        data = request.json
        
        has_pets = data.get('pets', False)
        cats = has_pets
        dogs = has_pets

        try:
            sample_data = [
                data['city'],
                data['province'],
                float(data['latitude']),
                float(data['longitude']),
                data['lease_term'],
                data['type'],
                float(data['beds']),
                float(data['baths']),
                float(data['sq_feet']),
                data['furnishing'],
                data['smoking'],
                cats,
                dogs
            ]
        except KeyError as e:
            return jsonify({"message": f"missing field: {str(e)}"}), 400
        except ValueError as e:
            return jsonify({"message": "Latitude, longitude, beds, baths, and sq_feet must be numbers."}), 400

        # 7. Create a one-row pandas dataframe and run the prediction.
        # Convert the result to a Python float, and return it as JSON using the key predicted_price.
        sample_df = pd.DataFrame([sample_data], columns=PREDICTION_COLUMNS)
        predicted_price = model.predict(sample_df)
        predicted_price_float = float(predicted_price[0])
        return jsonify({"predicted_price": predicted_price_float}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True, port=5050)
