## Running the app

Modify below environment variables according to your configurations

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
HMAC_SECRET=
JWT_SECRET=
REFRESH_JWT_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=
ELASTIC_SEARCH_HOST_PORT=

Run the following command to execute the application on development environment.

# development

```bash
$ docker-compose -f docker-compose.dev.yml up --build
```

# run unit tests

```bash
$ npm run test
```
