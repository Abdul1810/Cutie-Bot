const Command = require('../classes/Command.js')
const { responses } = require("../assets/responses/roastresponse")

class Roast extends Command {
	get name () {
		return 'roast'
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
		return 'Roast a person in a Funny way'
	}

	get usage () {
		return '{prefix}roast <@user or userID>'
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
	
	async run (msg, args) {
		let memberID, member;
		if (!args[0]) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> You must @mention a user to roast',
				color: this.bot.ecolor,
				footer:{
					text: `Usage : ${await this.bot.mongo.getprefix(msg.channel.guild.id)}roast <@user>`
				}
			}
		})

		if (msg.mentions[0]) {
			memberID = msg.mentions[0].id
		}
		else {
			memberID = args[0]
		}
		
		try {
			member = msg.channel.guild.members.get(memberID)
		} catch (e) {
			return msg.channel.createMessage({
				embed:{
					color: this.bot.ecolor,
					description: `<:CutieWarning:769897779954319362> You must need to mention a valid user!`,
					footer:{
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}roast <@user or userID>`
					}
				}
			})
		}
		msg.channel.createMessage({
			content: `${member.username}, ${responses[Math.floor(Math.random() * responses.length)]}`
		})
	}
}

module.exports = Roast