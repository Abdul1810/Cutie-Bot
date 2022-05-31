const Command = require('../classes/Command.js')


class Poll extends Command {
	get name () {
		return 'poll'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'MANAGE_MESSAGES'
	}

	get description () {
		return 'Ask a Question to the user in Guild'
	}

	get usage () {
		return '{prefix}poll <Question>'
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
		if (!msg.channel.permissionsOf(msg.author.id).has('manageMessages') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_CHANNELS"
				}
			}
		})
		if (!args[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You need to provide a question!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}poll <question>`
				}
			}
		})
		await msg.delete().catch(e=> { })


		let pollembed = {
			color: 0x00000,
			title: `Poll By ${msg.author.username+"#"+msg.author.discriminator}`,
			timestamp: new Date(),
			description: args.join(' ')
		}
		let pollmsg = await msg.channel.createMessage({
			embed: pollembed,
			/** "components": [
				{
					"type": 1,
					"components": [
						{
							"type": 2,
							"label": "0",
							"style": 3,
							"custom_id": "tick_0",
						},
						{
							"type": 2,
							"label": "0",
							"style": 4,
							"custom_id": "cross_0"
						}
					]
				}
			] */
		})
		return await pollmsg.addReaction('✅'), pollmsg.addReaction('❌')
	}
}

module.exports = Poll