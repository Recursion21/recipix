--
-- Comp3900 Recipix Database for MealMatch
--

-- List of Recipes
create table Recipes (
	id 	     		integer,
	username 		text,
	name	 		text collate nocase,
	servings 		integer,
	description  	text,
	thumbnail   	blob,
	time_created 	integer,
	primary key (id),
	foreign key (username) references Users(Username)
);

-- List of Methods in Recipes
create table Methods (
	recipe_id	integer,
	step		integer, 
	instruction text,
	primary key (recipe_id, step),
	foreign key (recipe_id) references Recipes(id) ON DELETE CASCADE
);

-- List of Ingredients
create table Ingredients (
	name 	 text collate nocase,
	category text collate nocase,
	primary key (name)
);

-- (recipe_id, ingredient_name) tuples
create table Recipe_Has (
	recipe_id		integer,
	ingredient_name text collate nocase,
	quantity		text collate nocase,
	primary key (recipe_id, ingredient_name),
	foreign key (recipe_id) references Recipes(id) ON DELETE CASCADE,
	foreign key (ingredient_name) references Ingredients(name)
);

-- List of Users
create table Users (
	username	 	text collate nocase,
	salt	 		text,
	hash	 		text,
	primary key (username)
);

-- recipe tag/category 
create table Tag (
	name text collate nocase,
	primary key(name)
);

-- (recipe_id, tag) tuples
create table Recipe_tag (
	recipe_id	integer,
	tag		 	text collate nocase,
	primary key (recipe_id, tag),
	foreign key (recipe_id) references Recipes(id) ON DELETE CASCADE,
	foreign key (tag) references Tag(name)
);

-- recipe requests
create table Requests (
	id		integer,
	count	integer,
	primary key (id)
);

-- (request_id, ingredient_name) tuples
create table Request_Has (
	request_id		integer,
	ingredient_name text collate nocase,
	primary key (request_id, ingredient_name),
	foreign key (request_id) references Requests(id),
	foreign key (ingredient_name) references Ingredients(name)
);

