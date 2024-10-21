from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Initialize the database object
db = SQLAlchemy()

# Initialize the JWT manager
jwt = JWTManager()

# Initialize CORS
cors = CORS()