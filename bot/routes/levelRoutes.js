/**
 * !levels
 * !addlevel <# in hex> <name> <realm_number>  <image_link>
 * !getlevel <# in hex>  {optional \'all\' if want sublevels}
 * !deletelevel <# in hex>
 * 
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
				case 'levels':
					Level
					.findAll({
						include: [{
							model: Sublevel,
							as: 'sublevels'
						}]
					})
					.then(async levels => {
						var msg = '';
						levels.forEach(async level => {
							console.log(level.number);
							msg += '\nLevel ' + level.number 
								+ '\t' + level.name
								+ '\tRealm ' + level.realm_number;
							await level.sublevels.forEach(sublevel => {
								msg += '\n   └─ Sublevel ' + sublevel.number;
							});
						});
						
						bot.sendMessage({
							to: channelID,
							message: msg
						})
					})
					.catch(error => {
						bot.sendMessage({
							to: '480520344034213902',
							message: 'An error has occured. Command format: !levels'
						});
					})
					break;

				case 'getlevel':
					if(parseInt(args[0], 16)) {
						Level.find({
							where: {
								number: args[0].toUpperCase()
							},
							include: [{
								model: Sublevel,
								as: 'sublevels'
							}]
						})
						.then(level => {
							var msg = 'Level ' + level.number + '\t' + level.name + '\tRealm ' + level.realm_number
							
							if(args[1] != null && args[1] == 'all') {
								level.sublevels.forEach(sublevel => {
									msg += '\n   └─ Sublevel ' + sublevel.number;
								});
							}

							msg	+= '\n' + level.image_link
							bot.sendMessage({
								to: channelID,
								message: msg
							});
						})
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Command format: !getlevel <# in hex>  {optional \'all\' if want sublevels}'
							});
						});
					} else {
						bot.sendMessage({
							to: '480520344034213902',
							message: 'Level number argument is invalid. The number must be in hexidecimal format.'
						});
					}
					break;    

				case 'addlevel': 
					if(parseInt(args[0], 16)) {
						console.log(args[0] + args[1] + args[2] + args[3]);
						Level.findOrCreate({
							where: {
								number: args[0].toUpperCase()
							},
							defaults: {
								number: args[0].toUpperCase(),
								name: args[1],
								realm_number: args[2],
								image_link: args[3]
							}
						})
						.spread((level, created) => {
							//file was already created
							if(!created) {
								bot.sendMessage({
									// to: channelID,
									//#robug-log
									to: '480520344034213902',
									message: 'Level' + args[0].toUpperCase()
										+ ' has already been added to the database. Please try a different level.'
								});
							} else if(level == null) {
								bot.sendMessage({
									to: '480520344034213902',
									message: 'Level is null. Please try again.'
								});
							} else {
								bot.sendMessage({
									//#roblox
									to: '480513949234757642',
									message: 'Level' + args[0].toUpperCase()
										+ ' has successfully been added to the database!'
								});
							}
						})
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Command format: !addlevel <# in hex> <name> <realm_number>  <image_link>'
							});
						});
					} else {
						bot.sendMessage({
							to: '480520344034213902',
							message: 'Level number argument is invalid. The number must be in hexidecimal format.'
						});
					}
					break;

				case 'updatelevelimg':
					if(parseInt(args[0], 16)) {
						Level.find({
							where: {
								number: args[0].toUpperCase()
							}
						})
						.then(level => {
							level
							.update({
								image_link: args[1]
							}).then(() => {
								bot.sendMessage({
									to: '480513949234757642',
									message: 'Level ' + args[0].toUpperCase() + ' image updated to ' + args[1] + '.'
								});
							})
						})
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Command format: !updatelevelimg <# in hex>  <img link>'
							});
						});
					} else {
						bot.sendMessage({
							to: '480520344034213902',
							message: 'Level number argument is invalid. The number must be in hexidecimal format.'
						});
					}
					break;
				
				case 'deletelevel':
					if(parseInt(args[0], 16)) {
						Level.find({
							where: {
								number: args[0].toUpperCase()
							}
						})
						.then(level => {
							level
							.destroy()
							.then(() => {
								bot.sendMessage({
									to: '480513949234757642',
									message: 'Level successfully deleted!'
								});
							})
						})
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Command format: !deletelevel <# in hex>'
							});
						});
					} else {
						bot.sendMessage({
							to: '480520344034213902',
							message: 'Level number argument is invalid. The number must be in hexidecimal format.'
						});
					}
					break;
			}
		}
	})
};