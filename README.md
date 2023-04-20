# ADD an ORM to existing Node application

## Create tsconfig.json file

## Put the following contents
`{
   "compilerOptions": {
      "lib": [
         "es5",
         "es6"
      ],
      "target": "es5",
      "module": "commonjs",
      "moduleResolution": "node",
      "outDir": "./build",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "sourceMap": true
   }
}`

## Edit the package.json file
`{
   "type": "commonjs",
   "devDependencies": {
      "ts-node": "10.7.0",
      "@types/node": "^16.11.10",
      "typescript": "4.5.2"
   },
   "dependencies": {
      "typeorm": "0.3.15",
      "reflect-metadata": "^0.1.13",
      "mysql": "^2.14.1"
   },
   "scripts": {
      "start": "ts-node src/index.js",
      "typeorm": "typeorm-ts-node-commonjs"
   }
}`

# Run `npm install`

# Configure the data source to use typeorm
import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "egencov1",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})

# Edit .gitignore by adding this line
build/

# Run `git add . && git commit -am "configure an typeorm"`

# Create data model from sample database schema
Post can have many comments or Many comments can belong to a Post
- One-to-Many
- No posts can have many comments
Comment can belong to another comment
- Recursive many-to-many
- Comments can have comments