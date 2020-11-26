from app import api
from flask_restplus import fields

token_model = api.model('token_model',{
    'token': fields.String()
}) 

login_model = api.model('login_model', {
  'username': fields.String(required=True, example='Jamal'),
  'password': fields.String(required=True, example='password123'),
})

register_model = api.model('register_model', {
  'username': fields.String(required=True, example='hotmario258'),
  'password': fields.String(required=True, example='password123'),
})

ingredient_detail_model = api.model('ingredient_detail_model', {
  'name': fields.String(required=True, example='cheese'),
  'category': fields.String(required=True, example='dairy')
})

ingredient_model = api.model('ingredient_model', {
  'name': fields.String(required=True, example='cheese'),
})

ingredient_list_model = api.model('ingredient_list_model', {
  'ingredients': fields.List(fields.Nested(ingredient_model)),
})

category_ingredient_model = api.model('category_ingredient_model', {
  'category': fields.String(required=True, example='dairy'),
  'ingredients': fields.List(fields.Nested(ingredient_model))
})

categories_model = api.model('categories_model', {
  'categories' : fields.List(fields.Nested(category_ingredient_model)), 
})

ingredients_recipe_model = api.model('ingredients_recipe_model', {
  'name': fields.String(required=True, example='Cheese'),
  'quantity': fields.String(required=True, example='500 grams')
})

recipe_id_model = api.model('recipe_id_model', {
  'recipe_id' : fields.Integer(required=True, min=0)
})

tag_model = api.model('tag_model', {
  'tag' : fields.String(required=True, example='Breakfast')
})

tags_model = api.model('tags_model', {
  'tags' : fields.List(fields.Nested(tag_model))
})

ingredients_tags_model = api.model('ingredients_tags_model', {
  'ingredients' : fields.List(fields.Nested(ingredient_model)),
  'tags' : fields.List(fields.Nested(tag_model))
})

recipe_name_tags_model = api.model('recipe_name_tags_model', {
  'search_term' : fields.String(example='chicken'),
  'tags' : fields.List(fields.Nested(tag_model))
})

recipe_method_model = api.model('recipe_method_model', {
  'instruction' : fields.String(required=True, example='Boil the water for 50 minutes until evaporated')
})

recipe_complete_model = api.model('recipe_complete_model', {
  'recipe_id' : fields.Integer(required=True, min=0), 
  'recipe_name' : fields.String(required=True, example='eggs and Cheese ham'),
  'servings' : fields.Integer(required=True, min=0),
  'description' : fields.String(required=True, example='Eggs and cheese ham is a deluxe meal served for kings'),
  'image' : fields.String(required=True, example='base64String'),
  'tags' : fields.List(fields.Nested(tag_model)),
  'ingredients' : fields.List(fields.Nested(ingredients_recipe_model)),
  'method' : fields.List(fields.Nested(recipe_method_model))
})

recipe_id_model = api.model('recipe_id_model', {
  'recipe_id' : fields.Integer(required=True, min=0)
})

recipe_add_model = api.model('recipe_add_model', {
  'recipe_name' : fields.String(required=True, example='eggs and Cheese ham'),
  'image' : fields.String(required=True, example='base64String'),
  'tags' : fields.List(fields.Nested(tag_model)),
  'ingredients' : fields.List(fields.Nested(ingredients_recipe_model)),
  'servings' : fields.Integer(required=True, min=0),
  'method' : fields.List(fields.Nested(recipe_method_model)),
  'description' : fields.String(required=True, example='Eggs and cheese ham is a deluxe meal served for kings')
})

recipe_list_model = api.model('recipe_list_model', {
  'recipes': fields.List(fields.Nested(recipe_complete_model)),
})

# Request models
request_id_model = api.model('request_id_model', {
  'request_id' : fields.Integer(required=True, min=0)
})

request_complete_model = api.model('request_complete_model', {
  'request_id' : fields.Integer(required=True, min=0),
  'times_requested' : fields.Integer(required=True, min=1),
  'ingredients' : fields.List(fields.Nested(ingredient_model))
})

request_list_model = api.model('request_list_model', {
  'requests' : fields.List(fields.Nested(request_complete_model))
})

auth_model = api.parser().add_argument('Authorization', help="Authorization token given from logging in", location='headers', required=True)
