const Command = require('../classes/Command.js')
const moment = require('moment')

class Serverinfo extends Command {
	get name () {
		return 'serverinfo(si)'
	}
	
	get aliases () {
		return ['serverinfo', 'si', 'guildinfo']
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'View Server[Guild] Information'
	}

	get usage () {
		return '{prefix}si'
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
		let servercreationdate = []
		const Guild = msg.channel.guild;
		//const Member = Guild.members.get(msg.author.id)
		let explicitfilter, verificationLevel;
		if (Guild.explicitContentFilter === 0) {
			explicitfilter = "Off "
		}
		if (Guild.explicitContentFilter === 1) {
			explicitfilter = "For Member without Roles"
		}
		if (Guild.explicitContentFilter === 2) {
			explicitfilter = "For Everyone"
		}
		if (Guild.verificationLevel === 0) {
			verificationLevel = "None"
		}
		if (Guild.verificationLevel === 1) {
			verificationLevel = "Low"
		}
		if (Guild.verificationLevel === 2) {
			verificationLevel = "Medium"
		}
		if (Guild.verificationLevel === 3) {
			verificationLevel = "High"
		}
		if (Guild.verificationLevel === 4) {
			verificationLevel = "Highest"
		}
		servercreationdate = moment.utc(Guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss').split(",")
		return msg.channel.createMessage({
			embed:{
				title: `Guild Information`,
				color: this.bot.color,
				thumbnail:{
					url: Guild.dynamicIconURL("", 1024)
				},
				image:{
					url: Guild.dynamicIconURL("", 2048)
				},
				fields:[
					{
						name: `📝 Server Name`,
						value: `${Guild.name}`
					},
					{
						name: `🆔 Server ID`,
						value: `${Guild.id}`
					},
					{
						name: `👑 Server Owner`,
						value: `<@${Guild.ownerID}>(${Guild.ownerID})`
					},
					{
						name: `☑️ Verification Level`,
						value: `${verificationLevel}`
					},
					{
						name: `<:cutie_boosted:853952808260206622> Boost Info`,
						value: `Tier ${Guild.premiumTier}, ${Guild.premiumSubscriptionCount} Server Boosts`
					},
					{
						name: `📈 Member Count`,
						value: `${Guild.memberCount}`
					},
					{
						name: `😎 Emoji Count`,
						value: `${Guild.emojis.length}`
					},
					{
						name: `📜 Roles Count`,
						value: `${msg.channel.guild.roles.size}`
					},
					{
						name: `📟 Channel Count [${msg.channel.guild.channels.size}]`,
						value: `💬 Text: ${msg.channel.guild.channels.filter(x => x.type == 0).length}\n🔊 Voice: ${msg.channel.guild.channels.filter(x => x.type == 2).length}\n📢 News: ${msg.channel.guild.channels.filter(x => x.type == 5).length}\n<:cutie_stagechannel:854033462679830538> Stage: ${msg.channel.guild.channels.filter(x => x.type == 13).length}`
					},
					{
						name: `📆 Server Creation`,
						value: `Day : ${servercreationdate[0]}\nDate : ${servercreationdate[1]}\nTime : ${servercreationdate[2]}`
					},
					{
						name: `<:cutie_profilepicture:854232343320461337> Server Icon`,
						value: `\u200b`//`**[Icon url](${Guild.dynamicIconURL("", 2048)}), [Banner url](${Guild.dynamicIconURL("png", 2048)})**`
					}
				]
			},
			"components": [
				{
					"type": 1,
					"components": [							
						{
							"type": 2,
							"label": "IconURL",
							"style": 5,
							"url": `${Guild.dynamicIconURL("", 2048)}`                    
						},
						{
							"type": 2,
							"label": "BannerURL",
							"style": 5,
							"url": `${Guild.dynamicBannerURL("png", 2048) ? Guild.dynamicBannerURL("png", 2048) : "https://cdn.discordapp.com/attachments/749081427663913000/858375394754166794/20210626_212651_0000.png"}`     
						}
					]
				}
			]
		})
	}
}

module.exports = Serverinfo