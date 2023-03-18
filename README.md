# Pauls Panels Limited
Digital traceability app for a manufacturing environment

## Application objective
The project came to live to help with managing a small workshop. It allows to manage inventory, record operations and produce quality reports.

## Challange
The user interface has to be as simple and minimalistic as possible so the data input would be very easy and take as little time as possible. I tried to find the ways to auto fill as many information as possible. The application uses the logged in user as the person who "signs" the operation. It also records time and date of the signature. The parts can be recognized and called by serial number or date.

## Tools used
The project has been built with Django/REST framework at the backend. It also utilises React in the frontend.

## How to run
To run this app you will need python3.10 installed on your system.

Create a new folder for the application and move into that folder:

```mkdir <folder_name> && cd <folder_name>```

Clone the git repo:

```git clone git@github.com:PiotrZettt/pauls-panels-limited.git```

Create a virtual environment for the project:

```python3 -m venv <your_env_name>```

Activate by:

```source <your_env_name>/bin/activate```

Change directory to the PaulsPanelsLimited Django app:

```cd PaulsPanelsLimited```

Install all requirements by:
```pip install -r requirements.txt```

Before you create a database and run the server you will need to create a secret key by exporting an environmental variable. It will be read and used by Django's settings.py

```export SECRET_KEY="<Use_a_string_here>"```

The project uses Postgres. It is necessary to config the settings.py file with your Database credentials.
Create a .env file in the root directory:

``` PaulsPanelsLogistics % touch .env```

Open the file and paste the line:

```DATABASE_URL=postgres://user:password@host:port/database_name```
replace: 'user', 'password', 'host', 'port', 'database_name' with your database credentials and save.


We can create the tables now:

```python manage.py makemigrations```  
```python manage.py migrate```

You will also need an admin account. Use command:

```python manage.py createsuperuser```

and follow the prompts.

To run the frontend React you need to go to the react directory and install the dependencies:
```cd react & npm init -y```

and run webpack:
```npm run dev```

Everything's ready now. Run the app by:

```python manage.py runserver```

The app will open in your browser on http://127.0.0.1:8000/  

