from flask import Flask, jsonify
from flask import send_from_directory
from werkzeug.routing import BaseConverter

from sqlalchemy import create_engine
from flask_cors import CORS

import sqlite3
from setupDB import ConferenceDB
from sqlalchemy.ext.declarative import declarative_base
import pandas as pd

app = Flask(__name__, static_url_path="", static_folder="scs-app/dist/scs-app/")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

Base = declarative_base()

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
    //print(categoryList)
    engine = create_engine('sqlite:////tmp/test.db')
    Base.metadata.create_all(engine)
    file_name = 'womenInTechConferences.csv'
    df = pd.read_csv(file_name)
    df.to_sql(name = ConferenceDB.__tablename__, con=engine, index_label='id', if_exists='replace')
    techdb = engine.execute("SELECT * FROM womenInTechResources").fetchall()
    print((type(techdb)))
    print(techdb)
    d = {t[0]:t[1:] for t in techdb}
    return d
    #change


if __name__ == "__main__":
    app.run()
