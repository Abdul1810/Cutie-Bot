const Event = require('../classes/Event.js')

class GuildCreate extends Event {
	
	get name () {
		return 'guildCreate'
	}
	
	get once () {
		return false
	}

	Objsize (obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}

		return size
	}
	
	async run (guild) {
		if (guild.memberCount < 25) {
			return guild.leave()
		}
		this.bot.executeWebhook(this.bot.webhook.joinleavelogid, this.bot.webhook.joinleavelogtoken, {
			embeds:[{
				title:"Cutie Joined a Server",
				description: `**Server Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount} \n**ownerID:** ${guild.ownerID} `,
				thumbnail:{
					url: guild.dynamicIconURL("", 2048)
				},
				color:this.bot.color,
				timestamp: new Date(),
				footer:{
					text: `I'm In ${this.Objsize(this.bot.guildShardMap)} Servers Now!`
				}
			}]
		})
		return await this.bot.mongo.addGuildCount()
	}
}

module.exports = GuildCreate