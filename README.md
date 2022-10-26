# API

Guide pour l'API de l'application

## Démarrer MongoDB

```sh
docker run -d --name mongodb \
	--network=hostapi \
	-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
	-e MONGO_INITDB_ROOT_PASSWORD=secret \
  -e MONGO_INITDB_DATABASE=admin \
  -p 0.0.0.0:27017:27017 \
	mongo
```

## Build d'image

```sh
docker build -t com.nicodevelop.api .
```

## Démarrer l'application

```sh
docker run -d --name com.nicodevelop.api \
  --network=hostapi \
  -e APP_MONGO_USER=mongoadmin \
  -e APP_MONGO_PASSWORD=secret \
  -e APP_MONGO_DATABASE=admin \
  -e APP_MONGO_HOST=mongodb \
  -e APP_MONGO_PORT=27017 \
  -p 0.0.0.0:8081:3000 \
  com.nicodevelop.api
```
