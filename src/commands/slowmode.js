const Command = require('../classes/Command.js')


class SlowMode extends Command {
	get name () {
		return 'slowmode'
	}
	
	get aliases () {
		return ['slow']
	}
	
	get category () {
		return 'mod'
	}

	get requirement () {
		return 'MANAGE_CHANNELS'
	}

	get description () {
		return 'Turn SlowMode of a channel'
	}

	get usage () {
		return '{prefix}slowmode [seconds or off]'
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
		if (!msg.channel.permissionsOf(msg.author.id).has('manageChannels') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_CHANNELS"
				}
			}
		})

		if (!msg.channel.permissionsOf(this.bot.user.id).has('manageChannels') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **I dont have permission to perform this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_CHANNELS"
				}
			}
		})
		let given_seconds;
		if (args[0].toLowerCase() === 'off') given_seconds = 0
		else if (!args[0]) given_seconds = 5
		else given_seconds = args[0]
		if (!parseInt(given_seconds) && given_seconds !== 0) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You Must Provide a Time To Activate Slowmode**',
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}slow [seconds or off]`
				}
			}
		})
		if (given_seconds >= 21600) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You Must Provide a Time To Activate Slowmode**',
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}slow [seconds or off]`
				}
			}
		})
		try {
			return msg.channel.createMessage({
				embed:{
					title: 'Slowmode',
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> Slowmode is Now ${given_seconds === 0 ? 'off' : 'on'} ${given_seconds === 0 ? '' : `\n\u200b\n> **Slowmode = ${given_seconds}**`}`
				}
		}), msg.channel.edit({
				rateLimitPerUser: given_seconds
			}, `Slowmode was Turned on by ${this.bot.sanitizer.sanitiz(msg.author.username)}`)
		} catch (e) {
			return msg.channel.createMessage({
				embed:{
					description: '<:CutieWarning:769897779954319362> **You Must Provide a Time To Activate Slowmode**',
					color: this.bot.ecolor,
					footer: {
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}slow [seconds or off]`
					}
				}
			})
		}
	}
}

module.exports = SlowMode