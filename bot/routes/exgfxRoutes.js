/**
 * Routes for ExGFX related queries. Users can search for all files, 
 * specific files, or add/remove files as well.
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
                case 'exgfx':
                    bot.sendMessage({

                    });
                    break;
            }
        }
    });
};