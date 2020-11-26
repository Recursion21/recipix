from app import api
from util.models import *
from flask_restplus import Resource, fields, abort
from flask import request
import secrets
import hashlib
import sqlite3

auth = api.namespace('auth', description='Login and Signup')


@auth.route('/login', strict_slashes=False)
class Login(Resource):
    @auth.response(200, 'Success', token_model)
    @auth.response(400, 'Malformed Request')
    @auth.response(403, 'Invalid Username/Password')
    @auth.expect(login_model)
    @auth.doc(description='''
    	Authenticate an account in the database
    	Returns an authentication token which should be passed into subsequent calls
    	Authentication token verifies the user
    ''')
    def post(self):
        r = request.json

        if not r: 
            abort(400, 'Malformed Request')

        username = r['username']
        password = r['password']

        if not username or not password:
            abort(400, 'Malformed Request')

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        # get user information from database
        sql = 'SELECT username, salt, hash FROM users where username = ?'
        vals = (username,)
        c.execute(sql, vals)

        res = c.fetchone()

        c.close()
        conn.close()
        if not res:
            abort(403, 'Invalid Username/Password')

        (username, salt, stored_hash) = res

        # compute the hash of password passed in 
        salted_password = password + salt
        gen_hash = hashlib.sha256(salted_password.encode()).hexdigest()

        # compare the computed hash and stored hash
        if stored_hash != gen_hash:
            abort(403, 'Invalid Username/Password')

        # it if falls through then they are the proper user

        return {
            'token': stored_hash
        }


@auth.route('/register', strict_slashes=False)
class Register(Resource):
    @auth.response(200, 'Success', token_model)
    @auth.response(400, 'Malformed Request')
    @auth.response(409, 'Username Taken')
    @api.expect(register_model)
    @auth.doc(description='''
        Create a new user account in the database
        Returns an authentication token which should be passed into subsequent calls
    	Authentication token is used to verify the user
    ''')
    def post(self):
        j = request.json
        username = j['username']
        password = j['password']

        if not username or not password:
            abort(400, 'Malformed Request')

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        sql = 'SELECT username FROM users where username = ?'
        vals = (username,)
        c.execute(sql, vals)

        # checking if user exists already
        user_exists = c.fetchall()
        if user_exists:
            abort(409, 'Username Taken, Registered user already exists')

        # generate salt
        salt = secrets.token_hex(4)
        salted_password = password + salt

        # generate hash of salt appended password
        hash = hashlib.sha256(salted_password.encode()).hexdigest()
        sql = 'INSERT INTO users (username, salt, hash) VALUES ("{}", "{}", "{}")'.format(username, salt, hash)
        c.execute(sql)

        conn.commit()
        c.close()
        conn.close()
        
        return {
            'token': hash
        }