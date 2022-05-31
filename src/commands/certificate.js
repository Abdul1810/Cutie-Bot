const Command = require('../classes/Command.js')
const { createCanvas, loadImage, registerFont } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const moment = require('moment');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'oldengl.ttf'), { family: 'Old English Text MT' });

class Certificate extends Command {
	get name () {
		return 'certificate'
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
		return 'To get a  certificate of excellence with the name and reason with your choice'
	}

	get usage () {
		return '{prefix}certificate  <@user> <reson>'
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
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}certificate  <@user> <reson>`
				}
			}
		})

		if (!args[1]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a reason!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}certificate  <@user> <reson>`
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
							text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}certificate  <@user> <reson>`
						}
					}
				})
			}

			let reason = args[1]
			let name = this.bot.sanitizer.sanitiz(user.username)
			const image = user.dynamicAvatarURL("png", 2048)
            const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'certificate.png'));
			let m = await msg.channel.createMessage('<a:emoji_40:798036610045444096> this might take few seconds');
                  const canvas = createCanvas(base.width, base.height);
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(base, 0, 0);
                  ctx.font = '30px Old English Text MT';
                  ctx.textBaseline = 'top';
                  ctx.textAlign = 'center';
                  ctx.fillText(reason, 518, 273);
                  ctx.fillText(name, 518, 419);
                  ctx.fillText(moment().format('MM/DD/YYYY'), 309, 503);
            const attachment = canvas.toBuffer();

        if (Buffer.byteLength(attachment) > 8e+6) return msg.channel.createMessage('Resulting image was above 8 MB...I can\'t send that ');
        else {
            return msg.channel.createMessage({}, {
                    file: attachment, 
                    name: 'cutie-certificate.png' 
                }).then(m.delete())
        }
    }

}

module.exports = Certificate