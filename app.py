from flask import Flask, Response, jsonify, make_response, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/", methods = ['GET','POST'])
def hello():
    userData = request.get_json()
    print(userData)

    resp = make_response({"hello": "hi"})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)



# https://timmyreilly.azurewebsites.net/python-flask-windows-development-environment-setup/
