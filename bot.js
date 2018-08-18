const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', evt => {
    logger.info('Connected');
    logger.info('Logged in as:');
    logger.info(bot.username + '-(' + bot.id + ')');
});

require('./bot/routes/exgfxRoutes')(bot);

