//https://i.imgur.com/XOHrPd8.gif
module.exports = (bot) => {
	bot.on('message', (user, userID, channelID, message, evt) => {
		// Our bot needs to know if it will execute a command
		// It will listen for messages that will start with `!`
		// *will only notice exgfx commands in #gfx
		if(message.substring(0, 1))  {
			var args = message.substring(1).split('  ');
			var cmd = args[0];

			args = args.splice(1);
			switch(cmd) {
                case 'pogslide':
                    bot.sendMessage({
                        to: channelID,
                        message: 'https://i.imgur.com/XOHrPd8.gif'
                    });
                    break;
            }
        }
    });
};