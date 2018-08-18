/**
 * Routes for ExGFX related queries. Users can search for all files, 
 * specific files, or add/remove files as well.
 * 
 * Commands:
 *  !exgfx: lists all  ExGFX files
 *  !addexgfx  <# in hex>  <description>  <type>  <img_link>: adds a specific ExGFX file to database
 * 	!updateexgfxdesc  <# in hex>  <description>
 * 	!updateexgfxstatus  <# in hex>  <boolean>
 *  !getexgfx  <# in hex>: gets a specific ExGFX file from database
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
					// console.log("args[0]: " + args[0]);
					// console.log("args[1]: " + args[1]);
					// console.log("args[2]: " + args[2]);
					// console.log(parseInt(args[0], 16));

					if(parseInt(args[0], 16)) {
						ExGFX.findOrCreate({
							where: {
								number: args[0]
							},
							defaults: {
								number: args[0],
								description: args[1],
								biome_type: args[2],
								img_link: args[3]
							}
						})
						.spread((exgfx, created) => {
							//file was already created
							if(!created) {
								bot.sendMessage({
									to: channelID,
									message: 'ExGFX' + args[0] 
										+ ' has already been added to the database. Please try a different file.'
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
				
				//list a specific exgfx command
				case 'getexgfx':
					ExGFX
					.find({
						where: {
							number: args[0]
						}
					})
					.then(exgfx => {
						bot.sendMessage({
							to: channelID,
							message: 'ExGFX' + exgfx.number + '\nFinished: ' + exgfx.finished 
								+ '\nDescription: ' + exgfx.description
								+ '\nBiome_type: ' + exgfx.biome_type
								+ '\nImage_Link: ' + exgfx.img_link
						});
					})
					.catch(error => {
						bot.sendMessage({
							to: channelID,
							message: 'An error has occured. Command format: !exgfx'
						});
					});     
					break;
				//update exgfx description command
				case 'updateexgfxdesc':
					console.log("args[0]: " + args[0]);
					console.log("args[1]: " + args[1]);
					var newDesc = args[1];
					ExGFX
					.find({
						where: {
							number: args[0]
						}
					})
					.then(exgfx => {
						// console.log(exgfx.description);
						exgfx.update({
							description: newDesc || exgfx.description
						})
						.then(() => {
							bot.sendMessage({
								to: channelID,
								message: 'ExGFX' + args[0] + ' description updated to ' + newDesc + '.'
							});
						})
						.catch(error => {
							bot.sendMessage({
								to: channelID,
								message: 'An error has occured. Poop.'
							});
						});
					})
					.catch(error => {
						bot.sendMessage({
							to: channelID,
							message: 'An error has occured. Command format: !updateexgfxdesc <# in hex> <description>'
						});
					});
					break;
				//update img
				case 'updateexgfximg':
					// console.log("args[0]: " + args[0]);
					// console.log("args[1]: " + args[1]);
					var newDesc = args[1];
					ExGFX
					.find({
						where: {
							number: args[0]
						}
					})
					.then(exgfx => {
						// console.log(exgfx.description);
						exgfx.update({
							img_link: newDesc || exgfx.img_link
						})
						.then(() => {
							bot.sendMessage({
								to: channelID,
								message: 'ExGFX' + args[0] + ' image link updated to ' + newDesc + '.'
							});
						})
						.catch(error => {
							bot.sendMessage({
								to: channelID,
								message: 'An error has occured. Poop.'
							});
						});
					})
					.catch(error => {
						bot.sendMessage({
							to: channelID,
							message: 'An error has occured. Command format: !updateexgfxdesc <# in hex> <img_link>'
						});
					});
					break;
				//update exgfx finished status command
				case 'updateexgfxstatus':
					// console.log("args[0]: " + args[0]);
					// console.log("args[1]: " + args[1]);
					var bool = (args[1].toLowerCase() == 'true');
					if(typeof(bool) == typeof(true)){
						ExGFX
						.find({
							where: {
								number: args[0]
							}
						})
						.then(exgfx => {
							exgfx.update({
								finished: bool || exgfx.finished
							}).then(() => {
								bot.sendMessage({
									to: channelID,
									message: 'ExGFX' + args[0] + ' finished status updated to ' + bool + '.'
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
					ExGFX
					.findAll()
					.then(exgfxes => {
						exgfxes.forEach(exgfx => {
							bot.sendMessage({
								to: channelID,
								message: 'ExGFX' + exgfx.number + '\nFinished: ' + exgfx.finished
							});
						})
					})
					.catch(error => {
						bot.sendMessage({
							to: channelID,
							message: 'An error has occured. Command format: !exgfx'
						});
					});     
					break;
			}
		}
	});
};