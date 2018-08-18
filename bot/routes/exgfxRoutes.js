/**
 * Routes for ExGFX related queries. Users can search for all files, 
 * specific files, or add/remove files as well.
 * 
 * Commands:
 *  !exgfx: lists all  ExGFX files
 *  !addexgfx  <# in hex>  <description>  <type>: adds a specific ExGFX file to database
 * 	!updateexgfxdesc  <# in hex>  <description>
 * 	!updateexgfxstatus  <# in hex>  <boolean>
 *  !getexgfx  <# in hex>: gets a specific ExGFX file from database
 * @param bot 
 */

const ExGFX = require('../models').ExGFX;

module.exports = (bot) => {
	bot.on('message', (user, userID, channelID, message, evt) => {
		// Our bot needs to know if it will execute a command
		// It will listen for messages that will start with `!`
		if(message.substring(0, 1) == '!')  {
			var args = message.substring(1).split('  ');
			var cmd = args[0];

			args = args.splice(1);
			switch(cmd) {
				//test case
				case 'hewwo':
					bot.sendMessage({
						to: channelID,
						message: '_notices command_  OwO hewwo'
					});
					break;
				//add exgfx command
				case 'addexgfx':
					console.log("args[0]: " + args[0]);
					console.log("args[1]: " + args[1]);
					console.log("args[2]: " + args[2]);
					console.log(parseInt(args[0], 16));

					if(parseInt(args[0], 16)) {
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
					} else {
						bot.sendMessage({
							to: channelID,
							message: 'ExGFX number argument is invalid. The number must be in hexidecimal format.'
						});
					}
					break;
				//update exgfx description command
				case 'updateexgfxdesc':
					console.log("args[0]: " + args[0]);
					console.log("args[1]: " + args[1]);
					ExGFX
					.find({
						where: {
							number: args[0]
						}
					})
					.then(exgfx => {
						exgfx.update({
							description: arg[1]
						}).then(exgfx => {
							bot.sendMessage({
								to: channelID,
								message: 'ExGFX' + args[0] + ' description updated to ' + arg[1] + '.'
							});
						})
					})
					.catch(error => {
						bot.sendMessage({
							to: channelID,
							message: 'An error has occured. Command format: !updateexgfxdesc <# in hex> <description>'
						});
					});
					break;
				//update exgfx finished status command
				case 'updateexgfxstatus':
					console.log("args[0]: " + args[0]);
					console.log("args[1]: " + args[1]);
					if(typeof(variable) == typeof(true)){
						ExGFX
						.find({
							where: {
								number: args[0]
							}
						})
						.then(exgfx => {
							exgfx.update({
								finished: arg[1]
							}).then(exgfx => {
								bot.sendMessage({
									to: channelID,
									message: 'ExGFX' + args[0] + ' finished status updated to ' + arg[1] + '.'
								});
							})
						})    
						.catch(error => {
							bot.sendMessage({
								to: channelID,
								message: 'An error has occured. Command format: !updateexgfxstatus <# in hex> <boolean>'
							});
						});              
					} else {
						bot.sendMessage({
							to: channelID,
							message: 'Argument is not of type boolean. Please try again.'
						});
					}
					break;
				//list all exgfx command
				case 'exgfx':
					ExGFX.findAll().then(exgfxes => {
						bot.sendMessage({
							to: channelID,
							exgfxes
						});
					})
					break;
			}
		}
	});
};