from app import api
from util.models import *
from util.helper import *
from util.checkers import *
from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

ingredients = api.namespace('ingredients', description='adding ingredients')

@ingredients.route('/add', strict_slashes=False)
class Add(Resource):
    @ingredients.response(200, 'Success')
    @ingredients.response(400, 'Malformed Request')
    @ingredients.response(403, 'ingredient already exists')
    @ingredients.expect(ingredient_detail_model)
    @ingredients.doc(description='''
    	Takes in category, and ingredient_name
        Sending the ingredient into this endpoint will result in the ingredient being added to the database.
        Once added to the database, the ingredient will show up when searched for
    ''')
    def post(self):
        r = request.json
        ### TODO 
        if not r:
            abort(400, 'Malformed Request')

        check_ingredients_category(r)

        ing_name = r['name'].lower()
        ing_category = r['category'].lower()
        
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        sql = 'SELECT name from ingredients where name = ?'
        vals = (ing_name,)
        c.execute(sql, vals)
        existing_ingredient = c.fetchone()

        if existing_ingredient:
            abort(403, 'Ingredient already exists') 

        sql = 'INSERT INTO ingredients (name, category) VALUES (?, ?)'
        vals = (ing_name, ing_category)

        c.execute(sql, vals)
        conn.commit()

        c.close()
        conn.close()
        return {
            'message': 'success'
        }

@ingredients.route('/all', strict_slashes=False)
class All(Resource):
    @ingredients.response(200, 'Success', categories_model)
    @ingredients.doc(description='''
        Returns a list of all the existing ingredients that is stored in the database.
    ''')
    def get(self):
        ### TODO 

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        # get all ingredients from database
        c.execute('SELECT * from ingredients;')
        t = c.fetchall()
        
        c.close()
        conn.close()

        # formats the ingredients into specific categories
        ret = {"categories": []}
        ing = {}
        for x,y in t:
            if y not in ing:
                ing[y] = []
            ing[y].append(x)
        
        for key in ing:
            cat = {
                "category": key, 
                "ingredients": []
            }
            for ingredient in ing[key]:
                ingred = {
                    "name": ingredient
                }
                cat['ingredients'].append(ingred)
            ret['categories'].append(cat)
        
        # returns the ingredients in a specified format
        return ret
