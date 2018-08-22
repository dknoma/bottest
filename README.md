# EMW Discord Bot
> This is a Discord bot used in a personal server to help organize workflow and make finding files more efficient.


## Various Files

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

