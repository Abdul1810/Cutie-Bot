const Command = require('../classes/Command.js')


class BugReport extends Command {
	get name () {
		return 'bugreport'
	}
	
	get aliases () {
		return ['bug']
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Report an issue with the Bot'
	}

	get usage () {
		return '{prefix}bug <issue>'
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
				description: `<:CutieWarning:769897779954319362> Please specify the bug.`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}bug <issue>`
				}
			}
		})
		const issue = args.join(' ')
		msg.channel.createMessage({
			embed:{
				color: this.bot.color,
				description: `<a:thanks:770281458588844063> Thanks for submitting a bug!`,
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
		var serverinvite = await msg.channel.createInvite({
			maxAge: 0,
			maxUses: 0,
		}, `A Bug Raised From a User (${this.bot.sanitizer.sanitiz(msg.author.username)})`)
		return await this.bot.executeWebhook(this.bot.webhook.bugreportlogid, this.bot.webhook.bugreportlogtoken, {
			embeds:[{
				title: `${msg.channel.guild.name}`,
				author: { name: 'Bug Report', icon_url: msg.channel.guild.dynamicIconURL("", 2048), url: `https://discord.gg/${serverinvite.code}` },
				description: `**Server Name**: \n => ${msg.channel.guild.name} \nServer ID: \n => ${msg.channel.guild.id}  \n **User Name**: \n => ${msg.author.username}#${msg.author.discriminator} \n **User Id**:\n => (${msg.author.id}) \n **Invite Link**: [${serverinvite.code}](https://discord.gg/${serverinvite.code})`,
				fields:[
					{
						name: `**Bug**`,
						value: `\`\`\`js\n${issue}\`\`\``
					}
				],
				thumbnail:{
					url: msg.channel.guild.dynamicIconURL("", 2048)
				},
				color:this.bot.color,
				timestamp: new Date(),
				footer:{
					text: `Developed By ${this.developer()}`,
					icon_url: this.bot.user.dynamicAvatarURL("", 2048)
				}
			}]
		})
	}
}

module.exports = BugReport