const Command = require('../classes/Command.js')


class Roll extends Command {
	get name () {
		return 'roll'
	}
	
	get aliases () {
		return ['dice']
	}
	
	get category () {
		return 'fun'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Roll a dice for you'
	}

	get usage () {
		return '{prefix}roll [limit]'
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
		let limit = args[0]

		if (!limit) limit = 6
		const rolled_number = Math.floor(Math.random() * limit + 1);

		if (!rolled_number || limit <= 0) return msg.channel.createMessage({
			embed:{
				description: "'<:CutieWarning:769897779954319362> You must provide a valid limit to roll'",
				color: this.bot.ecolor,
				footer:{
					text: `Usage : ${await this.bot.mongo.getprefix(msg.channel.guild.id)}roll [limit]`
				}
			}
		})
		else {
			return msg.channel.createMessage({
				embed:{
					title: "🎲  Dice Roll  🎲",
					description: `you rolled 🎲  **${rolled_number}**  🎲`,
					color: this.bot.color,
					timestamp: new Date(),
					footer:{
						text: `Developed by ${this.developer()}`
					}
				}
			})
		}
	}
}

module.exports = Roll