const Command = require('../classes/Command.js')
const { GetSmugGif } = require('../api').neko

class Smug extends Command {
	get name () {
		return 'smug'
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
		return 'Send a Smug Gif.'
	}

	get usage () {
		return '{prefix}smug'
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
					name: `Smug`,
					icon_url: `${msg.author.dynamicAvatarURL("", 2048)}`
				},
				image:{
					url: await GetSmugGif()
				},
				footer:{
					text: `Developed By ${this.developer()}`
				},
				timestamp: new Date()
			}
		})
	}
}

module.exports = Smug