const Command = require('../classes/Command.js')


class Botsuggest extends Command {
	get name () {
		return 'botsuggest'
	}
	
	get aliases () {
		return ['botsuggestion', 'suggest']
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To give a suggestion for bot'
	}

	get usage () {
		return '{prefix}botsuggest <your suggestion>'
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
		if (!args[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Please specify your suggestion.`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}botsuggest <your suggestion>`
				}
			}
		})
		const Botsuggestion = msg.cleanContent.replace(`${await this.bot.mongo.getprefix(msg.channel.guild.id)}suggest `, '').replace(`${await this.bot.mongo.getprefix(msg.channel.guild.id)}botsuggest `, '')
		msg.channel.createMessage({
			embed:{
				color: this.bot.color,
				description: `<a:thanks:770281458588844063> Thanks for submitting a suggestion!`,
				footer:{
					text: `For More Help.Join Our Support Server.`
				}
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

		return await this.bot.executeWebhook(this.bot.webhook.suggestlogid, this.bot.webhook.suggestlogtoken, {
			embeds:[{
				title: `${msg.channel.guild.name}`,
				author: { name: 'Suggestion', icon_url: msg.channel.guild.dynamicIconURL("", 2048) },
				fields:[
					{
						name: `**Suggestion**`,
						value: `\`\`\`js\n${Botsuggestion}\`\`\``
					}
				],
				thumbnail:{
					url: msg.channel.guild.dynamicIconURL("", 2048)
				},
				color:this.bot.color,
				timestamp: new Date(),
				footer:{
					text: `Suggested By ${msg.author.username}`,
					icon_url: msg.author.dynamicAvatarURL("", 2048)
				}
			}]
		})
	}
}

module.exports = Botsuggest