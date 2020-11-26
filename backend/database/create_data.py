from random import random

def rand():
    return int(random()*1000000)

ing_dict = {}

ing_dict['dairy'] =     ['egg', 'butter', 'milk', 'cheese', 'cheddar', 'yogurt', 'custard', 'sour cream']
ing_dict['fish'] =      ['canned tuna', 'fish fillets', 'cod', 'salmon', 'sardines']
ing_dict['vegetable'] = ['onion', 'tomato', 'potato', 'carrot', 'broccoli', 'corn', 'spinach', 'mushroom', 'ginger']
ing_dict['fruit'] =     ['lemon', 'apple', 'banana', 'strawberry', 'orange', 'blueberry', 'raspberry', 'mango']
ing_dict['grains'] =    ['rice', 'pasta', 'flour', 'bread', 'baking powder', 'yeast']
ing_dict['meat'] =      ['chicken breast', 'ground beef', 'bacon', 'sausage', 'ham', 'hot dog', 'chicken thighs', 'pork']
ing_dict['seafood'] =   ['shrimp', 'crab', 'prawns', 'scallop', 'clam', 'lobster', 'mussel', 'oyster']

adjectives = ['non-fat', 'nutmeg', 'nutty', 'oily', 'open face', 'organic', 'overpowering', 'palatable indicates', 'penetrating', 'peppery', 'perfection', 'petite', 'pickled', 'piquant', 'plain', 'pleasant', 'plump', 'poached', 'popular', 'pounded', 'prepared', 'prickly', 'pulpy', 'pungent', 'pureed', 'rancid', 'rank', 'reduced', 'refresh', 'rich', 'ripe', 'roasted', 'robust', 'rotten', 'rubbery', 'saccharine', 'saline', 'salty', 'savory', 'Sapid', 'saporific', 'saporous', 'satin', 'satiny', 'sauteed', 'savorless', 'savory', 'scrumptious', 'sea salt', 'seared', 'seasoned', 'served in', 'served with', 'sharp', 'sharp-tasting', 'silky', 'simmered', 'sizzling', 'skillfully', 'small', 'smelly', 'smoked', 'smoky', 'smooth', 'smothered', 'soothing', 'sour', 'Southern style', 'special', 'spiced', 'spicy', 'spiral-cut', 'spongy', 'sprinkled', 'stale', 'steamed', 'steamy', 'sticky', 'stinging', 'strawberry flavored', 'strong', 'stuffed', 'succulent', 'sugar coated', 'sugar free', 'sugared', 'sugarless', 'sugary', 'superb', 'sweet', 'sweet-and-sour', 'sweetened', 'syrupy', 'tangy', 'tantalizing']

method_descrip = [
    "Cut the ",
    "Slam the ",
    "Put the ",
    "Fry the ",
    "Hit the ",
    "Beat the ",
    "Break the ",
    "Melt the ",
    "Spread the ",
    "Layer the ",
    "Roll out the ",
    "Fry the ",
    "Peel the ",
    "Mix the ",
    "Whip the ",
    "Saute the ",
    "Taste the ",
    "Cut the ",
    "Chop the ",
    "Slice the ",
    "Grate the ",
    "Boil the ",
    "Steam the ",
    "Pinch the ",
    "Pour the ",
    "Add the ",
    "Barbecue the ",
    "Roast the ",
    "Bake the ",
    "Stir the ",
    "Weigh the "
] 

tags = [
    "Entree",
    "Main",
    "Breakfast",
    "Salad",
    "Soup",
    "Side dish", 
    "Lunch",
    "Dinner",
    "Dessert"
]

quant_des = [
    "grams",
    "whole",
    "mL",
    "teaspoon(s)",
    "cup(s)"
]

print("##################################")
print("ingredients brother")
for category, items in ing_dict.items():
    for ingred in items:
        print('("{}", "{}"),'.format(ingred, category))
print("##################################")

users = ['gordo', 'bigdave', 'jeff']

def select_ingredients():
    ingredients = []
    cats = ['dairy', 'fish', 'vegetable', 'fruit', 'grains', 'meat', 'seafood']
    for i in range(rand()%5+1):
        category = cats[rand()%len(cats)]
        length = len(ing_dict[category])
        ingredients.append(ing_dict[category][rand()%length])
    return ingredients

recipes = []
methods = []
rec_tags = []
rec_hass = []

for id in range(1, 151):
    user = '"' + users[rand()%3] + '"'

    ingredients = select_ingredients()
    ingredients = list(set(ingredients))
    ## inserting into the recipe table
    title = ' and '.join(ingredients)
    servings = rand()%6 +2

    adjective = adjectives[rand()%len(adjectives)]
    description = adjective + ' ' + title
    description = '\"' + description + '\"'

    title = '\"' + title + '\"'
    thumbnail = "\'\'"

    recipe = '({}, {}, {}, {}, {}),'.format(user, title, servings, description, thumbnail) 

    recipes.append(recipe)
    ## inserting into the method table
    for j in range(len(ingredients)):
        meth = '({}, {}, \"{}{}!\"),'.format(id, j, method_descrip[rand()%len(method_descrip)], ingredients[j])
        methods.append(meth)

    ## inserting into the recipe_tag table
    for j in range(2):
        tag = tags[rand()%len(tags)]
        tag_str = '({}, "{}"),'.format(id, tag)
        rec_tags.append(tag_str)

    ## inserting into the recipe_has table
    
    for j in range(len(ingredients)):
        quant = quant_des[rand()%len(quant_des)]
        rec_has = '({}, "{}", "{} {}"),'.format(id, ingredients[j], rand()%100, quant)
        rec_hass.append(rec_has)


rec_tags = list(set(rec_tags))

print("##################################")
print("recipes")
for x in recipes:
    print(x)

print("##################################")
print("methods")
for x in methods:
    print(x)

print("##################################")
print("rec_tags")
for x in sorted(rec_tags):
    print(x)

print("##################################")
print("rec_has")
for x in rec_hass:
    print(x)
