const Command = require('../classes/Command.js')
const srcbin = require("sourcebin_js")

class sourcebin extends Command {
	get name () {
		return 'sourcebin'
	}
	
	get aliases () {
		return ['src']
	}
	
	get category () {
		return 'text'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To get your code in sourcebin url'
	}
	
	get usage () {
		return '{prefix}sourcebin <code>'
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
		const code = args.join(" ")
		
		if (!code) return msg.channel.createMessage({
			embed:{
				description: `<:CutieWarning:769897779954319362> Type a code to upload`,
				color: this.bot.ecolor,
				footer:{
					text: `Usage : ${await this.bot.mongo.getprefix(msg.channel.guild.id)}sourcebin <code>`
				}
			}
		})
		else {
			srcbin.create([{
				name: `Code by ${msg.author.username}`,
				content: code,
				languageID: `js`
			}]).then(src => {
				msg.channel.createMessage({
					embed:{
						author:{
							name: "Sourcebin",
							icon_url: msg.author.avatarURL
						},
						description: `You can view the code.By Clicking [Here](${src.url})`,
						color: this.bot.color,
						footer:{
							text: `Developed by ${this.developer()}`
						}
					}
				})
			})
		}
	}
}

module.exports = sourcebin