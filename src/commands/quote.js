const Command = require('../classes/Command.js')
const { createCanvas, loadImage, registerFont } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { wrapText } = require('../api/Canvas');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'lmroman10-italic.otf'), {
    family: 'Latin Modern Roman',
    style: 'italic'
});

class Quote extends Command {
	get name () {
		return 'quote'
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
		return `Makes Mahatma Gandhi say the quote you want.`
	}

	get usage () {
		return '{prefix}quote <your quote>'
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

        let quote = msg.cleanContent.replace(`${await this.bot.mongo.getprefix(msg.channel.guild.id)}quote `, '')
        if (!quote) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a quote!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}quote <your quote>`
				}
			}
		})

		if (quote > 500) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> quote must below in 500 characters!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}quote <your quote>`
				}
			}
		})
	
		const base = await loadImage(path.join(__dirname,  '..', 'assets', 'images', 'gandhi-quote.png'));
		let m = await msg.channel.createMessage('<a:emoji_40:798036610045444096> this might take few seconds');
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.font = 'italic 50px Latin Modern Roman';
			ctx.fillStyle = 'white';
			let fontSize = 50;
			while (ctx.measureText(quote).width > 945) {
				fontSize--;
				ctx.font = `italic ${fontSize}px Latin Modern Roman`;
			}
			const lines = await wrapText(ctx, quote, 270);
			const topMost = 180 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
			for (let i = 0; i < lines.length; i++) {
				const height = topMost + ((fontSize + 20) * i);
				ctx.fillText(lines[i], 395, height);
			}

               const attachment = canvas.toBuffer();

        if (Buffer.byteLength(attachment) > 8e+6) return msg.channel.createMessage('Resulting image was above 8 MB...I can\'t send that ');
        else {
            return msg.channel.createMessage({}, {
                    file: attachment, 
                    name: 'cutie-quote.png' 
                }).then(m.delete())
        }
    }

}

module.exports = Quote