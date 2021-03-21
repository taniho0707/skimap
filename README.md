# skimap
Ski area map with GPS log

# install

## clone this repository

```
git clone https://github.com/taniho0707/skimap.git
or
git clone git@github.com:taniho0707/skimap.git
```

## install dependency softwares

* Docker

## make .env files

```.env
MYSQL_DATABASE=skimap_db
MYSQL_USER=skimap
MYSQL_PASSWORD=skimap
MYSQL_ROOT_PASSWORD=skimap
```

save this file to 
* /.env
* /api/models/settings/.env

## run app

```
docker-compose build
docker-compose up
```

## browse

http://localhost:3012/api/tests
