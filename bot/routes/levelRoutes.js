//#robug-log:   '480520344034213902'
//#roblox:      '480513949234757642'
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
                case 'levels':
                    Level
                    .findAll({
                        include: [{
                            model: 'Sublevel',
                            as: 'sublevels'
                        }]
                    })
                    .then(levels => {
						var msg = '';
                        levels.forEach(level => {
                            msg += 'Level ' + level.number 
                                + '\tName: ' + level.name
                                + '\tRealm ' + level.realm_number;
                            Sublevel
                            .findAll({
                                where: {
                                    levelId: level.id
                                }
                            })
                            .then(sublevels => {
                                sublevels.forEach(sublevel => {
                                    msg += '    Sublevel ' + sublevel.number 
                                        + '\tName: ' + sublevel.name
                                })
                            })
                        });
                        
                        bot.sendMessage({
                            to: channelID,
                            message: 'Testing !level' + msg
                        })
                    })
                    .catch(error => {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Testing !level catch block.'
                        })
                    })
                    break;
            }
        }
    })
};