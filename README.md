# crypto quote alert bot

## Description

Simple tracker that uses Uphold API to detect and send alerts about price oscillations on a given currency pair.

## Environment Variables

| Name                  | Description                                                                                    | Required |
|-----------------------|------------------------------------------------------------------------------------------------|----------|
| PAIRS    | pairs separated by ",". Ex: BTC-USD,DOGE-USD                                                                     | YES      |
| DELAY       | Fetch interval                                                                        | NO      |
| PERCENTAGE_TO_TRIGGER_ALERT      | Difference percentage that should trigger alert                                                                       | NO      |
| UPHOLD_BASE_URL     | Uphold api base url                                                                       | YES      |
| UPHOLD_CLIENT_ID        | Uphold api client_id                                                                         | YES      |
| UPHOLD_CLIENT_SECRET       | Uphold api client_secret                                                                        | YES      |
| REDIS_URL         | Redis URL. Ex: redis://localhost:6379                                      | YES      |
| REDIS_QUOTE_TTL         | Redis Quote TTL in seconds                                      | NO      |

## Running (without docker)

```sh
yarn
cp .env.example .env
```
Add the `REDIS_URL` environment varible to the `.env` file
```sh
yarn start
```

## Running (with docker)

```sh
docker-compose run app
```

## Unit Tests (with docker)

```sh
docker-compose run unit-tests
```

## Unit Tests (with docker)

```sh
docker-compose run integration-tests
```
