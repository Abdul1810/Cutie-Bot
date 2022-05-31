const Command = require('../classes/Command.js')


class vote extends Command {
	get name () {
		return 'vote'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To support cutie by voting'
	}
	
	get usage () {
		return '{prefix}vote'
	}
	
	get permissions () {
		return null
	}
	
	async run (msg) {
		return msg.channel.createMessage({
			embed:{
				author:{
					name: "Vote for Cutie",
					icon_url: this.bot.user.avatarURL
				},
				description: `Hey! Thanks For Your Interest in Voting.\n\u200b\nUnfortunately We Removed Cutie From All the Bot List Sites.\nSoon We will Add the bot To All the Sites.Then You can Vote Bot Asusual.`,
				//description: "Hey! Voting Helps Our Bot To Grow And Boosts Our Moral That Yes We Made Somthing Useful :) \n [• Vote On Top.gg](https://top.gg/bot/641844911813165056/vote) \n [• Vote On Discord.Boats](https://discord.boats/bot/641844911813165056/vote) \n [• Vote On Discord Bot List](https://discordbotlist.com/bots/cutie-0387)",
				color: this.bot.color,
				footer: {
					text: "Thanks For Your Support :)"
				}
			}
		})
	}
}

module.exports = vote