<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Execute in development environment

1. Clone the repository
2. Execute 
 ```
    yarn install
 ```
3. Nest CLI must to be installed
```
npm i -g @nestjs/cli
```
4. Raise the database
```
docker-compose up -d
```

5. Clone the file __.env.template__ and rename the copy to __.env__

6. Fill the __.env__ file with your credentials

7. Execute the application in dev:
```
yarn start:dev
```

8. Populate database with seed
```
http://localhost:3000/api/v2/seed
```

## Used Stack
* MongoDB
* Nest