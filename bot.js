const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';

const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', evt => {
    logger.info('Connected');
    logger.info('Logged in as:');
    logger.info(bot.username + '-(' + bot.id + ')');
});

bot.on('message', (user, userID, channelID, message, evt) => {
    if(message.substring(0, 1) === '!')  {
        var args = message.substring(1).split('');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            case 'hewwo':
                bot.sendMessage({
                    to: channelID,
                    message: 'owo Hewwo owo'
                });
                break;
        }
    }
});
