const Event = require('../classes/Event.js')

class GuildDelete extends Event {
	
	get name () {
		return 'guildDelete'
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
		/**
		const guildData = await this.bot.db.getGuild(guild.id)
		await guildData.delete()
		
		const playerData = await this.bot.db.getPlayer(guild.id)
		return await playerData.delete()
		*/
		this.bot.executeWebhook(this.bot.webhook.joinleavelogid, this.bot.webhook.joinleavelogtoken, {
			embeds:[{
				title:"Cutie Left a Server",
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

		return await this.bot.mongo.delGuildCount()
	}
}

module.exports = GuildDelete