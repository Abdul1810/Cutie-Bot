const { SlashCreator, GatewayServer } = require('slash-create');
const path = require('path');
const { applicationID, publicKey, bot } = require('../../config').tokens


const creator = new SlashCreator({
  applicationID: applicationID,
  publicKey: publicKey,
  token: bot
});

class SlashHandler {
    constructor (bot) {
        this.bot = bot
		creator.client = bot

        this.built = false
		this.build()
    }

    build() {
		if (this.built) return this

		creator
		.withServer(
			new GatewayServer(
				(handler) => this.bot.on('rawWS', (event) => {
					if (event.t === 'INTERACTION_CREATE' && event.d.type !== 3) handler(event.d);
					else return
				})
			)
		)
		.registerCommandsIn(path.join(__dirname,'..','slashcommands'))
		.syncCommands();
		
        this.built = true
		return this
    }
}

module.exports = SlashHandler