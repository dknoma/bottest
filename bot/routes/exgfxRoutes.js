const ExGFX = require('../models').ExGFX;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * Routes for ExGFX related queries. Users can search for all files, 
 * specific files, or add/remove files as well.
 * 
 * Commands:
 *  !exgfx: lists all  ExGFX files
 *  !addexgfx <# in hex> <description> <type>: adds a specific ExGFX file to database
 *  !getexgfx <# in hex>: gets a specific ExGFX file from database
 * @param {*} bot 
 */
module.exports = (bot) => {
    bot.on('message', (user, userID, channelID, message, evt) => {
        // Our bot needs to know if it will execute a command
        // It will listen for messages that will start with `!`
        if(message.substring(0, 1) == '!')  {
            var args = message.substring(1).split(' ');
            var cmd = args[0];

            args = args.splice(1);
            switch(cmd) {
                case 'hewwo':
                    bot.sendMessage({
                        to: channelID,
                        message: '_notices command_  OwO hewwo'
                    });
                    break;
                case 'addexgfx':
                    console.log("args[1]: " + args[0]);
                    console.log(parseInt(args[0], 16));

                    let hex;
                    try {
                        hex = parseInt(args[0], 16);
                        ExGFX.findOrCreate({
                            where: {
                                number: args[0]
                            },
                            defaults: {
                                number: args[0],
                                description: args[1],
                                biome_type: args[2]
                            }
                        })
                        .spread((exgfx, created) => {
                            //file was already created
                            if(!created) {
                                bot.sendMessage({
                                    to: channelID,
                                    message: 'ExGFX' + args[0] 
                                        + ' has already been added to the database.'
                                });
                            } else if(exgfx == null) {
                                bot.sendMessage({
                                    to: channelID,
                                    message: 'ExGFX is null. Please try again.'
                                });
                            } else {
                                bot.sendMessage({
                                    to: channelID,
                                    message: 'ExGFX' + args[0] 
                                        + ' has successfully been added to the database!'
                                });
                            }
                        })
                        .catch(error => {
                            bot.sendMessage({
                                to: channelID,
                                message: 'An error has occured. Command format: !addexgfx <# in hex> <description> <type>'
                            });
                        });
                    } catch(Error) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'ExGFX number argument is invalid. The number must be in hexidecimal format.'
                        });
                    }
                    break;
                case 'exgfx':
                    ExGFX.findAll().then(exgfxs => {
                        bot.sendMessage({
                            to: channelID,
                            exgfxs
                        });
                    })
                    break;
            }
        }
    });
};