const Command = require('../classes/Command.js')
const { owners } = require('../../config').settings

class help extends Command {
	get name () {
		return 'help'
	}
	
	get aliases () {
		return ['commands']
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To show the list of all commands'
	}

	get usage () {
		return '{prefix}help [command-name]'
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
		if (!args[0]) {
			const chatInstance = this.bot.commands.filter(x => x.category == 'chatbot').map((x) => x.name)
            const modInstance = this.bot.commands.filter(x => x.category == 'mod').map((x) => x.name)
			const utilityInstance = this.bot.commands.filter(x => x.category == 'utility').map((x) => x.name)
			const funInstance = this.bot.commands.filter(x => x.category == 'fun').map((x) => x.name)
			const roleplayInstance = this.bot.commands.filter(x => x.category == 'roleplay').map((x) => x.name)
			const imageInstance = this.bot.commands.filter(x => x.category == 'image').map((x) => x.name)
			const textInstance = this.bot.commands.filter(x => x.category == 'text').map((x) => x.name)
			//const analyzeInstance = this.bot.commands.filter(x => x.category == 'analyze').map((x) => x.name)
			const botInstance = this.bot.commands.filter(x => x.category == 'bot').map((x) => x.name)
			const ownerInstance = this.bot.commands.filter(x => x.category == 'OWNER').map((x) => x.name)

			const chat = [...new Set(chatInstance)].join(', ');
			const mod = [...new Set(modInstance)].join(', ');
			const utility = [...new Set(utilityInstance)].join(', ');
			const fun = [...new Set(funInstance)].join(', ');
			const roleplay = [...new Set(roleplayInstance)].join(', ');
			const image = [...new Set(imageInstance)].join(', ');
			const text = [...new Set(textInstance)].join(', ');
			//const analyze = [...new Set(analyzeInstance)].join(', ')
			const bot = [...new Set(botInstance)].join(', ');
			const owner = [...new Set(ownerInstance)].join(', ')
			let helpembed = {
				color: this.bot.color,
				author: { name: 'Cutie', icon_url: this.bot.user.avatarURL, url: this.bot.invitelink },
				thumbnail: { url: this.bot.user.avatarURL },
				footer: { text: `Type: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}help <Command-name>  for more information!` },
				fields: [
					{ name: '<:cutie__chatbot:860089260835995648> **__CHAT BOT__**', value: chat },
					{ name: '<:cutie__mod:860089856649986058> **__MOD COMMANDS__**', value: mod },
					{ name: '<:cutie__util:860090192673243147> **__UTILITY COMMANDS__**', value: utility },
					{ name: '<:cutie__fun:860089413098536961> **__FUN COMMANDS__**', value: fun },
					{ name: '<:cutie__roleplay:861467914133700610> **__ROLEPLAY COMMANDS__**', value: roleplay },
					{ name: '<:cutie__image:860089772671238145> **__IMAGE COMMANDS__**', value: image },
					{ name: '<:cutie__text:860090107973730335> **__TEXT COMMANDS__**', value: text },
					{ name: '<:cutie__bot:860088871583875082> **__BOT COMMANDS__**', value: bot }
				],
				timestamp: new Date(),
				description: `**Server Prefix [ ${await this.bot.mongo.getprefix(msg.channel.guild.id)} ]**`,
			}
			if (owners.includes(msg.author.id)) {
				helpembed.fields.push({
					name: `<:cutie__owner:860089971020136508> **__OWNER__** `,
					value: owner
				})
			}
			return msg.channel.createMessage({
                embed: helpembed,
				"components": [
					{
						"type": 1,
						"components": [
							{
								"type": 2,
								"label": "Invite",
								"style": 5,
								"url": this.bot.invitelink
							},
							{
								"type": 2,
								"label": "Support",
								"style": 5,
								"url": this.bot.supportlink
							}
							// {
							// 	"type": 2,
							// 	"label": "Vote",
							// 	"style": 5,
							// 	"url": this.bot.votelink
							// }
						]
					}
				]
            });
		}
		else {
			const command = this.bot.commands.get(args.join(" ").toLowerCase())
			if (!command) {
				const categoryinstance = this.bot.commands.filter(e=> e.category === args.join(' ').toLowerCase()).map(e => e.name)
				if (categoryinstance.length === 0) {
					return msg.channel.createMessage({
						embed:{
							color: this.bot.ecolor,
							title: `**Invalid Command or Category**`,
							description: `**<:CutieWarning:769897779954319362> Do \`${await this.bot.mongo.getprefix(msg.channel.guild.id)}help\` For the List Of the Commands!**`
						}
					})
				} 
				else {
					let categoryemoji;
					const category = [...new Set(categoryinstance)].join(', ');
					switch (args.join(' ').toLowerCase()) {
						case 'chat':
							categoryemoji = '<:cutie__chatbot:860089260835995648>'
							break
						case 'mod':
							categoryemoji = '<:cutie__mod:860089856649986058>'
							break
						case 'utility':
							categoryemoji = '<:cutie__util:860090192673243147>'
							break
						case 'fun':
							categoryemoji = '<:cutie__fun:860089413098536961>'
							break
						case 'roleplay':
							categoryemoji = '<:cutie__roleplay:861467914133700610>'
							break
						case 'image':
							categoryemoji = '<:cutie__image:860089772671238145>'
							break
						case 'text':
							categoryemoji = '<:cutie__text:860090107973730335>'
							break
						case 'bot':
							categoryemoji = '<:cutie__bot:860088871583875082>'
							break
					}
					return msg.channel.createMessage({
						embed:{
							title: 'Help Category',
							thumbnail:{
								url: this.bot.user.avatarURL
							},
							color: this.bot.color,
							fields:[
								{
									name: `${categoryemoji} ${args.join()}`,
									value: `${category}`
								}
							],
							timestamp: new Date(),
							footer:{
								text: `Developed By ${this.developer()}`,
								icon_url: this.bot.user.avatarURL
							}
						}
					})
				}
			}
			else {
				return msg.channel.createMessage({
					embed: {
						color: this.bot.color,
						author: { name: command.name, url: this.bot.invitelink },
						footer: { text: 'info: < > means mandatory, [ ] means optional', icon_url: this.bot.user.avatarURL },
						description: `<:cutie_setting:798038623995166750>** Server Prefix Is [ \`${await this.bot.mongo.getprefix(msg.channel.guild.id)}\` ]**\n	
<:cutie_info:798038051350773800>** Description -** ${command.description}\n
<a:warn:759676553104719912>** Usage -** ${command.usage.replace("{prefix}", await this.bot.mongo.getprefix(msg.channel.guild.id))}\n
<a:cutie_permission:798039563167203397>** Permission  -** ${command.requirement}\n
<:cutie_access:798039325332865055>** Category -** ${command.category}\n
<:cutie_aliases:798037481777266709>** Aliases -** ${command.aliases.length !== 0 ? command.aliases.join(", ") : "None."}\n\u200b`,
						timestamp: new Date()
					},
					"components": [
						{
							"type": 1,
							"components": [							
								{
									"type": 2,
									"label": "Invite",
									"style": 5,
									"url": this.bot.invitelink                    
								},
								{
									"type": 2,
									"label": "Support",
									"style": 5,
									"url": this.bot.supportlink     
								}
							]
				
						}
					]
				});
			}
		}
	}
}

module.exports = help

//					{ name: '<:cutie_analys:854234016660062208> **__BETA COMMANDS__**', value: analyze },