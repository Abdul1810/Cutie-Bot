const Command = require('../classes/Command.js')
const fetch = require("node-fetch")

class wiki extends Command {
	get name () {
		return 'wikipedia'
	}
	
	get aliases () {
		return ['wiki']
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To show the information about given query from wikipedia'
	}
	
	get usage () {
		return '{prefix}wiki <query>'
	}
	
	get permissions () {
		return null
	}
	
	async run (msg, args) {
		if (!args[0]) return msg.channel.createMessage({
			embed:{
				description: `<:CutieWarning:769897779954319362> You must provide search term`,
				color: this.bot.ecolor,
				timestamp: new Date(),
				footer:{
					text: `Usage : ${await this.bot.mongo.getprefix(msg.channel.guild.id)}wiki <search-term>`
				}
			}
		})
		const query = args.join(" ")
		const result = await fetch(
			`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
		).then(res => res.json().catch(() => { }));
		if (!result) return msg.channel.createMessage({
 			embed:{
 				color: this.bot.ecolor,
				title: `❌ Error Page Not Found.`
			}
		})
		else if (!result.title === "Not Found." || result.title === "Not found.") return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				title: `❌ Error Page Not Found.`
			}
		})
		else return msg.channel.createMessage({
			embed:{
				title: `🌐 ${result.title} `,
				color: this.bot.color,
				description: `**${result.extract}**`,
				fields: [
					{
						name: "More Info:",
						value: `**[Click Here!](${result.content_urls.desktop.page})**`,
						inline: true
					}
				],
				thumbnail: { url: result.thumbnail == undefined ? this.bot.user.avatarURL : result.thumbnail.source },
			}
		})
	}
}

module.exports = wiki