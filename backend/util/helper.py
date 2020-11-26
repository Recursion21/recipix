from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

def authenticate(req):
    # get the token
    token = req.headers.get('Authorization')

    if not token:
        abort(403, 'Invalid Authentication Token')

    r = request.json
    conn = sqlite3.connect('database/recipix.db')

    c = conn.cursor()
    # find user
    c.execute('SELECT username from users where hash = ?', (token,))
    res = c.fetchone()

    if not res:
        abort(403, 'Invalid Authentication Token')
    user, = res

    return user

# format recipe tuples input in recipe_t into suitable json return type 
# to be passed back into the front end
def format_recipe(recipe_t):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    ret = {"recipes": []}
    for i, t in enumerate(recipe_t):
        # get tags for each recipe_id, store in tag_t
        c.execute(
            'SELECT tag from Recipe_Tag where recipe_id = {}'.format(t[0]))
        tag_t = c.fetchall()
        # get ingredients for each recipe_id, store in ingredient_t
        c.execute(
            'SELECT ingredient_name, quantity from Recipe_Has where recipe_id = {}'.format(t[0]))
        ingredient_t = c.fetchall()
        # get methods for each recipe_id, store in method_t
        c.execute(
            'SELECT step, instruction from Methods where recipe_id = {}'.format(t[0]))
        method_t = c.fetchall()

        # setting up json model format
        ret["recipes"].append({})
        curr = ret["recipes"][i]
        curr["recipe_id"] = t[0]
        curr["recipe_creator"] = t[1]
        curr["recipe_name"] = t[2]
        curr["servings"] = t[3]
        curr["description"] = t[4]
        curr["image"] = t[5]

        curr["tags"] = []
        curr["ingredients"] = []
        curr["method"] = []

        # extracting information from tuples into json model format
        for i, t in enumerate(tag_t):
            curr["tags"].append({})
            curr_tag = curr["tags"][i]
            curr_tag["tag"] = t[0]

        for i, t in enumerate(ingredient_t):
            curr["ingredients"].append({})
            curr_ingred = curr["ingredients"][i]
            curr_ingred["name"] = t[0]
            curr_ingred["quantity"] = t[1]

        for i, t in enumerate(method_t):
            curr["method"].append({})
            curr_method = curr["method"][i]
            curr_method["instruction"] = t[1]

    c.close()
    conn.close()
    return ret

# get n top recipes from ingredients and tags lists
# top recipes refers to recipes that have the most number 
# of ingredient matches to the input ingredients list
def get_top_recipes(ingredients, tags, n):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()

    # form the sql string dynamically based on input list of ingredients
    sql_str = ('SELECT id, username, name, servings, description, thumbnail, '
                'count(*) from recipe_has h join recipes r on id = recipe_id where ')
    for i in ingredients:
        sql_str += 'ingredient_name = "{}" or '.format(i)
    sql_str = sql_str[:-3]
    sql_str += 'group by recipe_id order by count(*) desc'

    c.execute(sql_str)
    recipe_t = c.fetchall()

    # get top n recipes that match tags
    top_n = []

    # formatting sql_tag query for input list of tags
    sql_tag = '('
    for i in tags:
        sql_tag += 'tag = "{}" or '.format(i)
    sql_tag = sql_tag[:-4]
    sql_tag += ')'

    # check if top recipes from first sql statement match at least 1 of the tags
    # in the input tag list if they exist
    for i in recipe_t:
        if len(top_n) == n:
            break
        if not tags:
            top_n.append(i)
            continue
        sql_str2 = 'SELECT * from recipe_tag where recipe_id = {} and '.format(i[0])
        sql_str2 += sql_tag
        c.execute(sql_str2)
        if (c.fetchall()):
            top_n.append(i)

    c.close()
    conn.close()

    return top_n

# formats particular input (e.g. ingredients list) 
# from the json request r into a list
def get_list(r, key, key2):
    res_list = []
    for x in r[key]:
        if x[key2] == '':
            continue
        res_list.append(x[key2])
    return res_list

# Helper function for updating requests
# If ingredient matches any requests, remove them
def update_requests(ingredients):
    # Once added in, needs to remove any requests that have been fulfilled. 
    # checking if ingredients used in recipe meets any of the requests
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()

    sql = 'select r.request_id from request_has r where ' 
    for i in ingredients:
        sql += 'ingredient_name = "{}" or '.format(i['name'])
    sql = sql[:-3]
    sql += 'group by r.request_id \
            having (count(*) = \
            (select count(*) \
            from request_has r1 \
            where r1.request_id = r.request_id) \
            and count(*) = ?)'

    vals = (len(ingredients),)
    c.execute(sql, vals)
    res = c.fetchone()  

    # if there exists a request, remove it, as the new recipe has been added, fulfilling the request
    if res:
        request_id, = res

        sql = 'delete from requests where id = ?'
        vals = (request_id,)
        c.execute(sql, vals)

        sql = 'delete from request_has where request_id = ?'
        vals = (request_id,)
        c.execute(sql, vals)

        conn.commit()

# Helper function for deleting entries with recipe_id from the database
def delete_from_table(table, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()

    # allowing cascade deletes
    c.execute('PRAGMA foreign_keys = ON')

    column_name = 'recipe_id'
    if table == 'recipes':
        column_name = 'id'

    sql = 'DELETE FROM {} where {} = ?'.format(table, column_name)

    c.execute(sql, (recipe_id,))
    conn.commit()
    c.close()
    conn.close()

# Helper function for adding methods into a table, associating it with a specific
# recipe id
def add_into_methods(method, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    vals = []
    i = 1
    for m in method:
        vals.append((recipe_id, i, m['instruction']))
        i += 1

    sql = 'INSERT INTO methods(recipe_id, step, instruction) VALUES (?, ?, ?)'
    c.executemany(sql, vals)
    conn.commit()
    c.close()
    conn.close()

# Helper function for adding ingredients into a table
# associating the ingredient with a specific recipe id
def add_into_recipe_has(ingredients, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    vals = []
    for i in ingredients:
        vals.append((recipe_id, i['name'], i['quantity']))
    
    sql = 'INSERT INTO recipe_has(recipe_id, ingredient_name, quantity) VALUES (?, ?, ?)'
    c.executemany(sql, vals)
    conn.commit()
    c.close()
    conn.close()

# Helper function for adding tags into a table
# associating the ingredient with a specific recipe id
def add_into_recipe_tag(tags, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    vals = []
    for t in tags:
        vals.append((recipe_id, t['tag']))
     
    sql = 'INSERT INTO recipe_tag(recipe_id, tag) VALUES (?, ?)'
    c.executemany(sql, vals)
    conn.commit()
    c.close()
    conn.close()