const Command = require('../classes/Command.js')
const { GetDogGif } = require('../api').neko

class Dog extends Command {
	get name () {
		return 'dog'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'roleplay'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Send a Cute Dog Image/gif.'
	}

	get usage () {
		return '{prefix}dog'
	}
	
	get permissions () {
		return null
	}
	
	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
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
		return msg.channel.createMessage({
			embed:{
				color: this.bot.color,
				author:{
					name: `Random Dog image/gif`,
					icon_url: `${msg.author.dynamicAvatarURL("", 2048)}`
				},
				image:{
					url: await GetDogGif()
				},
				footer:{
					text: `Developed By ${this.developer()}`
				},
				timestamp: new Date()
			}
		})
	}
}

module.exports = Dog