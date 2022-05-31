const Command = require('../classes/Command.js')
const moment = require('moment')

class EmojiInfo extends Command {
	get name () {
		return 'emojiinfo(ei)'
	}
	
	get aliases () {
		return ['ei', 'emojiinfo']
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Get The Information About a Emoji.'
	}

	get usage () {
		return '{prefix}ei <emoji or emoji-name>'
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
	
	async run (msg, args) {
		let guildemoji;
		const emojiRegex = /<(a?):(.*?):(\d.*?[0-9])>/i;
		if (!args[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to provide a valid emoji!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}ei <emoji or emoji-name> `
				}
			}
		})
		let emoji = args[0].match(emojiRegex)
		if (emoji) {
			guildemoji = emoji
		}
		else {
			guildemoji = msg.channel.guild.emojis.filter(e => e.name === args[0])[0]
		}

		if (!guildemoji) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to provide a valid emoji!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}ei <emoji or emoji-name> `
				}
			}
		})
		let emojiurl = `https://cdn.discordapp.com/emojis/${guildemoji.id ? guildemoji.id : guildemoji[3]}`
		if (emoji ? emoji[1] === 'a' : guildemoji.animated) {
			emojiurl += ".gif"
		}
		else {
			emojiurl += ".png"
		}
		return msg.channel.createMessage({
			embed:{
				title: 'Emoji Information',
				color: this.bot.color,
				thumbnail:{
					url: emojiurl
				},
				fields:[
					{
						name: 'Emoji Name',
						value: `${guildemoji.name ? guildemoji.name : guildemoji[2]}`
					},
					{
						name: 'Emoji ID',
						value: `${guildemoji.id ? guildemoji.id : guildemoji[3]}`
					},
					{
						name: 'Emoji Mention',
						value: `<${guildemoji.animated ? 'a' : ''}:${guildemoji.name}:${guildemoji.id}>\u200b`.includes(undefined) ? guildemoji[0] : `<${guildemoji.animated ? 'a' : ''}:${guildemoji.name}:${guildemoji.id}>\u200b`
					},
					{
						name: 'Emoji Type',
						value: `${guildemoji.animated !== undefined ? guildemoji.animated ? 'Animated Emoji' : 'Non-Animated Emoji' : guildemoji[1] === 'a' ? 'Animated Emoji' : 'Non-Animated Emoji'}`
					},
					{
						name: 'Download link',
						value: `[[Click-Here]](${emojiurl})`
					}
				],
				footer:{
					text: `Developed By ${this.developer()}`
				}
			}
		})
	}
}

module.exports = EmojiInfo