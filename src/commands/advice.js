const Command = require('../classes/Command.js')
const { GetAdvice } = require('../api/api')

class advice extends Command {
	get name () {
		return 'advice'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'fun'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'An advice that can motivate you.'
	}

	get usage () {
		return '{prefix}advice'
	}
	
	get permissions () {
		return null
	}
	
	developer () {
		let Choice = Math.floor((Math.random() * 2));
		if (Choice === 0) {
			return `Abdul♥#5464`
		}
		else if (Choice === 1) {
			return `Abdul♥#5464`
		}
	}
	
	async run (msg) {
		return msg.channel.createMessage(await GetAdvice(this.developer()))
	}
}

module.exports = advice