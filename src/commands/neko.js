const Command = require('../classes/Command.js')
const { GetNekoPic } = require('../api').neko

class Neko extends Command {
	get name () {
		return 'neko'
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
		return 'Send a Random Neko Image.'
	}

	get usage () {
		return '{prefix}neko'
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
					name: `Random Neko Image`,
					icon_url: `${msg.author.dynamicAvatarURL("", 2048)}`
				},
				image:{
					url: await GetNekoPic()
				},
				footer:{
					text: `Developed By ${this.developer()}`
				},
				timestamp: new Date()
			}
		})
	}
}

module.exports = Neko