const Command = require('../classes/Command.js')
const  parse  = require("twemoji-parser");
const fetch = require("node-fetch")



class Enlarge extends Command {
	get name () {
		return 'enlarge'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To enlarge the emoji'
	}

	get usage () {
		return '{prefix}enlarge <emoji>'
	}
	
	get permissions () {
		return null
	}
	
	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}
	
	async run (msg, args) {

		const emoji = args[0];

		if(!emoji) return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **Please mention the Emoji** `,
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}enlarge <emoji>`
				}
			}
		})
		const emojiRegex = /<(a?):(.*?):(\d.*?[0-9])>/i;
		const emojiid = emoji.match(emojiRegex)
		let animated = false
		if (!emojiid) {
			return msg.channel.createMessage({
				embed:{
					description:`<:CutieWarning:769897779954319362> **That's not a valid Emoji.** `,
					color: this.bot.ecolor,
					footer: {
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}enlarge <emoji>`
					}
				}
			})
		} else {
			if (emojiid[1] === "a") {
				animated = true
			}
			let emojiurl = `https://cdn.discordapp.com/emojis/${emojiid[3]}`

			if (animated === true) {
				emojiurl += ".gif"
			}
			else if (animated === false) {
				emojiurl += ".png"
			}
			return msg.channel.createMessage(emojiurl)
		}
	}
}

module.exports = Enlarge