const Event = require('../classes/Event.js')

class Error extends Event {
	
	get name () {
		return 'error'
	}
	
	get once () {
		return false
	}
	
	
	async run (err) {
		this.bot.executeWebhook(this.bot.webhook.errlogid, this.bot.webhook.errlogtoken, {
			content: `${err} at ${new Date()}`
		})
		return console.error(err)
	}
}

module.exports = Error