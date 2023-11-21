# dnd developer challenge

## To properly run application with environment you need to have WSL and docker installed

### Steps required to run application dockerized:

### 1) Build docker Image:
```docker build -t dnd-challenge:v1 .```

### 2) Run postgres database:
```docker-compose up -d```

### 3) Run application's image:
```docker run -d --network=dnd_dnd-challenge --name=dnd-challenge-app_initial_configuration dnd-challenge:v1```

### 4) Sync database with schema.prisma:
```docker run -d --name dnd-challenge_sync_database --network=dnd_dnd-challenge --rm dnd-challenge:v1 npx prisma db push && docker rm dnd-challenge-app_initial_configuration```

### 4.1) Optional step for development, run database seeding:
```docker run -d --name dnd-challenge_seed_database --network=dnd_dnd-challenge --rm dnd-challenge:v1 npx prisma db seed```

### 5) Run application:
```docker run -d -p 3000:3000 --network=dnd_dnd-challenge --name=dnd-challenge-app dnd-challenge:v1 npm start```



## If you want to run application not dockerized (for quicker development)

### 1) Use version of node from .nvmrc

### 2) Run postgres database:
```docker-compose up -d```

### 3) Change DATABASE_URL in .env file to match your database host:
```DATABASE_URL="postgresql://admin:password@database_host:5432/db?schema=public"```
In order to do that you need to replace database_host value with ip of a docker container with running postgres
Run 'ifconfig' for windows, 'ip addr show' for wsl
Find host ip for docker and replace mentioned value

### 4) Generate prisma schema:
```npx prisma generate```

### 5) Push changes in schema to database:
```npx prisma db push```

### 5.1) Optional step for development, run database seeding:
```npx prisma db seed```

### 6) Run application
```npm start```
```npm run start:dev```- for autoreload 


### Helpful commands:
```npx prisma studio``` - view data in database using prisma tool