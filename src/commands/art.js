const Command = require('../classes/Command.js')
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { centerImagePart } = require('../api/Canvas');

class Art extends Command {
	get name () {
		return 'art'
	}
	
	get aliases () {
		return ['arts']
	}
	
	get category () {
		return 'image'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To get user\'s avatar over Bob Ross\' canvas'
	}

	get usage () {
		return '{prefix}art  <@user>'
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

        if (!msg.mentions[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a user!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}art  <@user>`
				}
			}
		})

        let memberID,user
		if (msg.mentions[0]) {
			memberID = msg.mentions[0].id
		}
		 

		try {
		user = this.bot.users.get(memberID)
			} catch (e) {
				console.log(e)
				return msg.channel.createMessage({
					embed:{
						color: this.bot.ecolor,
						description: `<:CutieWarning:769897779954319362> You must need to mention a valid user!`,
						footer:{
							text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}art  <@user>`
						}
					}
				})
			}

			const image = user.dynamicAvatarURL("png", 2048)

        const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'art.png'));
    
		let m = await msg.channel.createMessage('<a:emoji_40:798036610045444096> this might take few seconds');
               const { body } = await request.get(image);
               const ddata = await loadImage(body);
               const canvas = createCanvas(base.width, base.height);
               const ctx = canvas.getContext('2d');
               ctx.fillStyle = 'white';
               ctx.fillRect(0, 0, base.width, base.height);
               const { x, y, width, height } = centerImagePart(ddata, 440, 440, 15, 20);
               ctx.drawImage(ddata, x, y, width, height);
               ctx.drawImage(base, 0, 0);
               const attachment = canvas.toBuffer();

        if (Buffer.byteLength(attachment) > 8e+6) return msg.channel.createMessage('Resulting image was above 8 MB...I can\'t send that ');
        else {
            return msg.channel.createMessage({}, {
                    file: attachment, 
                    name: 'cutie-art.png' 
                }).then(m.delete())
        }
    }

}

module.exports = Art