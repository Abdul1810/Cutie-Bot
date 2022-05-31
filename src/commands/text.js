const Command = require('../classes/Command.js')

class Text extends Command {
	get name () {
		return 'text'
	}
	
	get aliases () {
		return [`txt`]
	}
	
	get category () {
		return 'text'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To generate a TXT file from the text you provide'
	}

	get usage () {
		return '{prefix}text <text>'
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
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}text <text>`
				}
			}
		})

		let text = args.join(" ");

        let attachment = Buffer.from(text)

        await msg.delete()
        return msg.channel.createMessage({}, {
        file: attachment, 
        name: `${msg.author.username}-txt-file-cutie.txt`
    })

		}
}

module.exports = Text