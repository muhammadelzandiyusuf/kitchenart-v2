[![Build Status](https://dev.azure.com/muliasukses/KitchenArt/_apis/build/status/ka-web-ecommerce?branchName=release%2F0.5.0)](https://dev.azure.com/muliasukses/KitchenArt/_build/latest?definitionId=10&branchName=release%2F0.1)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# KitchenArt Web Ecommerce

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing 
purposes.

### Usage

1. Go to project folder and install dependencies:
 ```sh
 yarn install
 ```

2. Launch development server, and open `localhost:3000` in your browser:
 ```sh
 yarn start
 ```

## Starting Dev Dependencies

We'll make this easier, but just run this in the terminal for now.

```bash
docker-compose up -d

docker exec ka-db psql -Udev -c 'CREATE DATABASE uam'
docker exec ka-uam python manage.py migrate

docker exec ka-db psql -Udev -c 'CREATE DATABASE cores'
docker exec ka-core python manage.py migrate

docker exec ka-db psql -Udev -c 'CREATE DATABASE cms'
docker exec ka-cms python manage.py migrate

docker exec ka-db psql -Udev -c 'CREATE DATABASE fulfillment'
docker exec ka-fulfillment python manage.py migrate
```

### Now the non-automated stuff.
Load fixtures data:
```bash
docker exec ka-uam python manage.py loaddata module.json
docker exec ka-uam python manage.py loaddata site.json

docker exec ka-core python manage.py loaddata site.json
docker exec ka-core python manage.py loaddata destination.json
docker exec ka-core python manage.py loaddata origin.json
docker exec ka-core python manage.py loaddata attribute.json
docker exec ka-core python manage.py loaddata category.json
docker exec ka-core python manage.py loaddata brand.json
docker exec ka-core python manage.py loaddata supplier.json
docker exec ka-core python manage.py loaddata specification.json
docker exec ka-core python manage.py loaddata product.json
docker exec ka-core python manage.py loaddata payment.json
docker exec ka-core python manage.py product_index reindex

docker exec ka-cms python manage.py loaddata site.json
```

If you need to create a superuser account:
```bash
docker exec -it ka-uam python manage.py createsuperuser
```

Run celery for delay job:
```bash
docker exec ka-uam celery -A uam worker -l INFO
docker exec ka-core celery -A core worker -l INFO
```

Run consumer:
```bash
docker exec ka-cms python manage.py consume
docker exec ka-core python manage.py consume
```