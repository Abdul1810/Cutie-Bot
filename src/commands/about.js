const Command = require('../classes/Command.js')


class About extends Command {
	get name () {
		return 'about'
	}
	
	get aliases () {
		return ['info']
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Information About The Bot And Developers'
	}

	get usage () {
		return '{prefix}about'
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
		const Moderators = ['852846185596190740', '750772090524925995', '749582193248043119', '699044324012326952']
		const Donators = ['729304636896444417', '731891968057147393']
		var aboutembed = {
			author:{
				name: `About Cutie`,
				icon_url: `${this.bot.user.dynamicAvatarURL("", 2048)}`
			},
			color: this.bot.color,
			description: `Hi.I am Cutie.A Chat Bot.I Do Moderation and Fun Things.\nHere is The Staff List Who Made Me Awesome ✨.`,
			fields:[
				{
					name: `<:cutie_staff:854233117442703371> Developers`,
					value: `Abdul♥#5464\nDeveloper, Manager, Project Lead`
				}
			],
			footer:{
				text: `Made with 💖 and Eris(NodeJS)`
			}
		}

		return msg.channel.createMessage({
			embed: aboutembed
		})
	}
}

module.exports = About