const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

require('dotenv').config()

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

bot.on('message', (user, userID, channelID, message, evt) => {
    if(message.substring(0, 1) == '!')  {
        // console.log(channelID);
        var args = message.substring(1).split('  ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'hewwo':
                bot.sendMessage({
                    to: channelID,
                    message: '_notices command_  OwO hewwo'
                });
                break;
            case 'commands':
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: '*+Note+ Don\'t forget to double space between arguments you want separated.*'
                    +'\n!exgfx\n!getexgfx  <# in hex>\n!addexgfx  <# in hex>  <description>  <type>  <optional_img_link>'
                    +'\n!updateexgfxdesc  <# in hex>  <description>\n!updateexgfxstatus  <# in hex>  <boolean>'
                    +'\n!updateexgfximg  <# in hex>  <img_link>'
                });
                break;
        }
    }
});

require('./bot/routes/exgfxRoutes')(bot);

module.exports = bot;