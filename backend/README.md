# Recipix Backend
The backend server is a REST API that is responsible for handling http requests from the frontend application. Thus it must be ran before the frontend will be functional.

# Dependencies

Running this backend requires the following to be installed: 
 - python3 
 - pip
 - virtualenv 
 - sqlite3 (If you want to remake the database)

## python3 
To install python3:
```bash
sudo apt-get install python3
```

## pip
To install pip:
```bash
sudo apt-get install pip3
```

## venv
To install venv:
```bash
pip install virtualenv
```

## sqlite3
To initialize the database, you must have sqlite3 installed.
To install sqlite3:
```bash
sudo apt-get install sqlite3
```

# Running the backend

It is recommended to use virtual env to install the dependencies that the backend server uses. 
To do so, go into the backend directory using 

```bash
cd backend
# create a sandbox to install dependencies for the backend
virtualenv -p python3 env

# activate the sandbox
source env/bin/activate

# set up dependencies
pip install -r requirements.txt

# run the backend. 
python3 backend_server.py

```

To terminate the process, simply enter into the terminal that the process is running in and press ctrl C. 

Once you are finished with running the backend, you can deactivate the sandbox using
```bash
deactivate
```

# Database

## Database
Initially in the repo, the database should exist, populated with synthetic data as recipix.db

### Removing the database
If there are issues with the database, you may choose to rebuild the database. 

In that case you can simply remove the database file with the following steps:

```bash
# enter into directory where recipe is located
cd backend/database/
# remove the database file
rm recipix.db
```

Doing so will render the backend server in a non functioning state. Hence you must build the database again. 

### Building the database
```bash
# cd into the directory where the database is 
cd backend/database/

# Create a new database using 
sqlite3 recipix.db

# Inside the prompt, you will be able to provide instructions and query the database.
SQLite version 3.22.0 2018-01-22 18:45:57
Enter ".help" for usage hints.
# read in the schema for the database
sqlite> .read schema.sql

# read in the synthetic data for the database
# skip this step if you want the database to be empty, and with no users, no recipes, no ingredients etc.
sqlite> .read data.sql

# Exit 
sqlite> .q 
```

Once you have complete the steps above, your database should be in a valid state, and the backend server will be functioning. 

