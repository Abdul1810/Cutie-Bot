const Command = require('../classes/Command.js')
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');


class Legoicon extends Command {
	get name () {
		return 'lego-icon'
	}
	
	get aliases () {
		return [`legoicon`]
	}
	
	get category () {
		return 'image'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To get a avatar onto a character icon from LEGO Star Wars.'
	}

	get usage () {
		return '{prefix}lego-icon  <@user>'
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
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}lego-icon  <@user>`
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
							text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}lego-icon  <@user>`
						}
					}
				})
			}

			const image = user.dynamicAvatarURL("png", 2048)
    
		let m = await msg.channel.createMessage('<a:emoji_40:798036610045444096> this might take few seconds');
                const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'lego-icon.png'));
                const { body } = await request.get(image);
                const data = await loadImage(body);
                const canvas = createCanvas(base.width, base.height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(base, 0, 0);
                ctx.beginPath();
                ctx.arc(base.width / 2, base.height / 2, 764 / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                const height = 764 / data.width;
                ctx.drawImage(data, (base.width / 2) - (764 / 2), (base.height / 2) - (764 / 2), 764, data.height * height);

               const attachment = canvas.toBuffer();

        if (Buffer.byteLength(attachment) > 8e+6) return msg.channel.createMessage('Resulting image was above 8 MB...I can\'t send that ');
        else {
            return msg.channel.createMessage({}, {
                    file: attachment, 
                    name: 'cutie-lego-icon.png' 
                }).then(m.delete())
        }
    
       }
}

module.exports = Legoicon