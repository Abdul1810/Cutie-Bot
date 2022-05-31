const Command = require('../classes/Command.js')


class removechat extends Command {
	get name () {
		return 'removechat'
	}
	
	get aliases () {
		return ['removecutie']
	}

	get category () {
		return 'chatbot'
	}
	
	get requirement () {
		return 'MANAGE_CHANNELS'
	}

	get description () {
		return 'To remove the cutie chat channel'
	}
	
	get usage () {
		return '{prefix}removechat <#channel>'
	}

	get permissions () {
		return null
	}
	
	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}
	
	async run (msg, args) {
		const channeldata = await this.bot.mongo.models.ChatChannel.findOne({
            GuildID: msg.channel.guild.id
		});

        if (!channeldata) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> In this server no chatbot channel is found!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}removechat <channel>`
				}
			}
		})
		if (!msg.channel.permissionsOf(msg.author.id).has('manageChannels') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description:'<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_CHANNELS"
				}
			}
		})

		if (!args[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must mention a text channel!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}removechat <channel>`
				}
			}
		})

		let channelid = msg.channelMentions
		
		if (channeldata) {
			await this.bot.mongo.models.ChatChannel.findOneAndRemove({
			GuildID: msg.channel.guild.id
			});

			msg.channel.createMessage({
				embed:{
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> Your mentioned channel is Successfully removed a Cutie chatbot `
				}
			});
        }
	}
}

module.exports = removechat