from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True)
    email= db.Column(db.String(200), unique=True)
    password = db.Column(db.String(500))


    def serialize(self):
        return {
            "id": self.id,
            'username': self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }