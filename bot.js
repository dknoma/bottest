/**
 * Name:    Extra Bot World
 * Author:  Drew Noma
 * Description: A Discord bot for a personal discord channel. The bot's purpose
 *              is to organize file names and various other data to make workflow
 *              more organized and efficient.
 * Mac
 * pg_dump -O -s -x bot-dev | egrep -v "(^SET|^/\*\!)" > mypostgres.sql
 * 
 * Windows
 * pg_dump -O -s -x bot-dev | findstr -v "(^SET|^/\*\!)" > mypostgres.sql
 */
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
                var msg = '*+Note+ Don\'t forget to double space between arguments you want separated.*';
                //if in #gfx, will show gfx related commands
                if(channelID == 333510963540131840) {
                    msg += '\nExGFX Commands:'
                    +'\n └─ !addexgfx  <# in hex>  <description>  <type>  <optional_image_link>'
                    +'\n └─ !updateexgfxdesc  <# in hex>  <description>'
                    +'\n └─ !updateexgfxstatus  <# in hex>  <boolean>\n └─ !updateexgfximg  <# in hex>  <image_link>'
                    +'\n └─ !getexgfx  <# in hex>\n └─ !exgfx';
                }
                msg += '\nLevel Commands:'
                +'\n └─ !addlevel <# in hex> <name> <realm_number>  <image_link>\n └─ !updatelevelimg  <# in hex>  <image_link>'
                +'\n └─ !getlevel <# in hex>  {optional \'all\' if want sublevels}\n └─ !deletelevel  <# in hex>\n └─ !levels'
                +'\nSublevel Commands:'
                +'\n └─ !addsublevel  <# in hex>  <main level #>  <image_link>\n └─ !updatesubimg <# in hex>  <image_link>'
                +'\n └─ !getsub  <# in hex>\n └─ !deletesub  <# in hex>\n └─ !sublevels';

                bot.sendMessage({
                    to: channelID,
                    message: msg
                });
                break;
        }
    }
});

require('./bot/routes/emoteRoutes')(bot);
require('./bot/routes/exgfxRoutes')(bot);
require('./bot/routes/levelRoutes')(bot);
require('./bot/routes/sublevelRoutes')(bot);

module.exports = bot;