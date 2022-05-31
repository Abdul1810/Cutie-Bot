const Event = require('../classes/Event.js')

class guildAvailable extends Event {
	
	get name () {
		return 'guildAvailable'
	}
	
	get once () {
		return false
	}
	
	async run (guild) {
		
		return await this.bot.executeWebhook(this.bot.webhook.unavailableguildlogid, this.bot.webhook.unavailableguildlogtoken, {
			embeds:[{
				title:"Event: UnAvailable Guild",
				description: `**Server Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount} \n**ownerID:** ${guild.ownerID}\n**ShardID:** ${this.bot.guildShardMap[guild.id]}`,
				thumbnail:{
					url: guild.dynamicIconURL("", 2048)
				},
				color:this.bot.color,
				timestamp: new Date(),
				footer:{
					text: `${this.bot.unavailableGuilds.size} Servers are UnAvailable`
				}
			}]
		})
	}
}

module.exports = guildAvailable