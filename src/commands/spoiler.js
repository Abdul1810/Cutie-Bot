const Command = require('../classes/Command.js')

class Spoiler extends Command {
	get name () {
		return 'spoiler'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'text'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To converts text to spoiler text'
	}

	get usage () {
		return '{prefix}spoiler <text>'
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
				description: `<:CutieWarning:769897779954319362> You must need to mention a text!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}spoiler <text>`
				}
			}
		})

		let text = args.join(" ");

		if (`||${text.split('').join('||||')}||`.length > 2000) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Please provide text shorter than 2000 characters`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}spoiler <text>`
				}
			}
		})
        await msg.delete()
		return msg.channel.createMessage(`||${text.split('').join('||||')}||`)


		}
}

module.exports = Spoiler