# EMW Discord Bot
> This is a Discord bot used in a personal server to help organize workflow and make finding files more efficient.

You found me!

Welcome! This code right here is the code for a Discord bot that I am testing out. This bot is meant to allow my friends and I to figure out what kinds of ExGFX files, Levels, and Sublevels are taken, which ones need to be updated, or even figure out what kinds of things need to be done. This Discord bot is meant to interact with some sort of database ie. PostreSQL, Amazon RDS, ElephantSQL, etc. This bot is also coded using Javascript and specifically Node.js.

## Various Folders and Files

### Models
- This folder contains the models of the data to be stored in the database. This will determine what kind of data can be added or viewed.

### Routes
- This folder contains the various routes that determine what commands users need to input to actually use the bot. Each kind of model should have their own routes. This is good practice.

### Migrations
- This folder will determine how each model will actually be created, what kind of relations to other models they have, and the time at which the model was created or updated.

### .sequelizerc
- The paths to files required by Sequelize.

## Documentation

### Sequelize Models

To create models, cd to the root directory of the bot and use the following format:

```sequelize model:create --name <Name> --attributes <parameter>:<data type>,<parameter>:<data type>,...```

## Installation
### All dependencies:
```js
"body-parser": "^1.18.3",
"discord.io": "https://github.com/woor/discord.io/tarball/gateway_v6",
"express": "^4.16.3",
"morgan": "^1.9.0",
"sequelize": "^4.38.0",
"winston": "^3.0.0"
```

In case the bot appears offline after starting it, the following library should be installed in the folder: 

```npm install https://github.com/woor/discord.io/tarball/gateway_v6```

If need Sequelize: 

```npm install -g sequelize-cli```

If having trouble setting up online db:

_Windows_

```set DATABASE_URL=<dialect://url:port/dbname>```

