const Command = require('../classes/Command.js')
const  parse  = require("twemoji-parser");
const fetch = require("node-fetch")


class Removeemoji extends Command {
	get name () {
		return 'removeemoji'
	}
	
	get aliases () {
		return [`remoji`]
	}
	
	get category () {
		return 'mod'
	}

	get requirement () {
		return 'MANAGE_EMOJIS'
	}

	get description () {
		return 'add a emoji to your server'
	}

	get usage () {
		return '{prefix}removeemoji <emoji> '
	}
	
	get permissions () {
		return null
	}
	
	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}
	
	async run (msg, args) {
		if (!msg.channel.permissionsOf(msg.author.id).has('manageEmojis') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description:'<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_EMOJIS"
				}
			}
		})

		if (!msg.channel.permissionsOf(this.bot.user.id).has('manageEmojis')) return msg.channel.createMessage({
			embed:{
				description:'<:CutieWarning:769897779954319362> **I dont have permission to perform this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_EMOJIS"
				}
			}
		})

		const emoji = args[0];

/*		if (!emojiname) {
			emojiname = "emoji1"
		} **/
		if(!emoji) return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **Please mention the Emoji** `,
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}removeemoji <emoji>`
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
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}removeemoji <emoji>`
					}
				}
			})
		} else {
	
			msg.channel.guild.deleteEmoji( emojiid[3] , `${this.bot.sanitizer.sanitiz(msg.author.username)} Added Emoji.`)
			return msg.channel.createMessage({
				embed:{
					title: "Emoji Removed",
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> Emoji Has Been Removed Sucessfuly!`
				}
			})
		}
	}
}

module.exports = Removeemoji