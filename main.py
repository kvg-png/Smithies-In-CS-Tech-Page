from flask import Flask, jsonify
from flask import send_from_directory
from werkzeug.routing import BaseConverter

from sqlalchemy import create_engine
from flask_cors import CORS

import sqlite3
import setupDB

app = Flask(__name__, static_url_path="", static_folder="scs-app/dist/scs-app/")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


app.url_map.converters['regex'] = RegexConverter

@app.route("/")
def angular():
    return send_from_directory("scs-app/dist/scs-app/", "index.html")

@app.route("/<regex('\w\.(js|css)'):path>")
def angular_src(path):
    return send_from_directory("scs-app/dist/scs-app/", path)

@app.route("/api/hello")
def hello():
    return jsonify({'myText' : "Hello World!"})

@app.route("/api/dbresults")
def dbresults():
    connec = sqlite3.connect('womenInTechResources')
    #connec = sqlite3.connect('sqlite:////womenInTechResources.db')
    cur = connec.cursor()
    cur.execute('SELECT * FROM womenInTechResources')
    dbtable = cur.fetchall()
    return jsonify({'myText' : "Hello World!"})

if __name__ == "__main__":
    app.run()
