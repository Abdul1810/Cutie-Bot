const Command = require('../classes/Command.js')


class setprefix extends Command {
	get name () {
		return 'setprefix'
	}
	
	get aliases () {
		return ["botprefix"]
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'MANAGE_GUILDS'
	}

	get description () {
		return 'To set the bot prefix'
	}
	
	get usage () {
		return '{prefix}setprefix <new-prefix>'
	}
	
	get permissions () {
		return null
	}

	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}

	async run (msg, args) {
		const prefixdata = await this.bot.mongo.models.Guild.findOne({
			GuildID: msg.channel.guild.id
		});
		if (!msg.channel.permissionsOf(msg.author.id).has('manageGuild') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_GUILDS"
				}
			}
		})
		if (!args[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must provide a **New prefix**!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}setprefix <prefix>`
				}
			}
		})
		if (args[0].length > 5) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Your new prefix must be under \`5\` characters!`
			}
		})
		if (prefixdata) {
			await this.bot.mongo.models.Guild.findOneAndRemove({
				GuildID: msg.channel.guild.id
			})
			
			msg.channel.createMessage({
				embed:{
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> My New prefix In This Server Is **\`${args[0]}\`**`
				}
			});
	
			let newData = new this.bot.mongo.models.Guild({
				Servername: msg.channel.guild.name,
				Prefix: args[0],
				GuildID: msg.channel.guild.id
			})
			return newData.save();
		} else if (!prefixdata) {
			 msg.channel.createMessage({
				 embed:{
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> My New prefix In This Server Is **\`${args[0]}\`**`
				}
			});
	
			let newData = new this.bot.mongo.models.Guild({
				Servername: msg.channel.guild.name,
				Prefix: args[0],
				GuildID: msg.channel.guild.id
			})
			return newData.save();
		}
	}
}

module.exports = setprefix