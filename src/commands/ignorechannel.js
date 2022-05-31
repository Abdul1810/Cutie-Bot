const Command = require('../classes/Command.js')

class Ignorechannel extends Command {
	get name () {
		return 'ignorechannel'
	}
	
	get aliases () {
		return ['igch']
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'MANAGE_GUILDS'
	}

	get description () {
		return 'Add a Channel to ignore-list.where bot commands will not work.'
	}

	get usage () {
		return '{prefix}ignorechannel <add or remove> <#channel>'
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
		const channeldata = await this.bot.mongo.models.IgnoreChannel.findOne({
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
				description: `<:CutieWarning:769897779954319362> ** You Must provide an Option to Perform this command**`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}igch <add or remove> <#channel>`
				}
			}
		})
		var choice = args[0].toLowerCase()
		switch (choice) {
			case 'add' : {
				let channelid = msg.channelMentions[0]
				if (channeldata) {
					var IgnoredChannels = await this.bot.mongo.getIgnoredChannels(msg.channel.guild.id)
					if (IgnoredChannels.includes(channelid)) {
						msg.channel.createMessage({
							embed:{
								color: this.bot.ecolor,
								description: `<:CutieWarning:769897779954319362> **The Channel you mentioned is already in The Ignored Channels List**`,
								footer:{
									text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}igch remove <#channel or indexOf_Channel-inlist>`
								}
							}
						});
						break;
					}
					msg.channel.createMessage({
						embed:{
							color: this.bot.color,
							description: `<a:Cutie_Verifiedtick:769893107830882344> <#${channelid}> channel is Successfully added to Ignored Channels List`
						}
					});

					await channeldata.IgnoredChannelsID.push(channelid)
					channeldata.save();
					break;
				}
				else if (!channeldata) {
					msg.channel.createMessage({
						embed:{
							color: this.bot.color,
							description: `<a:Cutie_Verifiedtick:769893107830882344> <#${channelid}> channel is Successfully added to Ignored Channels List`
						}
					});
					
					let Newdb = new this.bot.mongo.models.IgnoreChannel({
						Servername: msg.channel.guild.name,
						GuildID: msg.channel.guild.id,
						IgnoredChannelsID: channelid
					})
					Newdb.save();
					break;
				}
			}
			case 'remove': {
				let channelid = msg.channelMentions[0]
				
				if (channeldata) {
					if (!channeldata.IgnoredChannelsID.includes(channelid)) {
						msg.channel.createMessage({
							embed:{
								color: this.bot.ecolor,
								description: `<:CutieWarning:769897779954319362> **The Channel you mentioned wasn't in The Ignored Channels List**`,
								footer:{
									text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}igch remove <#channel or indexOf_Channel-inlist>`
								}
							}
						});
						break;
					} 
					else {
						await channeldata.IgnoredChannelsID.pull(channelid)
						channeldata.save()

						msg.channel.createMessage({
							embed:{
								color: this.bot.color,
								description: `<a:Cutie_Verifiedtick:769893107830882344> <#${channelid}> channel is Successfully Removed From Ignored ChannelsList`
							}
						});
						break;
					}
				}
				else {
					msg.channel.createMessage({
						embed:{
							color: this.bot.ecolor,
							description: `<:CutieWarning:769897779954319362> **No Ignored Channels was Found in this Guild.Add an Ignored Channel First.**`,
							footer:{
								text: `Try ${await this.bot.mongo.getprefix(msg.channel.guild.id)}igch add <#channel>`
							}
						}
					});
					break;
				}
			}
			default : {
				if (channeldata) {
					if (channeldata.IgnoredChannelsID.length === 0) msg.channel.createMessage({
						embed:{
							color: this.bot.ecolor,
							description: `<:CutieWarning:769897779954319362> There is No Ignored Channels in this Server`
						}
					})
				}
				else {
					msg.channel.createMessage({
						embed:{
							author:{
								name: "Ignored Channels",
								icon_url: msg.channel.guild.dynamicIconURL("", 2048)
							},
							color: this.bot.color,
							description: "<#" + channeldata.IgnoredChannelsID.join("\n") + ">",
							footer:{
								text: `Developed By ${this.developer()}`
							}
						}
					})
				}
				break;
			}
		}
		return null;
	}
}

module.exports = Ignorechannel