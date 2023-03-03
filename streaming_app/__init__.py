from flask import Flask
from flask_migrate import Migrate

# Internal Imports
from config import Config
from .models import db, ma
from .api.routes import api


app = Flask(__name__)


app.config.from_object(Config)
app.register_blueprint(api)

db.init_app(app)
migrate = Migrate(app, db)
ma.init_app(app)