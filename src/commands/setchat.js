const Command = require('../classes/Command.js')


class setchat extends Command {
	get name () {
		return 'setchat'
	}
	
	get aliases () {
		return ['setcutie']
	}

	get category () {
		return 'chatbot'
	}
	
	get requirement () {
		return 'MANAGE_CHANNELS'
	}

	get description () {
		return 'To set the cutie chat channel'
	}
	
	get usage () {
		return '{prefix}setchat <#channel>'
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
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}setchat <channel>`
				}
			}
		})

		//let channelid = args[0].slice(2, 20)
		//console.log(channelid)
		// if(channeldata){
		// 	await this.bot.mongo.models.ChatChannel.findOneAndRemove({
		// 		GuildID: msg.channel.guild.id
		// 	});
		// }

		let channelid = msg.channelMentions
		
		if (channeldata) {
			await this.bot.mongo.models.ChatChannel.findOneAndRemove({
			GuildID: msg.channel.guild.id
			});

			msg.channel.createMessage({
				embed:{
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> Your mentioned channel is Successfully set to Cutie chat channel`
				}
			});

			let newData = new this.bot.mongo.models.ChatChannel({
				Servername:msg.channel.guild.name,
				GuildID: msg.channel.guild.id,
				chatchannelID: channelid[0]
			})
			return newData.save();

		} else if (!channeldata) {
			msg.channel.createMessage({
				embed:{
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> Your mentioned channel is Successfully set to Cutie chat channel`
				}
			});

			let newData = new this.bot.mongo.models.ChatChannel({
				Servername:msg.channel.guild.name,
				GuildID: msg.channel.guild.id,
				chatchannelID: channelid[0]
			})
			return newData.save();
		}
	}
}

module.exports = setchat