const Command = require('../classes/Command.js')
const request = require('node-superfetch');

class Qr extends Command {
	get name () {
		return 'qr'
	}
	
	get aliases () {
		return [`qr-code`]
	}
	
	get category () {
		return 'image'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Flip a coin for you'
	}

	get usage () {
		return '{prefix}qr <you text>'
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
	
	async run (msg , args ) {
        let text = args.join(" ");

        if(!text) 
                return msg.channel.createMessage({
					embed:{
						color: this.bot.ecolor,
						description: `<:CutieWarning:769897779954319362> You must need to provide text for your qr!`,
						footer:{
							text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}qr <text>`
						}
					}
				})
        let m = await msg.channel.createMessage('<a:emoji_40:798036610045444096> this might take few seconds');
        
        const { body } = await request
                    .get('https://api.qrserver.com/v1/create-qr-code/')
                    .query({ data: text });
        return msg.channel.createMessage({}, {
            file: body, 
            name: 'cutie-qr-code.png' 
        }).then(m.delete())
    }
}

module.exports = Qr