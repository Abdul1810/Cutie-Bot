const Command = require('../classes/Command.js')


class CoinFlip extends Command {
	get name () {
		return 'coinflip'
	}
	
	get aliases () {
		return ['flipcoin', 'toss']
	}
	
	get category () {
		return 'fun'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Flip a coin for you'
	}

	get usage () {
		return '{prefix}toss'
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
	
	async run (msg) {
		const flipped_coin = Math.floor(Math.random() * 2);
		let coin_position;
		if (flipped_coin === 1) coin_position = "Heads" 
		else coin_position = "Tails"
		return msg.channel.createMessage({
			embed:{
				title: "% CoinFlip %",
				color: this.bot.color,
				description: `I flipped a coin for you and it was **${coin_position}**`,
				timestamp: new Date(),
				footer:{
					text: `Developed By ${this.developer()}`
				}
			}
		})
	}
}

module.exports = CoinFlip