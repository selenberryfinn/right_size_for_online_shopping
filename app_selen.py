from flask import Flask, Response, jsonify, make_response, request
from flask_cors import CORS
import json
from comparison import recommendation

app = Flask(__name__)
CORS(app)


@app.route("/", methods = ['GET','POST'])
def hello():
    data = request.get_json()
    if 'user_sizes' in data and 'product_sizes' in data:
        user_sizes = data['user_sizes']
        product_sizes = data['product_sizes']
        print("user_sizes ARE:", user_sizes)
        print("product_sizes ARE:", product_sizes)
    # user_sizes = request.get_json()
    # product_sizes = request.get_json()
    results = recommendation(user_sizes, product_sizes)
    resp = make_response(results)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    print(results, resp)
    return resp




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
