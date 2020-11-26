from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

# Checks that the a specific user is associated with a recipe_id
# If it does not, then it aborts 
def check_owner(user, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    c.execute('SELECT username from Recipes where id = ?', (recipe_id,))
    res = c.fetchone()
    c.close()
    conn.close()
    # if it doesnt return anything, then recipe doesnt exist, cannot delete it.
    if not res:
        abort(406, 'Recipe does not exist')

    owner_user, = res

    if owner_user != user:
        abort(401, 'Invalid User')

# Checks that a recipe has an associated id
# If it doesnt, abort
def check_id_recipe(recipe):
    if not recipe['recipe_id']:
        abort(400, 'Recipe id is empty')

# Checks that each step in a method has an associated instruction
# If it doesnt, abort
def check_methods_recipe(methods):
    for m in methods:
        if not m['instruction']:
            abort(400, 'Instruction is empty')

# Checks that each ingredient in ingredients has an associated name, and quantity
# If it doesnt, abort
def check_ingredients_recipe(ingredients):
    for i in ingredients:
        if not i['name']:
            abort(400, 'Ingredient name is empty')
        if not i['quantity']:
            abort(400, 'Ingredient quantity is empty')

# Checks that a recipe has an associated id, name, servings, description, method and ingredients
# If it doesnt, abort
def check_recipe(recipe):
    if 'recipe_id' in recipe:
        check_id_recipe(recipe)
    if not recipe['recipe_name']:
        abort(400, 'Recipe name is empty')

    if not recipe['servings']:
        abort(400, 'Servings is empty')

    if not recipe['description']:
        abort(400, 'Description is empty')

    check_methods_recipe(recipe['method'])
    check_ingredients_recipe(recipe['ingredients'])

# Checks that an ingredient has an associated name and category
# if it doesnt, abort
def check_ingredients_category(ingredient):
    if not ingredient['name']:
        abort(400, 'Ingredient name is empty')
    if not ingredient['category']:        
        abort(400, 'Ingredient category is empty')
