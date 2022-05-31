const Command = require('../classes/Command.js')


class IgnoredChannelsList extends Command {
	get name () {
		return 'ignoredchannels'
	}
	
	get aliases () {
		return ["igchs", "ignoredchannellist", "igchlist"]
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'View All the Ignored Channels'
	}

	get usage () {
		return '{prefix}igchlist'
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
	
	async run (msg) {
		const channeldata = await this.bot.mongo.models.IgnoreChannel.findOne({
			GuildID: msg.channel.guild.id
		})
		
		if (channeldata.IgnoredChannelsID.length === 0) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> There is No Ignored Channels in this Server`
			}
		})
		else {
			let i
			let channelids = []
			for (i=0;i<channeldata.IgnoredChannelsID.length;i++) {
				channelids.push(`<#${channeldata.IgnoredChannelsID[i]}>`)
			}
			return msg.channel.createMessage({
				embed:{
					author:{
						name: "Ignored Channels",
						icon_url: msg.channel.guild.dynamicIconURL("", 2048)
					},
					color: this.bot.color,
					description: `${channelids.join('\n')}`,
					footer:{
						text: `Developed By ${this.developer()}`
					}
				}
			})
		}
	}
}

module.exports = IgnoredChannelsList