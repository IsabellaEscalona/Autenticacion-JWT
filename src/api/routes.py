"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_bcrypt import Bcrypt



api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.json
    
    if not body.get('email') or not body.get('username') or body.get('passsword'):
        return jsonify({'error': 'Email, usuario y contraseña son obligatorios'}), 400
    
    existing_user= User.query.filter_by(email= body['email']).first()

    if existing_user:
        return jsonify({'error': 'Este usuario ya existe'})
    
    hashed = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user= User(email=body['email'], username=body['username'], password=hashed)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario creado existosamente', 'User': new_user.serialize()}), 200

@api.route('/login', methods=['POST'])
def handle_login():
    body= request.json
    user = User.query.filter_by(email=body['email']).first()

    if user is None or not bcrypt.check_password_hash(user.password, body['password']):
        return jsonify({'error':'Email o contraseña incorrecta'}), 401
    
    token = create_access_token(identity=str(user.id))

    return jsonify({'message':'Sesion iniciada correctamente', 'token': token, 'user': user.serialize()}), 200