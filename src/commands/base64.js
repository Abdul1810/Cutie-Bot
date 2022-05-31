const Command = require('../classes/Command.js')
const { list, base64 } = require('../api/Util');
const modes = ['encode', 'decode'];

class Base64 extends Command {
	get name () {
		return 'base64'
	}
	
	get aliases () {
		return ['encrypt']
	}
	
	get category () {
		return 'text'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To encode or decode the text to base64'
	}

	get usage () {
		return '{prefix}base64 <encode or decode> <text>'
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
				description: `<:CutieWarning:769897779954319362> You must need to mention a method enode or decode!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}base64 <encode or decode> <text>`
				}
			}
		})


        if (args[0] !== 'encode' && args[0] !== 'decode' && args[0] !== 'en' && args[0] !== 'de') return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a method enode or decode!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}base64 <encode or decode> <text>`
				}
			}
        })

        if (!args[1]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to provide a text`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}base64 <encode or decode> <text>`
				}
			}
		})
		
        let mode = args[0]
		if (mode === 'en') {
			mode = 'encode'
		}
		if (mode === 'de') {
			mode = 'decode'
		}
        let text = args.slice(1).join(' ').replace('@', '')

        const converted = base64(text, mode);
		//if (!converted) return msg.reply('That is not valid Base64.');
		return msg.channel.createMessage(converted);
	}
}

module.exports = Base64