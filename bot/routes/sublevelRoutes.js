/**
 * !addsublevel  <# in hex>  <main level #>  <image_link>
 * #robug-log:   '480520344034213902'
 * #roblox:      '480513949234757642'
 */
const Level = require('../models').Level;
const Sublevel = require('../models').Sublevel;

module.exports = (bot) => {
	bot.on('message', (user, userID, channelID, message, evt) => {
		// Our bot needs to know if it will execute a command
		// It will listen for messages that will start with `!`
		if(message.substring(0, 1) == '!')  {
			var args = message.substring(1).split('  ');
			var cmd = args[0];

			args = args.splice(1);
			switch(cmd) {
                case 'sublevels':
                    Sublevel
                    .findAll()
                    .then(sublevels => {
						var msg = '';
                        sublevels.forEach(sublevel => {
                            msg += '\nSublevel ' + sublevel.number + '\tmain: ' + sublevel.main_level
                        });
                        
                        bot.sendMessage({
                            to: channelID,
                            message: msg
                        })
                    })
                    .catch(error => {
                        bot.sendMessage({
                            to: '480520344034213902',
                            message: 'An error has occured. Command format: !sublevels'
                        });
                    })
                    break;
                
                case 'getsub':
                    if(parseInt(args[0], 16)) {
                        Sublevel.find({
                            where: {
                                number: args[0].toUpperCase()
                            }
                        })
                        .then(sublevel => {
                            bot.sendMessage({
                                to: channelID,
                                message: 'Sublevel ' + sublevel.number + '\nMain level: ' + sublevel.main_level + '\t' + sublevel.image_link
                            });
                        })
                        .catch(error => {
                            bot.sendMessage({
                                to: '480520344034213902',
                                message: 'An error has occured. Command format: !getsub <# in hex>'
                            });
                        });
                    } else {
                        bot.sendMessage({
                            to: '480520344034213902',
                            message: 'Sublevel number argument is invalid. The number must be in hexidecimal format.'
                        });
                    }
                    break;

                case 'addsublevel': 
                    //check if both the first two arguments are in hexidecimal format
                    if(parseInt(args[0], 16) && parseInt(args[1], 16)) {
                        console.log('main level: ' + args[1].toUpperCase());
                        Level.find({
                            where: {
                                number: args[1].toUpperCase()
                            }
                        })
                        .then(level => {
                            console.log('level id: ' + level.id);
                            Sublevel.findOrCreate({
                                where: {
                                    number: args[0].toUpperCase()
                                },
                                defaults: {
                                    number: args[0].toUpperCase(),
                                    main_level: level.number,
                                    image_link: args[2],
                                    levelId: level.id
                                }
                            })
                            .spread((sublevel, created) => {
                                console.log('did i make it?');
                                //file was already created
                                if(!created) {
                                    bot.sendMessage({
                                        // to: channelID,
                                        //#robug-log
                                        to: '480520344034213902',
                                        message: 'Sublevel' + args[0].toUpperCase()
                                            + ' has already been added to the database. Please try a different sublevel.'
                                    });
                                } else if(sublevel == null) {
                                    bot.sendMessage({
                                        to: '480520344034213902',
                                        message: 'Sublevel is null. Please try again.'
                                    });
                                } else {
                                    bot.sendMessage({
                                        //#roblox
                                        to: '480513949234757642',
                                        message: 'Sublevel' + args[0].toUpperCase()
                                            + ' has successfully been added to the database!'
                                    });
                                }
                            })
                            .catch(error => {
                                bot.sendMessage({
                                    to: '480520344034213902',
                                    message: 'An error has occured. Command format: !addsublevel  <# in hex>  <main level>  <image_link>'
                                });
                            });
                        }).catch(error => {
                            bot.sendMessage({
                                to: '480520344034213902',
                                message: 'An error has occured. Command format: !addsublevel  <# in hex>  <main level>  <image_link>'
                            });
                        });
                            
                    } else {
                        bot.sendMessage({
                            to: '480520344034213902',
                            message: 'Sublevel number argument is invalid. The number must be in hexidecimal format.'
                        });
                    }
                    break;

                case 'deletesub':
                    if(parseInt(args[0], 16)) {
                        Sublevel.find({
                            where: {
                                number: args[0].toUpperCase()
                            }
                        })
                        .then(sublevel => {
                            sublevel
                            .destroy()
                            .then(() => {
                                bot.sendMessage({
                                    to: '480513949234757642',
                                    message: 'Sublevel successfully deleted!'
                                });
                            })
                        })
                        .catch(error => {
                            bot.sendMessage({
                                to: '480520344034213902',
                                message: 'An error has occured. Command format: !deletesub <# in hex>'
                            });
                        });
                    } else {
                        bot.sendMessage({
                            to: '480520344034213902',
                            message: 'Sublevel number argument is invalid. The number must be in hexidecimal format.'
                        });
                    }
                    break;
            }
        }
    })
};