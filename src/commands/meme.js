const Command = require('../classes/Command.js')
const randomPuppy = require("random-puppy");

class Meme extends Command {
	get name () {
		return 'meme'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'fun'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'A Random Meme That Makes you Laugh'
	}

	get usage () {
		return '{prefix}meme'
	}
	
	get permissions () {
		return null
	}
	
	async run (msg) {
		const subReddits = ["dankmeme", "meme", "me_irl"];
		const random = subReddits[Math.floor(Math.random() * subReddits.length)];
		const image = await randomPuppy(random);
		
		return msg.channel.createMessage({
			embed:{
				title: "Meme!",
				color: this.bot.color,
				url: `https://reddit.com/r/${random}`,
				image: {
					url: image
				}
			}
		})
	}
}

module.exports = Meme