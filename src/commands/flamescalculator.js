const Command = require('../classes/Command.js')
const flamesapi = require('../api').flames

class Flames extends Command {
	get name () {
		return 'flames'
	}
	
	get aliases () {
		return ['flamescalc', 'flamescalculator']
	}
	
	get category () {
		return 'fun'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Check a Person\'s Relationship Towards You'
	}

	get usage () {
		return '{prefix}flames [-r] <@user or sname> [-r[fname]]'
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
		switch (args[0]) {
			case '-r':{
				if (!args[1]) msg.channel.createMessage({
					embed:{
						description: '<:CutieWarning:769897779954319362> **You must need to mention a user !**',
						color: this.bot.ecolor,
						footer: {
							text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}flames -r <sname> <fname>`
						}
					}
				})
				if (!args[1]) break;
				let fname = args[1]
				let sname =  args[2] ? args[2] : msg.author.username
				let res = flamesapi(fname, sname)
				let result
				switch (res){
					case 'f':
						result = 'F - FRIEND'
						break;
					case 'l':
						result = 'L - LOVE'
						break;
					case 'a':
						result = 'A - ADORE'
						break;
					case 'm':
						result = 'M - MARRIAGE'
						break;
					case 'e':
						result = 'E - ENEMY'
						break;
					case 's':
						result = 'S - SISTER'
						break;
					default:
						break;
				}
				msg.channel.createMessage({
					embed:{
						author:{
							name: `Flames Calculator`,
							icon_url: msg.author.dynamicAvatarURL("", 1024)
						},
						thumbnail:{
							url: "https://cdn.discordapp.com/attachments/756507176482373692/870946224184889344/20210623_190008.png"
						},
						color: this.bot.color,
						footer:{
							text: `Developed By ${this.developer()}`
						},
						description: `**Result of Flames**\n\u200b\n> **${result}**`
					}
				})
				break
			}
			default:{
				if (!msg.mentions[0] && !args[0]) msg.channel.createMessage({
					embed:{
						description: '<:CutieWarning:769897779954319362> **You must need to mention a user !**',
						color: this.bot.ecolor,
						footer: {
							text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}flames <@user or sname>`
						}
					}
				})
				if (!msg.mentions[0] && !args[0]) break;
				let sname =  msg.mentions[0] ? msg.mentions[0].username : args.join(' ')
				let res = flamesapi(msg.author.username, sname)
				let result
				switch (res){
					case 'f':
						result = 'F - FRIEND'
						break;
					case 'l':
						result = 'L - LOVE'
						break;
					case 'a':
						result = 'A - ADORE'
						break;
					case 'm':
						result = 'M - MARRIAGE'
						break;
					case 'e':
						result = 'E - ENEMY'
						break;
					case 's':
						result = 'S - SISTER'
						break;
					default:
						break;
				}
				msg.channel.createMessage({
					embed:{
						author:{
							name: `Flames Calculator`,
							icon_url: msg.author.dynamicAvatarURL("", 1024)
						},
						thumbnail:{
							url: "https://cdn.discordapp.com/attachments/756507176482373692/870946224184889344/20210623_190008.png"
						},
						color: this.bot.color,
						footer:{
							text: `Developed By ${this.developer()} | Try flames -r <gname> <b-name>`
						},
						description: `**Result of Flames**\n\u200b\n> **${result}**`
					}
				})
				break;
			}
		}
		return
	}
}

module.exports = Flames