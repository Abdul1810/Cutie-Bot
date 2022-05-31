const Command = require('../classes/Command.js')
const { GetWallpaper } = require('../api').neko

class Wallpaper extends Command {
	get name () {
		return 'wallpaper'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'OWNER'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Get A Wallpaper For You.'
	}

	get usage () {
		return '{prefix}wallpaper'
	}
	
	get permissions () {
		return 'OWNER'
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
	
	async run (msg) {
		return msg.channel.createMessage({
			embed:{
				color: this.bot.color,
				author:{
					name: `Wallpaper`,
					icon_url: `${msg.author.dynamicAvatarURL("", 2048)}`
				},
				image:{
					url: await GetWallpaper()
				},
				footer:{
					text: `Developed By ${this.developer()}`
				},
				timestamp: new Date()
			}
		})
	}
}

module.exports = Wallpaper