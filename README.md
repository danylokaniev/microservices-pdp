
## Install

```bash
npm ci
```

## How to run `api-gateway` microservice: 

```bash
npx nx serve api-gateway
```

## How to run `auth-microservice` microservice: 
1. Create .env file and pass there MongoDB connection string:
```
MONGODB_URI=
```
2. Run microservice: 

```bash
npx nx serve auth-microservice
```

## How to run `payments-microservice` microservice: 
1. Create .env file and pass there MongoDB connection string:
```
MONGODB_URI=
```
2. Run microservice: 

```bash
npx nx serve payments-microservice
```
