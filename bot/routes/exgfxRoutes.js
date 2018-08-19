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
		// *will only notice exgfx commands in #gfx
		if(message.substring(0, 1) == '!' && channelID == 333510963540131840)  {
			var args = message.substring(1).split('  ');
			var cmd = args[0];

			args = args.splice(1);
			switch(cmd) {
				//add exgfx command
				case 'addexgfx':
					// console.log("args[0]: " + args[0]);
					// console.log("args[1]: " + args[1]);
					// console.log("args[2]: " + args[2]);
					// console.log(parseInt(args[0], 16));
					// console.log(typeof(channelID));

					if(parseInt(args[0], 16)) {
						ExGFX.findOrCreate({
							where: {
								number: args[0].toUpperCase()
							},
							defaults: {
								number: args[0].toUpperCase(),
								description: args[1],
								biome_type: args[2],
								img_link: args[3] || 'No image link provided.'
							}
						})
						.spread((exgfx, created) => {
							//file was already created
							if(!created) {
								bot.sendMessage({
									// to: channelID,
									//#robug-log
									to: '480520344034213902',
									message: 'ExGFX' + args[0].toUpperCase()
										+ ' has already been added to the database. Please try a different file.'
								});
							} else if(exgfx == null) {
								bot.sendMessage({
									to: '480520344034213902',
									message: 'ExGFX is null. Please try again.'
								});
							} else {
								bot.sendMessage({
									//#roblox
									to: '480513949234757642',
									message: 'ExGFX' + args[0].toUpperCase()
										+ ' has successfully been added to the database!'
								});
							}
						})
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Command format: !addexgfx <# in hex> <description> <type>'
							});
						});
					} else {
						bot.sendMessage({
							to: '480520344034213902',
							message: 'ExGFX number argument is invalid. The number must be in hexidecimal format.'
						});
					}
					break;
				
				//list a specific exgfx command
				case 'getexgfx':
					var exgfxs = args[0].toUpperCase().split(',');
					// console.log(exgfxs);
					for(var i = 0; i < exgfxs.length; i++) {
						ExGFX
						.find({
							where: {
								number: exgfxs[i]
							}
						})
						.then(exgfx => {
							bot.sendMessage({
								to: channelID,
								message: 'ExGFX' + exgfx.number + '\nFinished: ' + exgfx.finished 
									+ '\nDescription: ' + exgfx.description
									+ '\nType: ' + exgfx.biome_type
									+ '\nImage_Link: ' + exgfx.img_link + '\n'
							});
						})
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Command format: !getexgfx  <# in hex>'
							});
						});
					}
					break;
				//update exgfx description command
				case 'updateexgfxdesc':
					console.log("args[0]: " + args[0]);
					console.log("args[1]: " + args[1]);
					var newDesc = args[1];
					ExGFX
					.find({
						where: {
							number: args[0].toUpperCase()
						}
					})
					.then(exgfx => {
						// console.log(exgfx.description);
						exgfx.update({
							description: newDesc || exgfx.description
						})
						.then(() => {
							bot.sendMessage({
								to: '480513949234757642',
								message: 'ExGFX' + args[0].toUpperCase() + ' description updated to ' + newDesc + '.'
							});
						})
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Poop.'
							});
						});
					})
					.catch(error => {
						bot.sendMessage({
							to: '480520344034213902',
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
							number: args[0].toUpperCase()
						}
					})
					.then(exgfx => {
						// console.log(exgfx.description);
						exgfx.update({
							img_link: newDesc || exgfx.img_link
						})
						.then(() => {
							bot.sendMessage({
								to: '480513949234757642',
								message: 'ExGFX' + args[0].toUpperCase() + ' image link updated to ' + newDesc + '.'
							});
						})
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Poop.'
							});
						});
					})
					.catch(error => {
						bot.sendMessage({
							to: '480520344034213902',
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
								number: args[0].toUpperCase()
							}
						})
						.then(exgfx => {
							exgfx.update({
								finished: bool || exgfx.finished
							}).then(() => {
								bot.sendMessage({
									to: '480513949234757642',
									message: 'ExGFX' + args[0].toUpperCase() + ' finished status updated to ' + bool + '.'
								});
							})
						})    
						.catch(error => {
							bot.sendMessage({
								to: '480520344034213902',
								message: 'An error has occured. Command format: !updateexgfxstatus <# in hex> <boolean>'
							});
						});              
					} else {
						bot.sendMessage({
							to: '480520344034213902',
							message: 'Argument is not of type boolean. Please try again.'
						});
					}
					break;
				//list all exgfx command
				//todo: can make it so can output a sorted list
				case 'exgfx':
					ExGFX
					.findAll()
					.then(exgfxes => {
						var msg = '';
						exgfxes.forEach(exgfx => {
							msg += 'ExGFX' + exgfx.number + '\t\tFinished: ' + exgfx.finished + '\n';
						})
						bot.sendMessage({
							to: channelID,
							message: msg
						});
					})
					.catch(error => {
						bot.sendMessage({
							to: '480520344034213902',
							message: 'An error has occured. Command format: !exgfx'
						});
					});     
					break;
			}
		}
	});
};