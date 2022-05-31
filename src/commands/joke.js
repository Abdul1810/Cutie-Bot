const Command = require('../classes/Command.js')
const { GetJoke } = require("../api/api")

class Joke extends Command {
	get name () {
		return 'joke'
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
		return 'A Random Joke Makes you Laugh'
	}

	get usage () {
		return '{prefix}joke'
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
		return msg.channel.createMessage(await GetJoke(this.developer()))
	}
}

module.exports = Joke