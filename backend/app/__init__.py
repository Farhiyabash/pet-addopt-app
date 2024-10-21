from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .extensions import db, jwt
from .models import Pet, User, AdoptionRequest, Breed, PetType
from .routes import routes_app
from .config import Config

def create_app():
    app = Flask(__name__)

    # Load configuration from the Config class
    app.config.from_object(Config)

    # Initialize CORS with specified origins
    CORS(app, resources={r"/*": {"origins": Config.CORS_ORIGINS}})

    # Initialize database and migration support
    db.init_app(app)
    migrate = Migrate(app, db)

    # Initialize JWT for the application
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(routes_app)

    return app