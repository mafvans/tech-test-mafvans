# HUNTY INTEGRATION MICROSERVICE

INTEGRATION microservice project.

## ENVIRONMENT

- Docker
- Yarn (>= 1.22.5)
- Node (v14.17.3)

## LOCAL CONFIGURATION

Explanation of commands to execute.

 ```bash
yarn
```


## DATABASE

- Create image 

```bash
docker build -t my-mongodb .
```

- Run 

```bash
docker run -d --name my-mongodb-container -p 27017:27017 my-mongodb
```

- Host 

```
mongodb://localhost:27017
```

## SCRIPTS

- Run the application

```bash
yarn start
```

- Run the application unit tests

```bash
yarn test
```

