const Command = require('../classes/Command.js')


class Say extends Command {
	get name () {
		return 'say'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'fun'
	}

	get requirement () {
		return 'MANAGE_MESSAGES'
	}

	get description () {
		return 'Bot say what you say.'
	}

	get usage () {
		return '{prefix}say <message>'
	}
	
	get permissions () {
		return null
	}
	
	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}
	
	async run (msg, args) {
		if (!msg.channel.permissionsOf(msg.author.id).has('manageMessages') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description:'<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_MESSAGES"
				}
			}
		})
		
		let text = args.join(" ")
		if (!text) return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **Provide Some Text** `,
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}say [#channel] <text>`
				}
			}
		})
		if (!msg.channelMentions[0]) {
			text = text.replace("@everyone", "everyone").replace("@here", "here")
			await msg.delete()
			return msg.channel.createMessage(text)
		}
		else {
			text = text.replace("@everyone", "everyone").replace("@here", "here")
			try {
				msg.channel.guild.channels.get(msg.channelMentions[0]).createMessage(text.slice(21))
				await msg.addReaction('✅')
			}
			catch (e) {
				msg.channel.createMessage({
					embed:{
						description:`<:CutieWarning:769897779954319362> **Mention a Valid Channel** `,
						color: this.bot.ecolor,
						footer: {
							text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}say [#channel] <text>`
						}
					}
				})
				msg.addReaction('❌')
			}
			return
		}
	}
}

module.exports = Say