const Command = require('../classes/Command.js')
const figlet = require('figlet');


class Ascii extends Command {
	get name () {
		return 'ascii'
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
		return 'To get a text in ascii font'
	}

	get usage () {
		return '{prefix}ascii <text>'
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
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}ascii <text>`
				}
			}
		})

		let text = args.join(" ");

		figlet.text(text, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }


		if (data.length > 2000) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Please provide text shorter than 2000 characters`,
				
			}

		})

		msg.channel.createMessage('```' + data + '```')

	})

		}
}

module.exports = Ascii