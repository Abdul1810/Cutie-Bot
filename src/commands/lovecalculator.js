const Command = require('../classes/Command.js')
const unirest = require('unirest')
const Util = require('../api').util
class LoveCalculator extends Command {
	get name () {
		return 'lovecalculator'
	}
	
	get aliases () {
		return ['lovecalc', 'howmuchlove']
	}
	
	get category () {
		return 'fun'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Enter your name and the name of your partner/lover/crush to find Love compatibility & chances of successful love relationship'
	}

	get usage () {
		return '{prefix}lovecalc <@user>'
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
		if (!msg.mentions[0] && !args[0]) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You must need to mention a user !**',
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}lovecalc <@user or name>`
				}
			}
		})
		const bot = this.bot
		const dev = () => this.developer()
		const mainmsg = await msg.channel.createMessage('https://cdn.discordapp.com/attachments/852048335665627186/857245419951489044/823103123114688523.gif')
		var req = unirest("GET", "https://love-calculator.p.rapidapi.com/getPercentage");

		req.query({
			"fname": msg.author.username,
			"sname": msg.mentions[0] ? msg.mentions[0].username : args.join(' ')
		});

		req.headers({
			"x-rapidapi-key": "ed5ab3aef9msh7452d4214cbe424p1c8480jsn721fad49dfe0",
			"x-rapidapi-host": "love-calculator.p.rapidapi.com",
			"useQueryString": true
		});


		req.end(function (res) {
			if (res.error) return msg.channel.createMessage({
				embed:{
					title: `Error Occured`,
					color: bot.ecolor,
					description: `Error: ${error}`,
					timestamp: new Date()
				}
			})
			
			else {
				var loveembed = {
					author:{
						name: `Love Calculator`,
						icon_url: msg.author.dynamicAvatarURL("", 1024)
					},
					color: bot.color,
					thumbnail:{
						url: 'https://cdn.discordapp.com/attachments/756507176482373692/870948553000878110/20210623_185135.png'//`https://cdn.discordapp.com/attachments/828224047048687646/857225244259254292/816882190780596224.png`
					},
					//color: bot.color,
					footer:{
						text: `Developed By ${dev()}`
					},
					title: `${res.body.fname} loves ${res.body.sname}`,
					description: `Love Percentage: ${res.body.percentage}%\n\u200b\nMessage: ${res.body.result}`
				}
				Util.delay(4000)
				return mainmsg.edit({
					content: "",
					embed: loveembed
				})
			}
		})
	}
}
module.exports = LoveCalculator