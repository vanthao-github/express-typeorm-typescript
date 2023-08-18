# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Run `docker-compose up` command
3. Run `npm start` command

### Work with TypeORM
1. Create entity: `typeorm entity:create src/entity/[EntityName]`
2. Generate migration base on schema (entity): `yarn typeorm migration:generate -d src/data-source.ts src/migration/[anyName]`
3. Run migration: `yarn typeorm migration:run -d src/data-source.ts`