const Command = require('../classes/Command.js')


class Adorable extends Command {
	get name () {
		return 'adorable'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'image'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'create a adorable avatar based on your text'
	}

	get usage () {
		return '{prefix}adorable <text>'
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
		let text = args[0]
        if (!text) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must give the text`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}adorable <text>`
				}
			}
		})
		else {
        	return msg.channel.createMessage({
        	    embed:
        	    {
        	        title: 'Adorable',
        	        color: this.bot.color,
        	        image: {
        	            url: `https://api.hello-avatar.com/adorables/285/${text}.png`
        	        },
        	        footer: {
        	            text: `Requested by ${msg.author.username}`
        	        }
        	    }
			})
		}
	}
}

module.exports = Adorable