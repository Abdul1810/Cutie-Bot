const Command = require('../classes/Command.js')
const { responses } = require('../assets/responses/dareresponse')

class Dare extends Command {
	get name () {
		return 'dare'
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
		return 'Send a Dare Challenge?'
	}

	get usage () {
		return '{prefix}dare <@user>'
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
		if (!msg.mentions[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a user!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}dare <@user> `
				}
			}
		})
		return msg.channel.createMessage({
			embed:{
				author:{
					name: `A Dare For You ${msg.mentions[0].username}`,
					icon_url: `${msg.mentions[0].dynamicAvatarURL("", 2048)}`
				},
				color: this.bot.color,
				description: `${responses[Math.floor(Math.random() * responses.length)]}`,
				thumbnail:{
					url: `${this.bot.user.dynamicAvatarURL("", 2048)}`
				},
				footer:{
					text: `Requested By ${msg.author.username + "#" + msg.author.discriminator}`
				}
			}
		})
	}
}

module.exports = Dare