const Command = require('../classes/Command.js')


class Invite extends Command {
	get name () {
		return 'invite'
	}
	
	get aliases () {
		return ['inv', 'addme']
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Want Me To Your Server.'
	}

	get usage () {
		return '{prefix}invite'
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
				title: `Cutie#0387`,
				color: this.bot.color,
				timestamp: new Date(),
				thumbnail:{
					url: `${this.bot.user.dynamicAvatarURL("", 2048)}`
				},
				description: `Add me To your Server By Clicking [Here](${this.bot.invitelink})\n\u200b\nHave any Questions About Cutie Join Our Support Server By Clicking The Button Below.`
			},
			"components": [
				{
					"type": 1,
					"components": [
						{
							"type": 2,
							"label": "Support Server",
							"style": 5,
							"url": `${this.bot.supportlink}`
						}
					]
				}
			]
		})
	}
}

module.exports = Invite