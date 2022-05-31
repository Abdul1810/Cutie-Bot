const Command = require('../classes/Command.js')
const { GetFeedGif } = require('../api').neko

class Feed extends Command {
	get name () {
		return 'feed'
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
		return 'Feed a User Virtually.'
	}

	get usage () {
		return '{prefix}feed <@user>'
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
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}feed <@user> `
				}
			}
		})
		else return msg.channel.createMessage({
			embed:{
				color: this.bot.color,
				author:{
					name: `${msg.author.username}#${msg.author.discriminator} Feeded ${msg.mentions[0].username}#${msg.mentions[0].discriminator}`,
					icon_url: `${msg.author.dynamicAvatarURL("", 2048)}`
				},
				image:{
					url: await GetFeedGif()
				},
				footer:{
					text: `Developed By ${this.developer()}`
				},
				timestamp: new Date()
			}
		})
	}
}

module.exports = Feed